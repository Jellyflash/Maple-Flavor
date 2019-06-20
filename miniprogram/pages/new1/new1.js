// pages/new1/new1.js
const app = getApp()
const db = wx.cloud.database();
const query = wx.createSelectorQuery();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'review': [{
      rating: '好评',
      number: 0,
    }, {
      rating: '一般',
      number: 0,
    }, {
      rating: '差评',
      number: 0,
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
    "share": "images/分享.png",
    "starBefore": "images/收藏.png",
    "starAfter": "images/收藏黄.png",
    "greenRectangle": "images/Rectangle.png",
    "profilePhoto": "images/圆.png",
    "textReview": '评论',
    "spice": '配料',
    "commentNumber": '0',
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
    adjustHeight: '2000rpx',
    current: 0,
    currentFoodID: "",
    currentFood: "",
    reviewHeight: 160,
    reviewHeights: [],
    bookmark: false,
    cleanName: ''
  },
  onShow: function() {
    this.checkIfBookmark()
    this.updateCommentList()
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },

  onLoad: function(option) {
    let that = this
    console.log('菜品ID', option.food)
    this.setData({
      currentFoodID: option.food
    });
    db.collection('dish').where({
      _id: this.data.currentFoodID
    }).get({
      success: res => {
        console.log('菜品获取成功', res)
        that.setData({
          currentFood: res.data[0],
          //# of good
          ['review[0].number']: res.data[0].numGood,
          //# of soso
          ['review[1].number']: res.data[0].numSoso,
          //# of bad
          ['review[2].number']: res.data[0].numBad,
          commentNumber:res.data[0].dish_comment.length,
        })
      }
    });
  },
  // onReady:function(e){
  //   this.adjustLength()
  // },
  //enable user to refresh the current page
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },

  adjustLength:function(e){
    let that = this
    if(that.data.current==0){
      console.log('调整高度')
      wx.createSelectorQuery().select('.wholeReview').boundingClientRect(function (rect) {
        console.log('打印adjust节点', rect.height)
        that.setData({
          adjustHeight: rect.height + 20 + 'px'
        })
      }).exec()
    }
  },

  checkIfBookmark: function(e) {
    let that = this
    console.log('检查数据库', app.globalData.role)
    db.collection(app.globalData.role).where({
      _openid: app.globalData.openid,
      bookmark: this.data.currentFoodID
    }).get({
      success: function(res) {
        console.log('检查bookmark', res)
        if (res.data.length > 0) {
          that.setData({
            bookmark: true
          })
        }
      }
    })
  },

  // To allow users remember the page by clicking the star
  addBookmark: function(e) {
    console.log('收藏', this.data.currentFoodID)
    let that = this
    db.collection(app.globalData.role).doc(app.globalData.weChatID).update({
      data: {
        bookmark: db.command.push(this.data.currentFoodID)
      },
      success: function(res) {
        wx.showToast({
          title: '添加收藏成功!',
        })
        console.log('添加收藏成功', res)
        that.setData({
          bookmark: true
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '添加收藏失败😭',
        })
        console.log('添加收藏失败', res)
      }
    })
  },

  //To enable users to change page by clickng on the     two items
  barChange: function(e) {
    var current = e.currentTarget.dataset.current
    this.setData({
      current: current
    })
  },

  //Make the content below move as users click on        the two items
  swiperChange: function(e) {
    var current = e.detail.current
    this.setData({
      current: current
    })
  },

  // To allow users share the page to his/her friends
  onShareAppMessage: function() {
    return {
      title: '美食分享',
      path: 'pages/new1/new1',
    }
  },

  submitDishComment: function(e) {
    let that = this;
    let comment = e.detail.value.comment;
    console.log('添加评论', comment);

    wx.showLoading({
      title: '添加中',
    })
    db.collection('dish').doc(that.data.currentFoodID).update({
      data: {
        dish_comment: db.command.push({
          'userID': app.globalData.openid,
          'content': comment,
          'userAvatar': app.globalData.avatar,
          'userName': app.globalData.name,
          'addTime': new Date()
        })
      },
      success: function(res) {
        wx.showToast({
          title: '评论成功!',
        })
        console.log('评论', res)
      },
      fail: function(res) {
        wx.showToast({
          title: '评论失败😭',
        })
        console.log('评论失败', res)
      },
      complete: () => {
        that.setData({
          cleanName: ''
        })
      }
    })
  },

  // get the news comments of the dish
  updateCommentList: function(e) {
    let that = this
    db.collection('dish').where({
      _id: this.data.currentFoodID
    }).get({
      success: res => {
        console.log('查询最新菜品信息成功', res)
        that.setData({
          currentFood: res.data[0],
          ['currentFood.numGood']: res.data[0].numGood,
          ['currentFood.numSoso']: res.data[0].numSoso,
          ['currentFood.numBad']: res.data[0].numBad,
          ['currentFood.dish_comment']: res.data[0].dish_comment,
          ['review[0].number']: res.data[0].numGood,
          ['review[1].number']: res.data[0].numSoso,
          ['review[2].number']: res.data[0].numBad,
          number: res.data[0].dish_comment.length
        })
      },
      complete: function(){
        // that.adjustLength()
      }
    })
  }
})