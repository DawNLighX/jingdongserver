/**
 * @description shop router
 * @author DawNLighX
 */

const router = require('koa-router')()
const {
    getHotList,
    getShopById,
    getProductsByShopId
} = require('../controller/shop') 
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/shop')

// 获取附近店铺（店铺列表）
router.get('/hot-list', async function (ctx, next) {
    const list = await getHotList()
    ctx.body = new SuccessModel(list)
})

// 获取单个商店信息
router.get('/:id', async function (ctx, next) {
    const id = ctx.params.id
    const shop = await getShopById(id)

    ctx.body = new SuccessModel(shop)
})

// 获取商店商品信息
router.get('/:id/products', async function (ctx, next) {
    const shopId = ctx.params.id
    const tab = ctx.query.tab || 'all' // query 里的 tab 参数默认为 all
    const products = await getProductsByShopId(shopId, tab)

    ctx.body = new SuccessModel(products)
})


module.exports = router
