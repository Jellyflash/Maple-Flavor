const app = getApp()
Page({
  data: {
    "imageUrl2": "images/背景2.png",
    "imageUrl3": "images/金币.png",
    "imageUrl4": "images/收藏2.png",
    "imageUrl5": "images/帮助中心.png",
    "imageUrl6": "images/关于我们.png",
    "imageUrl7": "images/正方形1.png",
    "imageUrl8": "images/正方形2.png",
    "imageUrl9": "images/正方形3.png",
    "imageUrl10": "images/正方形4.png",
    msgData: [],
    inputVal: "",
    avatar:'images/圆.png',
    name:'路人甲'
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatar: res.userInfo.avatarUrl,
                name: res.userInfo.nickName,
                manager: app.globalData.manager
              })
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              app.globalData.userInfo = res.userInfo
              console.log('头像', app.globalData.avatarUrl)
              console.log('用户信息', app.globalData.userInfo)
            }
          })
        }
      }
    })
    
    
  },

  notOpen: function() {
    var that = this
    wx.showModal({
      title: '暂未开放',
      content: '功能暂未推出，敬请期待~',
      confirmText: '确认',
      cancelText: '取消',
    })
  },

  address: function () {
    var that = this
    wx.showModal({
      title: '请联系我们',
      content: '邮箱地址 xxx@163.com',
      confirmText: '确认',
      cancelText: '取消',
    })
  },

  go: function() {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },

  changeInputValue(ev) {
    this.setData({
      inputVal: ev.detail.value
    })
  },
})