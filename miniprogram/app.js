//app.js

App({
  //全局数据
  globalData: {
    //用户ID
    weChatID:'',
    openid: '',
    //用户信息
    avatar: 'images/圆.png',
    name: '路人甲',
    manager: false,
    role:'user'
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
      this.getOpenid()
    }

  },

  getOpenid: function() {
    //call cloud function
    wx.cloud.callFunction({
      name: 'getID',
      complete: res => {
        //set user id
        this.globalData.openid = res.result.openid
        console.log('云函数获取到的openid: ', this.globalData.openid)
        this.checkID();
      }
    })
  },

  //check if the user already exists
  checkNormalUser() {
    console.log('print', this.globalData.openid)
    const db = wx.cloud.database()
      //check common user
      db.collection('user').where({
        _openid: this.globalData.openid
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

  checkID() {
    const db = wx.cloud.database()
    db.collection('manager').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        console.log("查询manager", res)
        if (res.data.length >0) {
          this.globalData.manager = true
          this.globalData.role = 'manager'
          this.globalData.weChatID = res.data[0]._id
          console.log('Manager', this.globalData.manager, this.globalData.openid, this.globalData.weChatID)
          this.getInformation()
        }else{
          this.checkNormalUser()
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '管理员查询记录失败'
        })
        console.error('[数据库] [管理员查询记录] 失败：', err)
      }
    })
  },

  guide(res) {
    //already registered
    console.log('是否注册', res)
    if (res.data.length > 0) {
      console.log('已注册: ', res)
      
    } else {
      //not registered
      console.log('未注册', res)
      db.collection('user').add({
        data: {
          name: '',
          grade: '',
          bookmark: []
        },
        success: function(res) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
    }
  },
  getInformation(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              if (res.userInfo) {
                this.globalData.avatar = res.userInfo.avatarUrl
                this.globalData.name = res.userInfo.nickName
                console.log('头像', this.globalData.avatar)
                console.log('用户信息', this.globalData.name)
              }
            }
          })

        }else{
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  }
})