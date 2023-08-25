import axios from "axios"
//引入进度条
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
//start进度条开始 done；进度条结束
//利用案axios对象方法creat,去创建一个axios实例
let uuid = localStorage.getItem('UUID')
const requests = axios.create({
    //基础路径，发送请求时，路径中会出现api
    baseURL: '/api',
    //代表请求超时的时间
    timeout: 5000,
})

//请求拦截器：再请求发送之前
requests.interceptors.request.use((config) => {
    //config 配置对象，对象里面有一个header
    if (uuid) {
        config.headers.userTempId = uuid
    }
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')

    }
    nProgress.start()
    return config
})
requests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
}, (error) => {
    // console.log(error)
    // alert('2')
    return Promise.reject(new Error('fail'))
}

)
export default requests