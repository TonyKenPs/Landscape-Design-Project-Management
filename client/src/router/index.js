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

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const isLogin = auth.isAuthenticated || localStorage.token;

  // 登录、注册不拦
  if (to.path === '/login' || to.path === '/register') {
    return next();
  }

  // 未登录 → login
  if (!isLogin) {
    return next('/login');
  }

  next();
});

export default router;
