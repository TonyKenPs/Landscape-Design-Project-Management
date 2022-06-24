import axios from "axios";
import { Message, Loading } from "element-ui";

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0,0,0,0,7)",
  });
}

function endLoading() {
  loading.close();
}
//请求拦截
axios.interceptors.request.use(
  (config) => {
    //animate
    startLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//拦截回应
axios.interceptors.response.use(
  (response) => {
    //stop animate
    endLoading();
    return response;
  },
  (error) => {
    endLoading();
    //Message.error(error.response);
    return Promise.reject(error);
  }
);
export default axios;
