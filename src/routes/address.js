/**
 * @description address router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { createAddress } = require('../controller/address')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/user/address')

// 创建收货地址
router.post('/', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body

    try {
        const newAddress = await createAddress(username, data)
        ctx.body = new SuccessModel(newAddress)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(10004, `创建收货地址失败`)
    }

})

// 获取收货地址列表

// 获取单个收货地址

// 更新收货地址


module.exports = router
