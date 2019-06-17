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
      star: false,
    }, {
      foodTitle: '辛拉面',
      foodImg: 'images/图片.png',
      price: '￥10/份',
      index: 1,
      star: false,
    }],

    "content": [{
      username: '晴辣辣',
      commentContent: '好吃',
      time: '5月23日 21:00',
    }, {
        username: '阮健康',
        commentContent: '不好吃',
        time: '5月29日 8:00',
      }, {
        username: '晴甜甜',
        commentContent: '超好吃',
        time: '5月26日 8:00',
      }],
   
    "ingredient": [{
      index: 0,
      vegetable:[{
        name: "白菜",
      }, {
        name: "胡萝卜",
      }, {
        name: "青椒",
      }],
      meat: [{
        name: "鸡肉",
      }, {
        name: "牛肉",
      }],
      sauce: [{
        name: "千岛酱",
      }, {
        name: "蛋黄酱",
      }],
      other: [{
        name: "鸡蛋",
      }, {
        name: "蒜",
      }]
    },
     {
      index:1,
       vegetable: [{
         name: "无",
       }, ],
       meat: [{
         name: "鸡肉",
       }, {
         name: "牛肉",
       }],
       sauce: [{
         name: "千岛酱",
       }],
       other: [{
         name: "鸡蛋",
       }]
    },
    ],
    "share": "images/分享.png",
    "starBefore": "images/收藏.png",
    "starAfter": "images/收藏黄.png",
    "greenRectangle": "images/Rectangle.png",
    "profilePhoto": "images/圆.png",
    "textReview": '评论',
    "spice": '配料',
    "number": '150',
    "numberText": '人已评价',
    "cancel": '删除',
    "sent": "发送",
    "vegetext": "菜",
    "meattext": "肉",
    "saucetext": "酱料",
    "othertext": "其他",
    "imageUrl7": "images/评分.png",
    "vegeImg": "images/菜.png",
    "meatImg": "images/肉.png",
    "sauceImg": "images/酱料.png",
    "otherImg": "images/鸡蛋.png",

    current: 0,
    currentFood: -1,
    isCollected: false,
    reviewHeight: 160,
    reviewHeights:[],
  },

  // To check whether a user mark this page earlier and the food the user click on.
  onLoad: function (option) {
    var that = this;
    that.setData({ currentFood: option.food });
    var height = this.data.reviewHeight+(this.data.content.length) * 360;
    var reviewHei=[];
    reviewHei[0]= height;
    reviewHei[1]= 500;
    this.setData({
      reviewHeights: reviewHei,
    })
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[this.data.currentFood+1];
      this.setData({
        isCollected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },

  // To allow users remember the page by clicking         the star
  handleCollection: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentFood+1];
    postCollected = !postCollected;
    postsCollected[this.data.currentFood
    +1] = postCollected;
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
  swiperChange: function (e) {
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