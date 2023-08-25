//路由鉴权
//引入路由器
import router from './router'
//@ts-ignore
import Nprogress from 'nprogress'
//引入进度条的样式
import 'nprogress/nprogress.css'
import UserStore from './store/modules/user'
import pinia from '@/store'
let userstore = UserStore(pinia)
//添加全局守卫
let whiteList = ['/home', '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search']
//前置首位
router.beforeEach((to, from, next) => {
    //访问路由进入之前
    document.title = `尚医通${to.meta.title}`
    Nprogress.start()
    console.log(from)
    let token = userstore.userInfo.token
    if (token) {
        next()
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            userstore.visiable = true
            next({ path: '/home', query: { redirect: to.fullPath } })
        }
    }
    next()
})
//后置路由
router.afterEach(() => {
    Nprogress.done()
})