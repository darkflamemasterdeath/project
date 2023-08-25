import Vue from 'vue'
import Vuerouter from 'vue-router'
Vue.use(Vuerouter)
//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from '@/store'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
let originPush = Vuerouter.prototype.push
let originReplace = Vuerouter.prototype.replace
//重写push
Vuerouter.prototype.push = function (location, resolve, reject) {
    if (reject && resolve) {
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}
Vuerouter.prototype.replace = function (location, resolve, reject) {
    if (reject && resolve) {
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new Vuerouter({
    routes: [
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            children: [

                {
                    path: 'myorder',
                    component: myOrder
                }, {
                    path: 'grouporder',
                    component: groupOrder
                }, {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }

        },
        {
            path: '/pay',
            component: Pay,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/home',
            //路由懒加载
            component: () => import('@/pages/Home'),
            meta: { show: true }
        },
        {
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            meta: { show: true },
            name: 'search'
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/detail/:skuId',
            component: Detail
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/communication',
            component: () => import('@/pages/Communication/Communication'),
            children: [
                {
                    path: 'event',
                    component: () => import('@/pages/Communication/EventTest/EventTest'),
                    meta: {
                        show: false
                    },
                },
                {
                    path: 'model',
                    component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                    meta: {
                        show: false
                    },
                },
                {
                    path: 'sync',
                    component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                    meta: {
                        show: false
                    },
                },
                {
                    path: 'attrs-listeners',
                    component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                    meta: {
                        show: false
                    },
                },
                {
                    path: 'children-parent',
                    component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                    meta: {
                        show: false
                    },
                },
                {
                    path: 'scope-slot',
                    component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                    meta: {
                        show: false
                    },
                }
            ],
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }


})
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    // console.log(to, from)

    if (localStorage.getItem('token')) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            let name = store.state.user.userinfo.name
            // console.log(store.state.user.userinfo.name, '----')
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getuserinfo')
                    next()
                } catch (error) {
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()

        }

    }
})
export default router;