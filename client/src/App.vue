<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { jwtDecode } from "jwt-decode";

// 这里假设你有一个 Pinia Store，如 useAuthStore
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();

onMounted(() => {
  // 未登录情况：清空 store
  if (!localStorage.token) {
    auth.clearCurrentState();
    return;
  }

  // 解析 token
  let decoded;
  try {
    decoded = jwtDecode(localStorage.token);
  } catch (err) {
    localStorage.removeItem("token");
    auth.clearCurrentState();
    return;
  }

  // 过期检查
  const now = Date.now() / 1000;
  if (decoded.exp && decoded.exp < now) {
    localStorage.removeItem("token");
    auth.clearCurrentState();
    return;
  }

  // 正常设置
  auth.setAuthenticated(true);
  auth.setUser(decoded);

  // identity 解析
  let identity = {};
  try {
    identity = localStorage.identity
      ? JSON.parse(localStorage.identity)
      : {};
  } catch (e) {
    identity = {};
  }

  auth.setIdentity(identity);
});
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
