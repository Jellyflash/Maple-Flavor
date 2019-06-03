Page({
  data: {
    "imageUrl1": "images/圆.png",
    "imageUrl2": "images/背景.png",
    "imageUrl3": "images/金币.png",
    "imageUrl4": "images/收藏.png",
    "imageUrl5": "images/帮助中心.png",
    "imageUrl6": "images/关于我们.png", 
    "imageUrl7": "images/正方形1.png",
    "imageUrl8": "images/正方形2.png",
    "imageUrl9": "images/正方形3.png",
    "imageUrl10": "images/正方形4.png",
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },
})