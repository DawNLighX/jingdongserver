/**
 * @description users router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { register, login } = require('../controller/user') 
const { SuccessModel, ErrorModel } = require('../res-model/index')

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

    ctx.body = new SuccessModel({
      username: newUser.username,
      id: newUser._id || newUser.id,
      createdAt: newUser.createdAt
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
      ctx.session.userInfo = { username } // 设置session

      ctx.body = new SuccessModel({
        username: user.username
      })
    } else {
      ctx.body = new ErrorModel(USER_ERROR.LOGIN_FAILED, '用户名或密码错误，登录失败！')
    }
  } catch (ex) {
      console.error('登录失败:', ex)
      ctx.body = new ErrorModel(USER_ERROR.LOGIN_FAILED, '登录失败，请稍后重试')
  }
})

module.exports = router
