/**
 * @description users router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { register, login } = require('../controller/user') 
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, refreshAccessToken } = require('../utils/jwt')

router.prefix('/api/user')

// 错误码
const USER_ERROR = {
  REGISTER_FAILED: 10000,
  LOGIN_FAILED: 10001
}

// 注册
router.post('/register', async function (ctx) {
  const { username, password } = ctx.request.body || {}

  if (!username || !password) {
    ctx.body = new ErrorModel(USER_ERROR.REGISTER_FAILED, '用户名和密码不能为空')
    return
  }

  const cleanUsername = (username || '').trim()
  const cleanPassword = (password || '').trim()

  try {
    const newUser = await register(cleanUsername, cleanPassword)

    // 生成 token
    const tokenPayload = {
      username: newUser.username,
      userId: newUser._id
    }
    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload)

    // 把 refreshToken 写入 HttpOnly cookie（前端不直接获取）
    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 天（ms）
    const cookieOpts = {
      httpOnly: true,
      maxAge: refreshMaxAge
    }
    if (process.env.NODE_ENV === 'production') {
      // 生产环境使用跨站点 cookie（需 HTTPS）
      cookieOpts.sameSite = 'none'
      cookieOpts.secure = true
    } else {
      // 开发环境使用较宽松设置，避免 secure cookie 在 HTTP 下抛错
      cookieOpts.sameSite = 'lax'
      cookieOpts.secure = false
    }
    ctx.cookies.set('refreshToken', refreshToken, cookieOpts)

    // 注释掉 session 设置（改用 token）
    // ctx.session.userInfo = {
    //   username: newUser.username,
    //   userId: newUser._id
    // }

    // 返回 accessToken（前端用于请求）
    ctx.body = new SuccessModel({
      username: newUser.username,
      id: newUser._id || newUser.id,
      createdAt: newUser.createdAt,
      accessToken
    })
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(USER_ERROR.REGISTER_FAILED, `${ex.message}`)
  }
})

// 登录
router.post('/login', async function (ctx) {
  const { username, password } = ctx.request.body || {}

  if (!username || !password) {
    ctx.body = new ErrorModel(USER_ERROR.LOGIN_FAILED, '用户名和密码不能为空')
    return
  }

  const cleanUsername = (username || '').trim()
  const cleanPassword = (password || '').trim()

  try {
    const user = await login(cleanUsername, cleanPassword)

    if (user) {
      // 生成 token
      const tokenPayload = {
        username: user.username,
        userId: user._id
      }
      const accessToken = generateAccessToken(tokenPayload)
      const refreshToken = generateRefreshToken(tokenPayload)

      // 把 refreshToken 写入 HttpOnly cookie（前端不直接获取）
      const refreshMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 天（ms）
      const cookieOpts = {
        httpOnly: true,
        maxAge: refreshMaxAge
      }
      if (process.env.NODE_ENV === 'production') {
        cookieOpts.sameSite = 'none'
        cookieOpts.secure = true
      } else {
        cookieOpts.sameSite = 'lax'
        cookieOpts.secure = false
      }
      ctx.cookies.set('refreshToken', refreshToken, cookieOpts)

      // 注释掉 session 设置（改用 token）
      // ctx.session.userInfo = {
      //   username: user.username,
      //   userId: user._id
      // }

      ctx.body = new SuccessModel({
        username: user.username,
        id: user._id,
        accessToken
      })
      console.log('login success response:', ctx.body)
    } else {
      ctx.body = new ErrorModel(USER_ERROR.LOGIN_FAILED, '用户名或密码错误，登录失败！')
    }
  } catch (ex) {
      console.error('登录失败:', ex)
      ctx.body = new ErrorModel(USER_ERROR.LOGIN_FAILED, '登录失败，请稍后重试')
  }
})

// 刷新 token（从 HttpOnly cookie 读取 refreshToken）
router.post('/refreshToken', async function (ctx) {
  try {
    const refreshToken = ctx.cookies.get('refreshToken')

    if (!refreshToken) {
      ctx.body = new ErrorModel(10101, 'refreshToken 不能为空')
      return
    }

    const result = refreshAccessToken(refreshToken)

    if (result) {
      // 轮换 refreshToken：设置新的 HttpOnly cookie
      const refreshMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 天（ms）
      const cookieOpts = {
        httpOnly: true,
        maxAge: refreshMaxAge
      }
      if (process.env.NODE_ENV === 'production') {
        cookieOpts.sameSite = 'none'
        cookieOpts.secure = true
      } else {
        cookieOpts.sameSite = 'lax'
        cookieOpts.secure = false
      }
      ctx.cookies.set('refreshToken', result.refreshToken, cookieOpts)

      ctx.body = new SuccessModel({
        accessToken: result.accessToken
      })
    } else {
      ctx.body = new ErrorModel(10102, 'refreshToken 已过期，请重新登录')
    }
  } catch (ex) {
    console.error('刷新 token 失败:', ex)
    ctx.body = new ErrorModel(10102, '刷新 token 失败')
  }
})

// 注销（清除 refreshToken cookie）
router.post('/logout', async function (ctx) {
  try {
    ctx.cookies.set('refreshToken', '', { httpOnly: true, maxAge: 0 })
    ctx.body = new SuccessModel({})
  } catch (ex) {
    console.error('注销失败:', ex)
    ctx.body = new ErrorModel(10103, '注销失败')
  }
})

module.exports = router
