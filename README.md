# 景观设计项目管理系统

基于 **Vue 3 + Express 5 + MySQL** 的景观设计项目管理与展示系统，包含用户登录注册、设计项目、部门与预算、文档列表和统计图表。

> 前端已从 Vue 2 + vue-cli 迁移到 Vue 3 + Vite，后端同步升级到 Express 5，并完成登录态、限流与密码策略的加固。

## 技术栈

| 层 | 选型 |
|---|---|
| 前端 | Vue 3.5、Vite 8、Element Plus 2.14、Pinia 4、vue-router 5、ECharts 6、Axios |
| 后端 | Node.js、Express 5、Sequelize 6、mysql2 |
| 鉴权 | JWT（HS256，存于 httpOnly Cookie）、bcrypt（12 轮） |
| 安全 | helmet、express-rate-limit、SameSite=Strict Cookie |
| CI | GitHub Actions（CI 构建 + CodeQL 代码扫描） |

## 环境要求

- **Node.js 20.19+**（Vite 8 的要求；后端本身只需 18+）
- MySQL 5.7 或 8.0
- npm

## 目录结构

```
.
├─ client/                     前端（Vite + Vue 3）
│  ├─ src/
│  │  ├─ components/           HeadNav、LeftMenu、Dialog 等通用组件
│  │  ├─ views/                登录、注册、首页、设计、部门、文档、图表
│  │  ├─ router/index.js       路由表与登录守卫
│  │  ├─ store/auth.js         Pinia 登录态（用户、身份）
│  │  └─ http.js               Axios 实例（withCredentials）
│  └─ vite.config.js           开发代理：/api → http://localhost:34586
├─ routes/                     各业务接口处理器
├─ models/                     Sequelize 模型，启动时 sync() 建表
├─ middleware/                 auth（requireAuth / requireAdmin）、rateLimit
├─ lib/                        password（bcrypt）、session（Cookie）
├─ config/env.js               环境变量装载与必填校验
├─ db/migrations/              需要手工执行的表结构变更
└─ server.js                   后端入口，默认端口 34586
```

## 快速开始

### 1. 准备数据库

```sql
CREATE DATABASE landscape CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

表结构由模型在服务启动时通过 `sync()` 自动创建。**从早期版本升级的已有库**还需要执行 `db/migrations/` 下的脚本（例如把 `users.phone` 从 `INT` 改成 `VARCHAR(20)`），否则 11 位手机号仍会写入失败。

### 2. 启动后端

```bash
npm install
cp .env.example .env          # Windows: copy .env.example .env
# 编辑 .env，至少填写 DB_NAME / DB_USER / DB_PASSWORD / JWT_SECRET
npm run server                # nodemon 热重载
# 或 npm start
```

启动后监听 `http://localhost:34586`，控制台应出现 `DB connected` 与 `User model sync success!`。

### 3. 启动前端

```bash
cd client
npm install
npm run dev                   # http://localhost:5173
```

开发服务器把 `/api` 代理到 `http://localhost:34586`，浏览器侧始终是同源请求，httpOnly Cookie 才能正常下发与携带。项目背景图放在 `client/src/assets/bg.jpg`（未纳入版本库，缺失时登录页背景为空）。

### 4. 生产构建

```bash
cd client
npm run build                 # 产物输出到 client/dist
```

后端只提供 `/api`，`dist` 交给任意静态服务器或反向代理托管。跨域部署时需要自行配置代理与 Cookie 的 Domain/Secure，不建议直接开放 CORS。

## 常用命令

| 位置 | 命令 | 说明 |
|---|---|---|
| 根目录 | `npm start` | 启动后端（node） |
| 根目录 | `npm run server` | 启动后端（nodemon 热重载） |
| `client/` | `npm run dev` | Vite 开发服务器 |
| `client/` | `npm run build` | 生产构建 |
| `client/` | `npm run preview` | 本地预览构建产物 |

根目录的 `npm test` 仍是占位脚本，尚未接入测试框架。

