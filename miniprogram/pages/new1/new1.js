// pages/new1/new1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "review": [{
      rating: '好评',
      number: '(100)',
    }, {
      rating: '一般',
      number: '(100)',
    }, {
      rating: '差评',
      number: '(100)',
    }],

    "menu": [{
      foodTitle: '蔬菜沙拉',
      foodImg: 'images/图片.png',
      price: '￥10/份',
      index: 0,
    }, {
      foodTitle: '辛拉面',
      foodImg: 'images/图片.png',
      price: '￥10/份',
      index: 1,
    }],

    "share": "images/分享.png",
    "starBefore": "images/收藏.png",
    "starAfter": "images/收藏黄.png",
    "imageUrl5": "images/Rectangle.png",
    "imageUrl6": "images/圆.png",
    "imageUrl7": "images/评分.png",
    "imageUrl8": "images/菜.png",
    "imageUrl9": "images/肉.png",
    "imageUrl10": "images/酱料.png",
    "imageUrl11": "images/鸡蛋.png",
    current: 0,
    currentFood: -1,
    isCollected: false,
  },

  // To check whether a user mark this page earlier and the food the user click on.
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        isCollected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    var that=this;
    that.setData({currentFood: option.food});
  },

  // To allow users remember the page by clicking         the star
  handleCollection: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      isCollected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
    })
  },

  //To enable users to change page by clickng on the     two items
  barChange: function (e) {
    var current = e.currentTarget.dataset.current
    this.setData({
      current: current
    })
  },

  //Make the content below move as users click on        the two items
  swiperitemchange_func: function (e) {
    var current = e.detail.current
    this.setData({
      current: current
    })
  },

  // To allow users share the page to his/her friends
  onShareAppMessage: function () {
    return {
      title: '美食分享',
      path: 'pages/new1/new1',
    }
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
})