/**
 * @description token 验证中间件（替代 session 验证）
 * @author DawNLighX
 */

const { ErrorModel } = require('../res-model/index')
const { verifyAccessToken } = require('../utils/jwt')

module.exports = async (ctx, next) => {
  // 调试日志：记录请求携带的 token 状态
  try {
    const authHeader = ctx.headers && ctx.headers.authorization
    console.log('tokenCheck -- authorization header:', authHeader ? '已携带' : '未携带')
  } catch (e) {
    console.warn('tokenCheck logging failed', e)
  }

  // 从 Authorization header 获取 token
  const authHeader = ctx.headers && ctx.headers.authorization
  if (!authHeader) {
    ctx.body = new ErrorModel(10100, '账号登录状态校验失败：缺少 token')
    return
  }

  // 提取 Bearer token
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    ctx.body = new ErrorModel(10100, '账号登录状态校验失败：token 格式错误')
    return
  }

  const token = parts[1]
  const payload = verifyAccessToken(token)

  if (payload) {
    // token 有效，将用户信息存储到 ctx.state
    ctx.state.userInfo = {
      username: payload.username,
      userId: payload.userId
    }
    await next()
  } else {
    ctx.body = new ErrorModel(10100, '账号登录状态校验失败：token 已过期或无效')
  }
}
