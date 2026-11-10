// src/http.js
import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";

let loadingInstance;

// 开启 loading
function startLoading() {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0,0,0,0.7)",
  });
}

// 关闭 loading
function endLoading() {
  loadingInstance && loadingInstance.close();
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    startLoading();

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    endLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    endLoading();
    // 返回完整 response，兼容旧页面中 res.data 的读取方式
    return response;
  },
  (error) => {
    endLoading();
    ElMessage.error(error.response?.data?.meta?.msg || error.response?.data?.message || "请求失败，请稍后重试");
    return Promise.reject(error);
  }
);

export default service;
