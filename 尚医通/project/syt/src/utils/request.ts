//封装axois的目的
//1.利用axios请求，响应式拦截器功能
//2. 请求拦截器,一班在请求头中携带公共的参数token
//3.相应拦截器,简化服务器返回的数据,处理http网络错误
import axios from 'axios'
import { ElMessage } from 'element-plus'
import UserStore from '@/store/modules/user'
// import 
//利用axios 的create方法创建一个axios的实例,可以设置基础路径，超时的时间的设置
const request = axios.create({
    baseURL: '/api',//请求的基础路径的设置
    timeout: 5000//超时的时间设置,超出五秒请求就是失败的
})

//添加请求拦截器
request.interceptors.request.use((config) => {
    //config请求拦截器回调注入的对象（配置对象),最重要的是有一个headers属性
    //可以通过请求头携带参数token
    // config.headers.aaa = 123
    let userstore = UserStore()
    if (userstore.userInfo.token) {
        config.headers.token = userstore.userInfo.token
    }
    return config

})


//相应拦截器
request.interceptors.response.use((response) => {
    return response.data

}, (error) => {
    let status = error.response.status
    //处理http网络的错误
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: error.message
            })
            break;
        case 500 | 501 | 502 | 504 | 505:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: '参数有误'
            })
            break;

    }
    return Promise.reject(new Error(error.message))
})
export default request