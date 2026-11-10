# Client

Vue 3 + Vite frontend. Requires **Node.js 20.19+**.

Place the project background image at `src/assets/bg.jpg` (not tracked by git).

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

The Vite development server proxies `/api` requests to the backend at `http://localhost:34586`, so the browser only ever talks to the same origin. This matters for the session cookie.

## Authentication

The session token is issued by the backend as an `httpOnly; SameSite=Strict` cookie; it is never stored in `localStorage`.

- `src/http.js` creates the Axios instance with `withCredentials: true`.
- `src/router/index.js` checks `GET /api/users/current` once per page load and redirects to `/login` when it fails.
- `src/store/auth.js` keeps the user and identity in memory (Pinia).

## Production build

```sh
npm run build
```

Output goes to `dist/`. Serve it behind the same origin as the API, or configure a reverse proxy so `/api` and the cookie still line up.
