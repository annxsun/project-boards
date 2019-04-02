import axios from 'axios';
import router from '../router/router';
import store from '../store/index';
import { Message } from 'element-ui';

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, message) => {
    switch (status) {
        case 401:
            toLogin();
            break;
        case 403:
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            store.commit('user/setToken', '');
            store.commit('user/setUser', {});
            toLogin();
            break;
        case 404:
            Message({
                type: 'error',
                message: '你访问的资源不存在'
            })
            break;
        default:
            console.log(message);   
    }
}

// 创建axios实例
var instance = axios.create({timeout: 3000});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {        
        let token = sessionStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;    
    },    
    error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // TODO
        }
    });

export default instance;