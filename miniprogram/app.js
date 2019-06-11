//app.js
App({
  //全局数据
  globalData: {
    //用户ID
    openId: '',
    //用户信息
    userInfo: null,
    //授权状态
    auth: {
      'scope.userInfo': false
    }
  },
  /**
   * 检查云开发环境并初始化
   */
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'mapleflavor-2019'
      })
      //获取用户ID
      this.getOpenid();

      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
          } else {
            // wx.navigateTo({
            //   url: '../login/login',
            // })
          }
        }
      })
    }
  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getID',
      complete: res => {
        console.log('云函数result: ', res)
        console.log('云函数获取到的openid: ', res.result.openid)
        this.globalData.openid = res.result.openid;
        wx.setStorage({
          key: 'openID',
          data: res.result.openid,
        })
      }
    })
  }
})