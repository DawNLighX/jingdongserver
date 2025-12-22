# jingdongserver (京东到家后端服务)

## 项目简介

这是一个使用 Koa 2 + MongoDB 开发的京东到家后端 API 服务，为前端应用（jingdongdelivery）提供数据接口支持。

## 主要特性

- **框架**：Koa 2（轻量级 Node.js 框架）
- **数据库**：MongoDB（mongoose ODM）
- **跨域**：支持 CORS（配置来自 localhost:8080 的前端）
- **会话管理**：koa-generic-session + cookie
- **请求处理**：bodyparser、JSON、日志、静态资源服务
- **代码质量**：ESLint 检查
- **密码安全**：bcryptjs 加密存储用户密码

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Koa 2, Koa Router |
| 数据库 | MongoDB, Mongoose 9 |
| 中间件 | bodyparser, CORS, session, static, logger |
| 开发工具 | nodemon, ESLint, PM2(生产) |

## 快速开始

### 1. 安装依赖

```powershell
npm install
```

### 2. 环境配置

- 项目支持使用 MongoDB Atlas（云端）或本地 MongoDB。最新提交已支持通过环境变量 `MONGO_URI` 连接到 Atlas。
- 若未配置 `MONGO_URI`，项目会回退到本地默认连接（若代码中有默认值）。
- 前端地址应为 `http://localhost:8080`（CORS 配置见 `src/app.js`）

### 3. 启动开发服务

```powershell
# Windows PowerShell
npm run dev-win

# macOS / Linux
npm run dev
```

服务运行在 `http://localhost:3000`（默认）或环境变量 `PORT` 指定的端口。

### 4. 生产部署

```powershell
npm run prd
```

使用 PM2 启动进程管理。

## 项目结构

```
jingdongserver/
├── bin/
│   └── www                    # 启动脚本入口
├── src/
│   ├── app.js                 # Koa 应用主配置（中间件、路由挂载）
│   ├── routes/                # 路由层（API 端点定义）
│   │   ├── index.js           # 首页路由
│   │   ├── users.js           # 用户相关（登录、注册、信息）
│   │   ├── address.js         # 地址管理路由
│   │   ├── shop.js            # 商店相关路由
│   │   ├── order.js           # 订单相关路由
│   │   └── hotwords.js        # 热搜词路由
│   ├── controller/            # 业务逻辑层（路由处理函数）
│   ├── models/                # MongoDB 数据模型（Mongoose Schema）
│   ├── db/                    # 数据库连接与配置
│   ├── middleware/            # 自定义中间件
│   ├── res-model/             # 响应数据模型（标准返回格式）
│   ├── public/                # 静态资源（图片等）
│   │   └── images/
│   │       └── product/       # 商品图片存放目录
│   └── views/                 # 视图模板（Pug）
├── docs/                      # 文档
├── package.json
└── README.md

```

## API 端点概览

| 模块 | 路由文件 | 说明 |
|------|---------|------|
| 用户 | `routes/users.js` | 登录、注册、用户信息、密码修改等 |
| 地址 | `routes/address.js` | 地址增删改查 |
| 商店 | `routes/shop.js` | 商店列表、商品、详情等 |
| 订单 | `routes/order.js` | 订单创建、查询、取消等 |
| 热搜 | `routes/hotwords.js` | 热搜词、搜索建议 |

> 详细 API 文档可见 `docs/` 目录

## 静态资源配置

静态资源（图片等）存放于 `src/public/`，通过 koa-static 中间件暴露：

```javascript
app.use(static(path.join(__dirname, '/public')))
```

访问方式：
- 本地：`http://localhost:3000/images/product/xigua.jpg`
- 局域网：`http://192.168.x.x:3000/images/product/xigua.jpg`

数据库存储相对路径 `/images/product/xigua.jpg`，前端拼接完整 URL。

## CORS 与会话

- **CORS 来源**：`http://localhost:8080`（前端开发服务器）
- **Cookie 支持**：`credentials: true`
- **会话密钥**：`!Xli3@2851#6HBN$DBHX%Q`（生产环境应改为环保护的环境变量）

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 3000 | 服务监听端口 |
| `MONGO_URI` | — | MongoDB 连接字符串（推荐在生产/部署时配置为 Atlas 的连接字符串；若不提供，项目可能使用代码中的默认本地地址） |
| `DB_NAME` | jingdongDB | 可选：当 `MONGO_URI` 为不含数据库名的基础 URI 时，可用此变量指定数据库名 |

## 测试 API

```bash
# 测试服务是否运行
curl http://localhost:3000/api/test

# 测试静态资源（图片）
curl http://localhost:3000/images/product/xigua.jpg
```

## 常见问题

**Q: MongoDB 连接失败怎么办？**
- A: 确保 MongoDB 服务运行。Windows 可用 `mongod` 启动；macOS 用 Homebrew；云端用 Atlas。

**Q: CORS 错误（跨域访问被拒）？**
- A: 检查前端的 URL 是否为 `http://localhost:8080`；若不同，修改 `src/app.js` 中的 CORS 配置。

**Q: 图片 404？**
- A: 检查图片文件是否在 `src/public/images/product/` 目录；确保数据库存的路径与实际目录结构一致。

**Q: 如何切换到生产环境？**
- A: 修改 CORS origin、数据库 URI、SESSION 密钥，然后运行 `npm run prd` 使用 PM2。

## 开发建议

1. **热重载**：使用 `npm run dev-win`（或 `npm run dev`）启动 nodemon，自动重启服务。
2. **调试**：可用 VS Code 的 Debugger 或 `console.log` 调试。
3. **代码风格**：项目配置了 ESLint，运行 `npm run lint` 检查。
4. **API 设计**：遵循 RESTful 规范，在 `res-model/` 中定义统一的响应格式。

## 部署到云端

- **Heroku**：配置 `Procfile`、添加 MongoDB Atlas，`git push heroku main`
- **阿里云 / 腾讯云**：配置 ECS + RDS MongoDB，使用 PM2 或 Docker 容器化
- **Docker**：编写 `Dockerfile` 和 `docker-compose.yml`，一键启动

## 联系与反馈

如需帮助，可以：
- 检查 `docs/` 里的接口文档
- 修改 CORS/PORT/数据库连接信息后重启服务
- 联系我生成更详细的 API 文档或部署配置

---

**模块状态说明**

- **地址管理**：具备完整的增（POST `/api/user/address`）、查（GET `/api/user/address`、GET `/api/user/address/:id`）、改（PATCH `/api/user/address/:id`）、删（DELETE `/api/user/address/:id`）接口，前后端均已实现。
- **订单管理**：仅保留创建与查询（POST `/api/order`、GET `/api/order`）接口；前端的删除操作仅在 UI 层移除展示项，后端不会删除订单数据以保留历史记录（无 DELETE `/api/order/:id`）。
- **用户管理**：包含注册/登录和会话管理，密码使用 `bcryptjs` 加密；目前不提供用户资料的在线修改接口（如需要可以扩展）。

如需调整模块权限或增加额外接口（例如订单删除或用户信息修改），可以在 `src/routes` 与 `src/controller` 中扩展相应路由与逻辑。

