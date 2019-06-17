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
      index: 0,
          }, {
        foodTitle: '辛拉面',
        foodImg: 'images/图片.png',
        price: '￥10',
        foodInfo: '好吃的拉面~',
        index: 1,
    }],

    "arrow": "images/箭头.png",
    "newArrival": "images/新品白.png",
    // "imageUrl1": "images/蔬菜沙拉.png",
    // "imageUrl2": "images/米饭.png",
    // "imageUrl3": "images/肉食.png",
  },

  // To change the page into the detail food information page
  go: function (e) {
    var food = e.currentTarget.id;
    wx.navigateTo({
      url: '../new1/new1?food=' + food,
    })
  },

  //To change the navigation bar title on the top
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '发现',
    })

    // this.getOpenid()
  },

  getOpenid: function () {
    //call cloud function
    wx.cloud.callFunction({
      name: 'getID',
      complete: res => {
        //set user id
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

    //check if manager
    db.collection('manager').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length > 0) {
          app.globalData.manager = true
          console.log('Manager', app.globalData.manager)
        }
        this.guide()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '管理员查询记录失败'
        })
        console.error('[数据库] [管理员查询记录] 失败：', err)
      }
    })

    //check common user
    db.collection('user').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.guide(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '普通用户查询记录失败'
        })
        console.error('[数据库] [普通用户查询记录] 失败：', err)
      }
    })
  },


  guide(res) {
    //already registered
    if (res.data.length > 0) {
      console.log('已注册: ', res)
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                if (res.userInfo) {
                  app.globalData.avatar = res.userInfo.avatarUrl
                  app.globalData.name = res.userInfo.nickName
                  console.log('头像', app.globalData.avatar)
                  console.log('用户信息', app.globalData.name)
                }
              }
            })

          }
        }
      })
    } else {
      //not registered
      console.log('未注册', res)
      db.collection('user').add({
        data: {
          name: '',
          grade: '',
          bookmark: []
        },
        success: function (res) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
    }
  },
})