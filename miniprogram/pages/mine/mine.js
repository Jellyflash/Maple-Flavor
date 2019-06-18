const app = getApp()
const db = wx.cloud.database();
// perpage.onLoad() 

Page({
  data: {
    "greenBack": "images/背景2.png",
    "icon":[{
      name: "金币",
      img: "images/金币.png",
      functionName: 'notOpen'
    },{
        name: "收藏",
        img: "images/收藏2.png",
      }, {
        name: "帮助",
        img: "images/帮助中心.png",
        functionName:'address'
      }, {
        name: "关于",
        img: "images/关于我们.png",
        functionName:'go'
      }],
    "sent": "发送",
    dishCategory: ['西餐', '韩餐', '面食', '鲁菜', '清真'],
    msgData: [],
    inputVal: "",
    avatar: '',
    name: '',
    manager: false,
    openid: '',
    searchInfo: '',
    cleanName: '',
    newFileID: '',
    newCloudPath: '',
    ifDishPhoto: false,
    newSwiperID: '',
    newSwiperCloudPath: '',
    ifSwiperPhoto: false,
    ifCheck: false
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },

  onShow: function() {
    this.setData({
      manager: app.globalData.manager,
      avatar: app.globalData.avatar,
      name: app.globalData.name
    })
  },

  onPullDownRefresh: function() {
    this.onShow()
    wx.stopPullDownRefresh()
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

  address: function() {
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

  // search a specific dish
  searchDish: function(e) {
    let that = this;
    let searchDishName = e.detail.value.searchDishName;
    console.log('查询菜品名称：', searchDishName);
   
    wx.showLoading({
      title: '查询中',
    })
    db.collection('dish').where({
      dish_name: searchDishName
    }).get({
      success: function(res) {
        if (res.data.length > 0) {
          console.log('查询菜品成功', res)
          let dishData = res.data[0]
          let dishInfo = dishData.dish_name + ' ' + dishData.dish_category + ' ' + dishData.dish_material
          wx.showModal({
            title: '菜品信息',
            content: dishInfo,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else {
          console.log('没有此菜品', res)
          wx.showModal({
            title: '提示',
            content: '没有此菜品',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      },
      fail: function(err) {
        console.log('查询失败', err)
        wx.showToast({
          icon: 'none',
          title: '查询失败，请检查网络设置'
        })
      },
      complete: () => {
        that.setData({
          cleanName: ''
        })
        wx.hideLoading()
        that.setData({
          cleanName: '',
          ifDishPhoto: false,
        })
      }
    })
  },

  //create a new dish in database
  createNewDish: function(e) {
    let that = this;
    console.log(e.detail.value);
    let newName = e.detail.value.newName
    let newPrice = e.detail.value.newPrice
    let newMaterial = e.detail.value.newMaterial
    let newPhotoID = that.data.newFileID
    let newDishCategory = e.detail.value.category
    console.log('创建新品：', newName, newPrice, newMaterial, newDishCategory, newPhotoID);
    if (newPhotoID == "") {
      wx.showModal({
        title: '您还没有上传照片',
        success(res) {
          if (res.confirm) {
            console.log('用户确定不上传照片')
          }
        }
      })
    } else {

      //check if already exists
      db.collection('dish').where({
        dish_name: newName
      }).get({
        success: function(res) {
          wx.showLoading({
            title: '检查数据库中',
          })
          if (res.data.length > 0) {
            console.log('菜品已存在', res)
            wx.showModal({
              title: '该菜品已被添加过',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    cleanName: ''
                  })
                }
              }
            })
          } else {
            //upload
            wx.showLoading({
              title: '菜品添加中',
            })
            db.collection('dish').add({
              data: {
                dish_name: newName,
                dish_price: newPrice,
                dish_material: newMaterial,
                dish_addTime: new Date(),
                dish_category: newDishCategory,
                dish_photoID: newPhotoID
              },
              success: function(res) {
                wx.showToast({
                  title: '添加成功!',
                })
                console.log('添加成功', res)
              },
              fail: function(res) {
                wx.showToast({
                  title: '添加失败😭',
                })
                console.log('添加失败', res)
              },
              complete: () => {
                wx.hideLoading()
                that.setData({
                  cleanName: '',
                  ifDishPhoto: false,

                })
              }
            })
          }

        }
      })
    }

  },


  //upload the photo for a new dish
  doUploadDishPhoto: function(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '新菜品图片上传中',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'dish' + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              newFileID: res.fileID,
              newCloudPath: cloudPath,
              ifDishPhoto: true
            })
            wx.showToast({
              title: '图片上传成功',
            })
          },
          fail: err => {
            console.log('[上传文件] 失败：', res)
            wx.showToast({
              title: '图片上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  },

  doUploadSwiperPhoto: function(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '轮播图上传中',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'swiper' + new Date().getTime()+ filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              newSwiperID: res.fileID,
              newSwiperCloudPath: cloudPath,
              ifSwiperPhoto: true
            })
            wx.showToast({
              title: '图片上传成功',
            })
          },
          fai: err => {
            console.log('[上传文件] 失败：', res)
            wx.showToast({
              title: '图片上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  },
  addNewSwiperPhoto: function(e) {
    let that = this;
    let newSwiperDiscription = e.detail.value.newSwiperDiscription
    console.log('创建新品：', newSwiperDiscription);
    wx.showLoading({
      title: '上传中',
    })
    db.collection('swiper').add({
      data: {
        discription: newSwiperDiscription,
        addTime: new Date(),
        swiperID: that.data.newSwiperID,
        swiperCloudPath: that.data.newSwiperCloudPath
      },
      success: function(res) {
        wx.showToast({
          title: '添加成功!',
        })
        console.log('添加轮播图成功', res)
      },
      fail: function(res) {
        wx.showToast({
          title: '添加失败😭',
        })
        console.log('添加轮播图失败', res)
      },
      complete: () => {
        wx.hideLoading()
        that.setData({
          cleanName: '',
          ifSwiperPhoto: false
        })
      }
    })

  }
})