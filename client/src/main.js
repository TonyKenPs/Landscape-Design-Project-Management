import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "./http"; // 我们的 axios 实例
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useAuthStore } from "./store/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.config.globalProperties.$axios = axios; // 组件中使用 this.$axios
app.config.globalProperties.$store = {
  get getters() {
    const auth = useAuthStore(pinia);
    return {
      user: auth.user,
      identity: auth.identity,
      isAuthenticated: auth.isAuthenticated,
    };
  },
  dispatch(action, payload) {
    const auth = useAuthStore(pinia);
    const actionMap = {
      setAuthenticated: () => auth.setAuthenticated(payload),
      setUser: () => auth.setUser(payload),
      setIdentity: () => auth.setIdentity(payload),
      clearCurrentState: () => auth.clearCurrentState(),
    };
    if (actionMap[action]) {
      actionMap[action]();
    } else {
      throw new Error(`Unknown store action: ${action}`);
    }
  },
};

app.mount("#app");