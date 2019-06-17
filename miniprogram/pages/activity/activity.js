// pages/activity/activity.js
Page({

  //The initial data of a page
  data: {
    "scroll": [{
      resImg: "images/jiachangcai.jpg",
      resName: '西餐',
    }, {
        resImg: "images/kuaishouc.jpg",
        resName: '韩餐',
      }, {
        resImg: "images/chuangyicai.jpg",
        resName: '面食',
      }, {
        resImg: "images/sucai.jpg",
        resName: '鲁菜',
      }, {
        resImg: "images/liangcai.jpg",
        resName: '清真',
      }
    ],
    
    "menu": [{
      foodTitle: '蔬菜沙拉',
      foodImg: 'images/图片.png',
      price: '￥10',
      foodInfo: '新鲜的水果和蔬菜~',
      index: 0,
    }, {
      foodTitle: '辛拉面',
      foodImg: 'images/图片.png',
      price: '￥10',
      foodInfo: '好吃的拉面~',
      index: 1,
      }, {
        foodTitle: '蔬菜沙拉',
        foodImg: 'images/图片.png',
        price: '￥10',
        foodInfo: '新鲜的水果和蔬菜~',
        index: 0,
      }, {
        foodTitle: '辛拉面',
        foodImg: 'images/图片.png',
        price: '￥10',
        foodInfo: '好吃的拉面~',
        index: 1,
      }, {
        foodTitle: '蔬菜沙拉',
        foodImg: 'images/图片.png',
        price: '￥10',
        foodInfo: '新鲜的水果和蔬菜~',
        index: 0,
      }],

    "arrow": "images/箭头2.png",
    current: 0,  
  },

  //To change the navigation bar title on the top
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
  go: function (e) {
    var food = e.currentTarget.id;
    wx.navigateTo({
      url: '../new1/new1?food=' + food,
    })
  },
})
  