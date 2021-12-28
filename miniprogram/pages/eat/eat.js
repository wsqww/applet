// miniprogram/pages/eat/eat.js
import Shake from '../../utils/shake';
const shark = new Shake();

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: {
      public: [],
      private: [],
      vip: [],
    },
    selected: [],
    result: '',
    resultShow: false,
    resultAnimation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.login()
    .then( res => {
        this.getMenus();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    shark.openShakeEvent({
      onShake: () => {
        console.log('shake callBack');
        this.setResult();
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    shark.closeShakeEvent();
  },

  getMenus() {
    const _this = this;
    wx.cloud.callFunction({
      name: 'getMenus',
      data: {},
      success: res => {
        // console.log(res);
        _this.setMenus(res.result)
      },
      fail: err => { console.log(err) }
    });
  },

  setMenus: function (menus) {
    Object.keys(menus).forEach(key => {
      menus[key] = menus[key].map(item => {
        item.checked = false;
        item.down = false;
        item.menu = item.menu.map(menu => {
          const menuInfo = {
            name: menu,
            checked: false
          };
          return menuInfo;
        })
        return item;
      });
    });
    this.setData({ menus });
    // console.log(this.data.menus);
  },

  collapseToggle(event) {
    // console.log(event);
    const type = event.currentTarget.dataset.type;
    const index = event.currentTarget.dataset.idx;
    const down = !this.data.menus[type][index].down;
    // console.log(type, down, `menus.${type}[${index}].down`);
    this.setData({ [`menus.${type}[${index}].down`]: down });
  },

  menuListOnChange(event) {
    const type = event.currentTarget.dataset.type;
    const idx = event.currentTarget.dataset.idx;
    const checked = !this.data.menus[type][idx].checked;
    let menuObj = this.data.menus[type][idx];
    menuObj.checked = checked;
    menuObj.menu = menuObj.menu.map(item => {
      item.checked = checked;
      return item;
    });
    this.setData({ [`menus.${type}[${idx}]`]: menuObj });
  },

  menuOnChange(event) {
    const type = event.currentTarget.dataset.type;
    const idx = event.currentTarget.dataset.idx;
    const menuIdx = event.currentTarget.dataset.menuIdx;
    let menuObj = this.data.menus[type][idx];
    const checked = !this.data.menus[type][idx].menu[menuIdx].checked;
    menuObj.menu[menuIdx].checked = checked;
    const checkedLength = menuObj.menu.filter(item => item.checked).length;
    menuObj.checked = menuObj.menu.length === checkedLength;
    this.setData({[`menus.${type}[${idx}]`]: menuObj});
    // console.log(this.data.menus[type][idx]);
  },

  setResult: function () {
    let selected = Object.keys(this.data.menus).map(key => {
      return this.data.menus[key].map(item => {
        let filterMenu = [];
        if(item.checked) {
          filterMenu = item.menu;
        } else {
          filterMenu = item.menu.filter(menu => menu.checked);
        }
        return filterMenu.map(menu => menu.name);
      });
    }).flat(2);
    // console.log(selected);
    // return;
    if (selected.length < 1) {
      selected = ['未做任何选择'];
     } else {
      this.showResultMask();
     }
    this.setData({selected: selected});
    const result = selected[this.randomInit(0, selected.length - 1)];
    // console.log(result);
    this.setData({ result });
  },

  randomInit: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  showResultMask() {
    this.setData({
      resultShow: true,
      resultAnimation: true
    });
    const timer = setInterval(() => {
      const selected = this.data.selected;
      const item = selected.shift();
      selected.push(item);
      this.setData({selected: selected});
    }, 150);
    setTimeout(() => {
      clearInterval(timer)
      this.setData({ resultAnimation: false });
    }, 2500);
  },

  closeResultMask() {
    this.setData({
      resultShow: false,
      resultAnimation: true
    });
  },

  noop() {}

})
