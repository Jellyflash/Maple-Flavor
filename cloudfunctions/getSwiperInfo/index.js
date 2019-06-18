// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = wx.cloud.database()
  return {
    swiperList: await db.collection('swiper').field({
      // specify return value
      discription: true,
      swiperID: true,
      addTime:true
    }).orderBy('addTime', 'desc').get() // get order

  }
}