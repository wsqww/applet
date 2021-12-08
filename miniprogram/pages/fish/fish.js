// miniprogram/pages/fish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: 0,
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
    this.getStorage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 获取 本地数据
   */
  getStorage() {
    let fishOfTimes = [];
    const date = this.getDate();
    try {
      fishOfTimes = JSON.parse(wx.getStorageSync('fishOfTimes'));
      if (fishOfTimes[0] !== date) {
        this.setStorage(0);
        fishOfTimes = [date, 0];
      }
    } catch (e) {
      fishOfTimes = [date, 0];
    }
    this.setData({times: fishOfTimes[1]});
  },

  /**
   * 设置 本地数据
   * @param {number} times // 次数
   */
  setStorage(times) {
    let fishOfTimes = [this.getDate(), times];
    try {
      wx.setStorageSync('fishOfTimes', JSON.stringify(fishOfTimes));
    } catch (e) {
      conosole.log(e);
    }
  },

  /**
   * 次数 加
   */
  addTimes() {
    const times = this.data.times + 1;
    this.setStorage(times);
    this.setData({times: times});
  },

  /**
   * 获取今日日期
   */
  getDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})