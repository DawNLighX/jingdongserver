/**
 * @description hotwords router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { SuccessModel } = require('../res-model/index')

router.prefix('/api/search')

const HOTWORDS = [
  "水果",
  "山姆会员超市",
  "7-11便利店",
  "罗森",
  "大盘鸡盖浇面",
  "生日鲜花",
  "香槟玫瑰",
  "肯德基",
  "生椰拿铁",
  "焦糖海盐冰震拿铁"
]

// 热搜词
router.get('/hot-words', async function (ctx) {
  ctx.body = new SuccessModel(HOTWORDS)
})

module.exports = router
