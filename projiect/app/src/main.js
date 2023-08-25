import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination/index.vue'
import store from './store/index'
import './mock/mockServe'
import 'swiper/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui'
import midouzi from '@/assets/OIP-C.jpg'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: midouzi
})
import Mypuls from '@/plugins/darks.js'
//引入表单验证
import '@/plugins/validate.js'
Vue.use(Mypuls, {
  name: 'ywj'
})
//引入路由
import router from './router'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
