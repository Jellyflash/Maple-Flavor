// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: "images/jiachangcai.jpg",
    name1: '西餐',
  
    img2: "images/kuaishouc.jpg",
    name2: '韩餐',

    img3: "images/chuangyicai.jpg",
    name3: '面食',

    img4: "images/sucai.jpg",
    name4: '鲁菜',
  
    img5: "images/liangcai.jpg",
    name5: '清真',
    current: 0,
    "imageUrl4": "images/图片.png",
    "imageUrl5": "images/箭头2.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '食堂菜品展示',
    })
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

  },

// Change the value of current when user tap on an option
  onTapTag: function (e) {
    var current = e.currentTarget.dataset.current
    this.setData({ current: current })
  },

// Change the content below according to the option
  swiperChange: function (e) {
    var current = e.detail.current
    this.setData({ current: current })
  },

// To change the page into the detail food information page
  go: function () {
    wx.navigateTo({
      url: '../new1/new1',
    })
  },
})
  