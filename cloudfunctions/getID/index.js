// 云函数模板
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  // 获取用户openid，event 参数包含小程序端调用传入的 data
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
  }
}
