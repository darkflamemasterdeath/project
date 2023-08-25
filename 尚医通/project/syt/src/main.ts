import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/reset.scss'
//引入全局组件--顶部底部都是全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import Buttom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
//国际化文件
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入pinia仓库
import pinia from '@/store'
//引入router核心插件并安装
import router from '@/router/index'
import Visiter from '@/components/visitor/index.vue'
import './permisstion'
const app = createApp(App)
app.component('Login', Login)
app.component('Hospital_top', HospitalTop)
app.component('Buttom', Buttom)
app.component('Visiter', Visiter)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
//安装仓库
app.use(pinia)

// app.use(ElementPlus)
app.mount('#app')
