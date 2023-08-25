import { createRouter, createWebHistory } from 'vue-router'

//creatRouter用于创建路由实例，可以管理多个路由
export default createRouter({
    //路由模式的设置
    history: createWebHistory(),
    //管理路由
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/hospital',
            component: () => import('@/pages/Hospitals/index.vue'),
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospitals/register/index.vue'),
                    meta: {
                        title: '预约挂号'
                    }

                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospitals/detail/index.vue'),
                    meta: {
                        title: '医院详情'
                    }

                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospitals/notice/index.vue'),
                    meta: {
                        title: '预约通知'
                    }

                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospitals/close/index.vue'),
                    meta: {
                        title: '停诊信息'
                    }

                },
                {

                    path: 'search',
                    component: () => import('@/pages/hospitals/search/index.vue'),
                    meta: {
                        title: '查询'
                    }

                },
                {

                    path: 'register_step',
                    component: () => import('@/pages/Hospitals/register/register_step.vue'),
                    meta: {
                        title: '预约第一步'
                    }
                },
                {
                    path: 'register_step2',
                    component: () => import('@/pages/Hospitals/register/register_step2.vue'),
                    meta: {
                        title: '预约第二步'
                    }
                },
                {
                    path: '/hospital',
                    redirect: '/hospital/register'
                },

            ]
        },
        {
            path: '/wxlogin',
            component: () => import('@/pages/wxlogin/index.vue')
        },
        {
            path: '/user',
            component: () => import('@/pages/user/index.vue'),
            children: [
                {
                    path: 'certification',
                    component: () => import('@/pages/user/certifi/index.vue'),
                    meta: {
                        title: '实名认证'
                    }
                },
                {
                    path: 'order',
                    component: () => import('@/pages/user/order/index.vue'),
                    meta: {
                        title: '挂号订单'
                    }
                },
                {
                    path: 'patient',
                    component: () => import('@/pages/user/patient/index.vue'),
                    meta: {
                        title: '就诊人管理'
                    }
                },
                {
                    path: 'profile',
                    component: () => import('@/pages/user/profile/index.vue'),
                    meta: {
                        title: '账号信息'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                    meta: {
                        title: '信息反馈'
                    }
                },

                {
                    path: '/user',
                    redirect: '/user/certification'
                },

            ]
        },

        {
            path: '/',
            redirect: '/home'
        },

    ],
    //滚动行为
    scrollBehavior() {
        // ...
        return {
            left: 0,
            top: 0
        }
    }

})