## 环境变量

| 变量 | 必填 | 说明 |
|---|---|---|
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` | 是 | 数据库连接，缺任一项启动即报错 |
| `DB_HOST` / `DB_PORT` | 否 | 默认 `127.0.0.1` / `3306` |
| `JWT_SECRET` | 是 | 签名密钥，建议 32 字节以上随机值 |
| `JWT_EXPIRES_IN` | 否 | 默认 `8h`，同时决定会话 Cookie 的 Max-Age |
| `COOKIE_SECURE` | 否 | `1` 强制 Secure（仅 HTTPS），`0` 关闭；未设置时跟随 `NODE_ENV=production` |
| `TRUST_PROXY` | 否 | `1` 表示信任一层 `X-Forwarded-For`；部署在反向代理后必须开启，否则限流会把所有请求算成一个 IP |

## 主要接口

| 方法与路径 | 说明 |
|---|---|
| `POST /api/login/logincheck` | 登录，成功后下发 `session` Cookie |
| `POST /api/login/register` | 注册（用户名 2–30 字符；密码 ≥8 位且 ≤72 字节；电话 6–20 位数字） |
| `POST /api/login/logout` | 登出，清除 Cookie |
| `GET /api/users/current` | 当前登录用户信息 |
| `GET /api/user/getuser` | 用户列表 |
| `GET/POST /api/design/designlist` | 设计项目列表 |
| `POST /api/design/adddesign`、`/editdesign`、`/deletedesign` | 项目增删改（管理员） |
| `GET /api/design/designchartdata` | 统计图表数据 |
| `GET /api/department/departmentlist`、`/getdepartmentbudget`、`/budgetlist` | 部门与预算查询 |
| `POST /api/department/adddepartment`、`/editdepartment`、`/deletedepartment`、`/budget` | 部门维护（管理员） |
| `GET /api/document/getdoc` | 文档列表 |
| `POST /api/search/search` | 检索 |

除登录、注册、登出外，上述接口都要求已登录；带「管理员」的接口还会校验 `identity === "admin"`。

> 历史遗留：`routes/main.js` 中的同一个 Router 同时挂载在 `/api/login`、`/api/design`、`/api/department`、`/api/user`、`/api/document` 之下，因此同一处理器在多个前缀下都能访问。新增接口时建议先在 `routes/main.js` 里固定归属前缀，避免继续扩大这个现象。

## 安全机制

- 登录令牌只保存在 `httpOnly; SameSite=Strict` 的 Cookie 中，前端 JS 无法读取，响应体也不返回 token；服务端同时兼容 `Authorization: Bearer`，便于脚本或第三方调用。
- 全站限流 **300 次 / 15 分钟 / IP**；登录与注册额外限制 **10 次 / 15 分钟**。
- 密码使用 bcrypt（12 轮）哈希；登录失败统一返回同一提示，未知用户也会执行一次哈希以消除响应时间差。
- 请求体上限 100 KB，启用 helmet 默认安全头并关闭 `x-powered-by`。
- 注册时 `identity` 由服务端固定为 `staff`，不采用前端传值，避免自助提升为管理员。

## 已知限制

- 前端头像使用 Gravatar 外链，内网或离线环境加载失败（不影响功能）。
- `uuid`（经 `sequelize` 传递依赖）存在 1 条 moderate 告警，sequelize 6 暂无修复版本。
- CI 工作流使用 Node 18，而 Vite 8 要求 20.19+；运行 `npm run build` 前建议把 workflow 中的 `node-version` 提升到 20 或 22。

## 开发约定

- 提交前保证 `client` 能通过 `npm run build`，改动的后端文件能通过 `node --check`。
- 不提交 `.env`、`node_modules`、`client/dist`、`npm-audit-*.json`。
- 依赖变更后同步更新 `package-lock.json`；新增依赖优先选择官方仓库、无 install 脚本、来源可核验的包。
- 数据库结构变更统一放到 `db/migrations/`，脚本头部写明备份与回滚命令。
