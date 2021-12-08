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
      {
        type: 'A',
        menu: [{name: 'A1'}, {name: 'A2'}, {name: 'A3'}, {name: 'A4'}, {name: 'A5'}, {name: 'A6'}]
      },
      {
        type: 'B',
        menu: [{name: 'B1'}, {name: 'B2'}, {name: 'B3'}, {name: 'B4'}, {name: 'B5'}, {name: 'B6'}]
      },
      {
        type: 'C',
        menu: [{name: 'C1'}, {name: 'C2'}, {name: 'C3'}, {name: 'C4'}, {name: 'C5'}, {name: 'C6'}]
      },
      {
        type: 'D',
        menu: [{name: 'A1'}, {name: 'D2'}, {name: 'D3'}, {name: 'D4'}, {name: 'D5'}, {name: 'D6'}]
      },
    ],
    selected: [],
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setMenus();
    // this.getMenus();
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
    const db = wx.cloud.database()
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    db.collection('menus')
    // .where({
    //   publishInfo: {
    //     country: 'United States'
    //   }
    // })
    .get({
      success: function(res) {
        console.log(res)
      }
    })
  },

  setMenus() {
    const menus = this.data.menus.map(item => {
      item.checked = false;
      item.menu = item.menu.map(menu => {
        menu.checked = false;
        return menu;
      })
      return item;
    });
    this.setData({menus});
  },

  setResult: function() {
    const arr = this.data.selected;
    const result = arr[this.randomInit(0, arr.length-1)];
    console.log(result);
    this.setData({result});
  },

  randomInit: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


})
