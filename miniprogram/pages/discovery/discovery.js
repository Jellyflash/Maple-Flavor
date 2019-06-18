// pages/discovery/discovery.js
const app = getApp()
const db = wx.cloud.database()

Page({

  //The initial data of a page
  data: {
    openid: '',
    "swiperUrl": ["", "", ""],
    // "menu": [{
    //   foodTitle: '蔬菜沙拉',
    //   foodImg: 'images/图片.png',
    //   price: '￥10',
    //   foodInfo: '新鲜的水果和蔬菜~',
    //   index: 0,
    // }, {
    //   foodTitle: '辛拉面',
    //   foodImg: 'images/图片.png',
    //   price: '￥10',
    //   foodInfo: '好吃的拉面~',
    //   index: 1,
    // }],
    menu:[],
    arrow: "images/箭头.png",
    newArrival: "images/新品白.png",
  },

  // To change the page into the detail food information page
  go: function(e) {
    let food = e.currentTarget.id;
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

  //to get the newest information for swiper and dish list
  onShow: function(options) {
    this.getSwiperPhoto()
    this.getDishList()
  },

  //enable user to refresh the current page
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },

  //get the newest set of dish list from database
  getDishList:function(){
    db.collection('dish').field({
      dish_name: true,
      dish_category: true,
      dish_material:true,
      dish_price:true,
      dish_photoID: true,

      dish_addTime: true
    }).orderBy('dish_addTime', 'desc').get({
      success: res => {
        console.log('菜品降序列表', res)
        if(res.data.length<6){
          this.setData({
            menu: res.data
          })
        }else{
          for(i=0;i<6;i++){
            menu[i] = res.data[i]
          }
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  //get the newest 3 swiper photos, the database should have at least 3 photos by default
  getSwiperPhoto: function() {
    db.collection('swiper').field({
      discription: true,
      swiperID: true,
      addTime: true
    }).orderBy('addTime', 'desc').get({
      success: res => {
        console.log('轮播图降序列表', res)
        this.setData({
          'swiperUrl[0]': res.data[0].swiperID,
          'swiperUrl[1]': res.data[1].swiperID,
          'swiperUrl[2]': res.data[2].swiperID
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    }

  })