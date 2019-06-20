const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    menuID: [],
    menu: [],
    arrow: "../discovery/images/箭头.png"
  },

  onLoad: function(options) {
    this.getBookmarkList()
  },

  //get the book mark
  getBookmarkList: function(e) {
    let that = this
    db.collection(app.globalData.role).where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log('用户收藏信息', res.data[0].bookmark)
        that.setData({
          menuID: res.data[0].bookmark
        })
        that.getSpecifcDishInfo()
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getSpecifcDishInfo: function(e) {
    let that = this
    for (let i = 0; i < this.data.menuID.length; i++) {
      db.collection('dish').where({
        _id: this.data.menuID[i]
      }).get({
        success:res=>{
          console.log('第',i,'个收藏',res.data[0])
          var arr = "menu[" +i + "]"
          console.log(arr)
          that.setData({
            [arr]: res.data[0]
          })
        }
      })
    }
  },

  //navigate to specific dish page
  go: function (e) {
    let food = e.currentTarget.id;
    wx.navigateTo({
      url: '../new1/new1?food=' + food,
    })
  }
})