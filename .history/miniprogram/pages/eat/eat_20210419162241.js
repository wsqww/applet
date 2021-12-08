// miniprogram/pages/eat/eat.js
import Shake from '../../utils/shake';
const shark = new Shake();

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      // {
      //   "_id": "658e9e57607ce70e09df49607de27a11",
      //   "type": "A",
      //   "name": "AA",
      //   "menu": [{ "name": "A1" }, { "name": "A2" }, { "name": "A3" }, { "name": "A4" }, { "name": "A5" }, { "name": "A6" }]
      // }
    ],
    activeCells: [],
    result: '',
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
    // shark.openShakeEvent({
    //   onShake: () => {
    //     console.log('shake callBack');
    //   }
    // });
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
        _this.setMenus(res.result.data)
      },
      fail: err => { console.log(err) }
    });
  },

  setMenus: function (menus) {
    menus.map(item => {
      item.checked = false;
      item.menu = item.menu.map(menu => {
        menu.checked = false;
        return menu;
      })
      return item;
    });
    this.setData({ menus });
    // console.log(this.data.menus);
  },

  setResult: function () {
    const arr = this.data.menus.map(item => {
      return item.menu.filter(menu => menu.checked).map(menu => menu.name);
    }).flat();
    // console.log(arr); return;
    const result = arr[this.randomInit(0, arr.length - 1)];
    console.log(result);
    this.setData({ result });
  },

  randomInit: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  collapseOnChange(event) {
    this.setData({
      activeCells: event.detail,
    });
  },

  menuTypeToggle(event) {
    // console.log(event);
    const typeIdx = event.currentTarget.dataset.typeIdx;
    const checked = !this.data.menus[typeIdx].checked;
    // console.log(typeIdx, checked);
    this.data.menus[typeIdx].menu.forEach( (item, index) => {
      this.setData({ [`menus[${typeIdx}].menu[${index}].checked`]: checked });
    });
    this.setData({ [`menus[${typeIdx}].checked`]: checked });
    // console.log(this.data.menus[typeIdx]);
  },

  menuToggle(event) {
    // console.log(event);
    const typeIdx = event.currentTarget.dataset.typeIdx;
    const menuIdx = event.currentTarget.dataset.menuIdx;
    const checked = !this.data.menus[typeIdx].menu[menuIdx].checked;
    // console.log(typeIdx, menuIdx, checked);
    this.setData({ [`menus[${typeIdx}].menu[${menuIdx}].checked`]: checked });
    // console.log(this.data.menus[typeIdx].menu[menuIdx]);
  },

  noop() {}

})
