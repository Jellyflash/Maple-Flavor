// pages/discovery/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "swiperUrl": [{
      "url": "images/轮播1.jpg"
    }, {
      "url": "images/轮播2.jpg"
    }, {
      "url": "images/轮播3.jpg"
    }],
    "imageUrl1": "images/蔬菜沙拉.png",
    "imageUrl2": "images/米饭.png",
    "imageUrl3": "images/肉食.png",
    "imageUrl4": "images/图片.png",
    "imageUrl5": "images/箭头2.png",
    "imageUrl6": "images/新品白.png",
  },

  // To change the page into the detail food information page
  go: function() {
    wx.navigateTo({
      url: '../new1/new1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '发现',
    })
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