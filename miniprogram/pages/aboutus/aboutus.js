// pages/aboutus/aboutus.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "title": "关于我们",
    "smallTitle1": "我们是谁？",
    "smallTitle2": "我们为什么做？",
    "whoAreWe1": "我们是来自奖学金周恩来班的两名学生。",
    "whoAreWe2": "在枫味小程序中，阮健负责后端开发，王一晴负责前端开发。",
    "why1": "我们希望能给同学们提供一个便捷的方式浏览枫叶食堂菜品。",
    "why2": "我们希望可以推出更多后续功能，给同学们提供便利。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    console.log(app.globalData.openid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})