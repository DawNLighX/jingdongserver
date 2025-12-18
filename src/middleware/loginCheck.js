/**
 * @description 登录验证中间件
 * @author DawNLighX
 */

const { ErrorModel } = require('../res-model/index')

module.exports = async (ctx, next) => {
  if (ctx.session?.userInfo) {
    await next()
  } else {
    ctx.body = new ErrorModel(10100, '账号登录状态校验失败')
  }
}