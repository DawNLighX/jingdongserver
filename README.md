# jingdongserver (京东到家后端服务)

## 项目简介

# jingdongserver（后端服务）

简短说明
-----------------
这是一个基于 Koa + MongoDB 的后端 API 服务（京东到家仿真项目），为移动端/PC 前端提供用户认证、地址管理、门店与商品查询、订单管理等 RESTful 接口。

适用场景
- 本地开发与联调（与 `jingdongdelivery` 前端配合）
- 小规模教学演示或功能原型验证

快速上手
-----------------
先决条件
- Node.js（推荐 14+ 或 16+）
- npm
- 可选：MongoDB（本地或 Atlas）

安装依赖
```powershell
cd jingdongserver
npm install
```

运行（开发）
```powershell
# Windows
npm run dev-win

# macOS / Linux
npm run dev
```
默认监听端口由 `PORT` 环境变量控制（未设置时使用项目内默认）。示例：
```powershell
PORT=3001 npm run dev
```

项目结构（简要）
- `bin/www`：服务启动脚本
- `src/app.js`：Koa 应用与中间件注册
- `src/routes/*`：路由定义（users/address/shop/order 等）
- `src/controller/*`：业务逻辑实现
- `src/models/*`：Mongoose 模型
- `src/middleware/*`：中间件（如 `tokenCheck`）
- `src/public/`：静态资源（图片）

重要配置
- CORS 在 `src/app.js` 中按请求来源动态允许 `origin`，并开启 `credentials: true` 以支持跨域 cookie。
- refreshToken 以 HttpOnly cookie 存储；开发环境下 cookie 使用 `sameSite: 'lax'` + `secure: false`，生产环境使用 `sameSite: 'none'` + `secure: true`（需 HTTPS）。

环境变量
- `PORT`：服务端口
- `MONGO_URI`：MongoDB 连接字符串（优先使用此配置）
- `NODE_ENV`：影响 cookie 与日志等行为（`production` 或 `development`）

常用命令
- `npm run dev` / `npm run dev-win`：开发（nodemon）
# jingdongserver（后端）

简短说明
-----------------
基于 Koa + MongoDB 的京东到家后端服务，为前端提供用户认证、地址管理、门店与商品查询、订单管理等 RESTful 接口，适合本地联调与功能验证。

快速上手
-----------------
先决条件
- Node.js（推荐 14+ 或 16+）
- npm
- 可选：MongoDB（本地或 Atlas）

安装依赖
```bash
cd jingdongserver
npm install
```

开发运行
```bash
# Windows
npm run dev-win

# macOS / Linux
npm run dev
```
默认监听端口由 `PORT` 环境变量控制，示例：
```bash
PORT=3001 npm run dev
```

项目要点
-----------------
- 框架：Koa 2
- 数据库：MongoDB（Mongoose）
- 认证：使用 JWT（accessToken） + HttpOnly refreshToken cookie
- 跨域：CORS 动态允许前端 origin 并支持 `credentials`

与前端联调注意事项
-----------------
- 前端 `baseURL` 必须指向后端（含端口与协议），并且 `axios` 使用 `withCredentials: true` 以携带 HttpOnly cookie。
- 开发环境下后端将 `refreshToken` cookie 设置为 `sameSite: 'lax'` 且 `secure: false`，生产环境设置为 `sameSite: 'none'` 且 `secure: true`（需要 HTTPS）。
- 若出现 `Cannot send secure cookie over unencrypted connection`，请确认 `NODE_ENV` 是否为 `production` 并调整 cookie 配置或使用 HTTPS。

目录结构（核心）
```
jingdongserver/
├── bin/www           # 启动脚本
├── src/
│   ├── app.js        # Koa 应用与中间件
│   ├── routes/       # 路由（users,address,shop,order...）
│   ├── controller/   # 业务逻辑
│   ├── models/       # Mongoose 模型
│   ├── middleware/   # 自定义中间件（tokenCheck 等）
│   └── public/       # 静态资源
└── package.json
```

示例 API
-----------------
- POST `/api/user/register`  注册（成功返回 `errno:0` 且 `data.accessToken`）
- POST `/api/user/login`     登录（成功返回 `errno:0` 且 `data.accessToken`，设置 HttpOnly refreshToken cookie）
- POST `/api/user/refreshToken` 刷新 accessToken（从 HttpOnly refreshToken cookie 读取）
- 地址管理：`/api/user/address`（GET/POST/PATCH/DELETE）
- 订单：`/api/order`（创建、查询）

常见问题
-----------------
- 无法访问：检查防火墙、端口占用与 `PORT` 环境变量
- 注册报 `E11000 duplicate key`：用户名已存在，前端应在注册前提示或后端返回友好错误
- secure cookie 报错：开发时请保持 `secure: false` 或使用 HTTPS

常用命令
-----------------
- `npm run dev` / `npm run dev-win`：开发（nodemon）
- `npm run start`：运行 `node bin/www`
- `npm run prd`：生产（PM2）

贡献与联系
-----------------
- 欢迎提交 Issue/PR。如需我自动从 `src/routes` 生成更详细接口文档，我可以继续帮忙。

---

以上为与前端 README 格式对称的后端 README（简洁版），已覆盖启动、联调要点与常见问题。


