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

// 错误码常量
const SHOP_ERROR = {
  GET_HOT_LIST_FAILED: 10009,
  GET_SHOP_FAILED: 10010,
  GET_PRODUCTS_FAILED: 10011
}

// 获取附近店铺（店铺列表）
router.get('/hot-list', async function (ctx) {
  try {
    const list = await getHotList()

    ctx.body = new SuccessModel(list)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(SHOP_ERROR.GET_HOT_LIST_FAILED, '获取店铺列表失败')
  }
})

// 获取单个商店信息
router.get('/:id', async function (ctx) {
  const id = ctx.params.id

  if (!id) {
    ctx.body = new ErrorModel(SHOP_ERROR.GET_SHOP_FAILED, '店铺ID不能为空')
    return
  }

  try {
    const shop = await getShopById(id)

    if (!shop) {
      ctx.body = new ErrorModel(SHOP_ERROR.GET_SHOP_FAILED, '店铺不存在')
      return
    }

    ctx.body = new SuccessModel(shop)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(SHOP_ERROR.GET_SHOP_FAILED, '获取店铺信息失败')
  }
})

// 获取商店商品信息
router.get('/:id/products', async function (ctx) {
  const shopId = ctx.params.id
  const tab = ctx.query.tab || 'all' // query 里的 tab 参数默认为 all

  if (!shopId) {
    ctx.body = new ErrorModel(SHOP_ERROR.GET_PRODUCTS_FAILED, '店铺ID不能为空')
    return
  }

  try {
    const products = await getProductsByShopId(shopId, tab)

    ctx.body = new SuccessModel(products)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(SHOP_ERROR.GET_PRODUCTS_FAILED, '获取店铺商品失败')
  }
})

module.exports = router