/**
 * @description 登录验证中间件
 * @author DawNLighX
 */

const { ErrorModel } = require('../res-model/index')

module.exports = async (ctx, next) => {
  // 调试日志：记录请求携带的 cookie 与当前 session 状态，方便排查登录状态问题
  try {
    console.log('loginCheck -- cookies:', ctx.headers && ctx.headers.cookie, 'session:', ctx.session)
  } catch (e) {
    console.warn('loginCheck logging failed', e)
  }
  if (ctx.session?.userInfo) {
    await next()
  } else {
    ctx.body = new ErrorModel(10100, '账号登录状态校验失败')
  }
}