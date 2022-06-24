import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import Login from "../views/login.vue";
import Home from "../views/Home.vue";
import InfoShow from "../views/InfoShow.vue";
import designList from "../views/designList.vue";
import department from "../views/department.vue";
import document from "../views/document.vue";
import designcharts from "../views/Charts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: InfoShow,
      },
      {
        path: "/designlist",
        name: "designlist",
        component: designList,
      },
      {
        path: "/department",
        name: "department",
        component: department,
      },
      {
        path: "/document",
        name: "document",
        component: document,
      },
      {
        path: "/designcharts",
        name: "designcharts",
        component: designcharts,
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "*",
    name: "/404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("login");
  }
});

export default router;
