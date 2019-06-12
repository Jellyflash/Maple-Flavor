//app.js
App({
  //全局数据
  globalData: {
    //用户ID
    openId: '',
    //用户信息
    avatarUrl: 'images/圆.png',
    name:'',
    //授权状态
    auth: {
      'scope.userInfo': false
    },
    manager: false
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
    }
  }
})