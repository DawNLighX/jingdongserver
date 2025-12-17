/**
 * @description order router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { createOrder, getOrder } = require('../controller/order')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/order')

// 创建订单
router.post('/', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    const data = ctx.request.body

    try {
        const newOrder = await createOrder(username, data)
        ctx.body = new SuccessModel(newOrder)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(10008, '创建订单失败')
    }
} )

// 获取订单
router.get('/', loginCheck, async function (ctx, next) {
    const orderList = await getOrder()
    ctx.body = new SuccessModel(orderList)
} )

module.exports = router
