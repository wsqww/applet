// miniprogram/pages/eat/eat.js
import Shake from '../../utils/shake';
const shark = new Shake();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {
        type: 'A',
        menu: ['A1', 'B2', 'C3', 'D4', 'E5', 'F6']
      },
      {
        type: 'B',
        menu: ['A1', 'B2', 'C3', 'D4', 'E5', 'F6']
      },
      {
        type: 'C',
        menu: ['A1', 'B2', 'C3', 'D4', 'E5', 'F6']
      },
      {
        type: 'D',
        menu: ['A1', 'B2', 'C3', 'D4', 'E5', 'F6']
      },
    ],
    selected: [],
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
