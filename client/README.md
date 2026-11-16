# Client

Vue 3 + Vite 前端，要求 **Node.js 20.19+**。

项目背景图放在 `src/assets/bg.jpg`（未纳入版本库）。

## 安装

```sh
npm install
```

## 开发

```sh
npm run dev
```

Vite 开发服务器把 `/api` 请求代理到后端 `http://localhost:34586`，浏览器始终是同源请求，这对会话 Cookie 的下发与携带很重要。

## 登录鉴权

会话令牌由后端以 `httpOnly; SameSite=Strict` Cookie 下发，不会存入 `localStorage`。

- `src/http.js` 创建 Axios 实例，并设置 `withCredentials: true`。
- `src/router/index.js` 在每次页面加载时请求一次 `GET /api/users/current`，失败则跳转 `/login`。
- `src/store/auth.js` 用 Pinia 在内存中保存用户与身份。

## 生产构建

```sh
npm run build
```

产物输出到 `dist/`。需与 API 同源托管，或通过反向代理让 `/api` 与 Cookie 保持同源。
