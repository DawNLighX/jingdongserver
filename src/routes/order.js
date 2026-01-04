/**
 * @description order router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { createOrder, getOrder } = require('../controller/order')
// const loginCheck = require('../middleware/loginCheck')
const tokenCheck = require('../middleware/tokenCheck') // 改用 token 验证
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/order')

// 错误码
const ORDER_ERROR = {
  CREATE_FAILED: 10002,
  GET_FAILED: 10003
}

// 创建订单
router.post('/', tokenCheck, async function (ctx) {
  const userInfo = ctx.state.userInfo // 改从 ctx.state 获取
  const username = userInfo.username
  const data = ctx.request.body || {}

  try {
    const newOrder = await createOrder(username, data)
    ctx.body = new SuccessModel(newOrder)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ORDER_ERROR.CREATE_FAILED, '创建订单失败')
  }
})

// 获取订单
router.get('/', tokenCheck, async function (ctx) {
  const userInfo = ctx.state.userInfo // 改从 ctx.state 获取
  const username = userInfo.username

  try {
    const orderList = await getOrder(username)
    ctx.body = new SuccessModel(orderList)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ORDER_ERROR.GET_FAILED, '订单获取失败')
  }  
})

module.exports = router
