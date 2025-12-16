/**
 * @description users router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { register, login } = require('../controller/user') 
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/user')

// 注册
router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body

  try {
    const newUser = await register(username, password)

    ctx.body = new SuccessModel(newUser)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(10001, `${ex.message}`)
  }

})

// 登录
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body

  const user = await login(username, password)
  if (user) {
    ctx.session.userInfo = { username } // 设置session

    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel(10002, '用户名或密码错误，登录失败！')
  }

})


module.exports = router
