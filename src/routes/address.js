/**
 * @description address router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { 
    createAddress,
    getAddressList,
    getAddressById,
    updateAddress
} = require('../controller/address')
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
router.get('/', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    const list = await getAddressList(username)

    if (list) {
        ctx.body = new SuccessModel(list)
    } else {
        ctx.body = new ErrorModel(10005, `获取收货地址失败`)
    }
})

// 获取单个收货地址
router.get('/:id', loginCheck, async function (ctx, next) {
    const id = ctx.params.id // 与地址中的命名保持一致
    const address = await getAddressById(id)

    if (address) {
        ctx.body = new SuccessModel(address)
    } else {
        ctx.body = new ErrorModel(10006, `获取单个收货地址失败`)
    }
})

// 更新收货地址
router.patch('/:id', loginCheck, async function (ctx, next) {
    const id = ctx.params.id // 与地址中的命名保持一致
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body

    try {
        const address = await updateAddress(id, username, data)
        ctx.body = new SuccessModel(address)
    } catch(ex) {
        console.error(ex)
        ctx.body = new ErrorModel(10006, `获取单个收货地址失败`)
    }
})

module.exports = router
