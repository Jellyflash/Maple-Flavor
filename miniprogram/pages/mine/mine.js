Page({
  data: {
    "greenBack": "images/背景2.png",
    "profilePic": "images/圆.png",
    "username": "晴辣辣",
    "beforeNum": "用户 No.",
    "userNum": "1",
    "icon":[{
      name: "金币",
      img: "images/金币.png",
    },{
        name: "收藏",
        img: "images/收藏2.png",
      }, {
        name: "帮助",
        img: "images/帮助中心.png",
      }, {
        name: "关于",
        img: "images/关于我们.png",
      }],
    "sent": "发送",
    msgData: [],
    inputVal: "",
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的',
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