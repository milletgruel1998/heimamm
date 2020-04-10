/* 导入axios插件 */
import axios from "axios";
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/token.js'
import router from '@/router/router.js'
/* 自定义axios默认值 */
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL, // 配置默认基地址
    withCredentials: true // 跨域照样携带cookie
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
        config.headers.token = getToken();
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        return response.data; // 只响应data数据
    } else if (response.data.code == 206) {
        // token出错处理
        Message.error(response.data.message);
        // 跳转到登录页
        router.push('/');
        // 清除掉token
        removeToken()
        return Promise.reject("error")
    } else {
        Message.error(response.data.message);
        // 抛出一个错误，不要让后面的代码执行
        return Promise.reject("error")
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance 