const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')
const static = require('koa-static')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')
const address = require('./routes/address')
const shop = require('./routes/shop')
const order = require('./routes/order')
const hotwords = require('./routes/hotwords')

// error handler
onerror(app)

// cors 配置
app.use(cors({
  // 动态允许前端 origin，避免端口或主机（localhost/127.0.0.1/局域网 IP）不一致导致的跨域 cookie 问题
  origin: (ctx) => {
    const requestOrigin = ctx.request && ctx.request.header && ctx.request.header.origin
    return requestOrigin || 'http://localhost:8080'
  },
  credentials: true, // 允许跨域带 cookie
}))

// session 配置
app.keys = ['!Xli3@2851#6HBN$DBHX%Q'] //秘钥，用于加密
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(static(path.join(__dirname, '/public')))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(address.routes(), address.allowedMethods())
app.use(shop.routes(), shop.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(hotwords.routes(), hotwords.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 后端服务启动成功！
  
  本地访问:
    http://localhost:${PORT}
  
  局域网访问（手机可用）:
    http://192.168.1.2:${PORT}
  
  测试链接:
    http://192.168.1.2:${PORT}/api/test
    http://192.168.1.2:${PORT}/images/product/xigua.jpg
  `);
});

module.exports = app
