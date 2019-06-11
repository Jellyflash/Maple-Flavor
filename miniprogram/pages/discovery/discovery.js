// pages/discovery/discovery.js
Page({
  
  //The initial data of a page
  data: {
    openid: '',
    "swiperUrl": [{
      "url": "images/轮播1.jpg"
    }, {
      "url": "images/轮播2.jpg"
    }, {
      "url": "images/轮播3.jpg"
    }],
    
    "menu": [{
      foodTitle: '蔬菜沙拉',
      foodImg: 'images/图片.png',
      price: '￥10',
      foodInfo: '新鲜的水果和蔬菜~',
    }, {
        foodTitle: '辛拉面',
        foodImg: 'images/图片.png',
        price: '￥10',
        foodInfo: '好吃的拉面~',
    }],

    "arrow": "images/箭头.png",
    "newArrival": "images/新品白.png",
    // "imageUrl1": "images/蔬菜沙拉.png",
    // "imageUrl2": "images/米饭.png",
    // "imageUrl3": "images/肉食.png",
  },

  // To change the page into the detail food information page
  go: function () {
    wx.navigateTo({
      url: '../new1/new1',
    })
  },

  //To change the navigation bar title on the top
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发现',
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

})