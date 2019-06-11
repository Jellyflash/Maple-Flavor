// pages/discovery/discovery.js
const app = getApp()

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
  go: function() {
    wx.navigateTo({
      url: '../new1/new1',
    })
  },

  //To change the navigation bar title on the top
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '发现',
    })
    this.getOpenid();
  },

  getOpenid: function() {
    //call cloud function
    wx.cloud.callFunction({
      name: 'getID',
      complete: res => {
        app.globalData.openid = res.result.openid
        console.log('云函数获取到的openid: ', app.globalData.openid)
        this.setData({
          openid: app.globalData.openid
        })
        this.checkID();
      }
    })
  },

  //check if the user already exists
  checkID() {
    console.log('print', this.data.openid)
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        // this.setData({
        //   queryResult: JSON.stringify(res.data, null, 2)
        // })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})