import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import Index from '@/views/index.vue';
import Register from '@/views/Register.vue';
import NotFound from '@/views/404.vue';
import Login from '@/views/login.vue';
import Home from '@/views/Home.vue';
import InfoShow from '@/views/InfoShow.vue';
import designList from '@/views/designList.vue';
import department from '@/views/department.vue';
import document from '@/views/document.vue';
import designcharts from '@/views/Charts.vue';

const routes = [
  { path: '/', redirect: '/index' },

  {
    path: '/index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: 'home', name: 'home', component: Home },
      { path: 'infoshow', name: 'infoshow', component: InfoShow },
      { path: 'designlist', name: 'designlist', component: designList },
      { path: 'department', name: 'department', component: department },
      { path: 'document', name: 'document', component: document },
      { path: 'designcharts', name: 'designcharts', component: designcharts },
    ],
  },

  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 登录、注册不拦
const PUBLIC_PATHS = ['/login', '/register'];

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (PUBLIC_PATHS.includes(to.path)) {
    return true;
  }

  // The token is an httpOnly cookie now, so the guard probes the API once per
  // page load instead of reading localStorage.
  if (await auth.ensureSession()) {
    return true;
  }

  // 未登录 → login
  return { path: '/login', query: { redirect: to.fullPath } };
});

export default router;
