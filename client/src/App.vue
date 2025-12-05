<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: "App",

  created() {
    // 未登录情况：清空 store
    if (!localStorage.token) {
      this.$store.dispatch("clearCurrentState");
      return;
    }

    // 解析 token
    let decoded;
    try {
      decoded = jwt_decode(localStorage.token);
    } catch (err) {
      localStorage.removeItem("token");
      this.$store.dispatch("clearCurrentState");
      return;
    }

    // 过期检查
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      this.$store.dispatch("clearCurrentState");
      return;
    }

    // 正常设置
    this.$store.dispatch("setAuthenticated", true);
    this.$store.dispatch("setUser", decoded);

    // identity 解析
    let identity = {};
    try {
      identity = localStorage.identity ? JSON.parse(localStorage.identity) : {};
    } catch (e) {
      identity = {};
    }

    this.$store.dispatch("setIdentity", identity);
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
