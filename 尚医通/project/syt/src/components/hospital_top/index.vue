<template>
    <div class="top">
        <div class="content">
            <!--左侧 -->
            <div @click="goHome" class="left">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约同意挂号平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="Login" v-if="!useStore.userInfo.name">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ useStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="gouser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="gouser('/user/order')"> 挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="gouser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>

                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import UserStore from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue';
let useStore = UserStore()
let $router = useRouter()
const goHome = () => {
    $router.push({ path: '/home' })
};
const Login = () => {
    useStore.visiable = true
    console.log('点了')
}
const logout = () => {
    //通知仓库清除信息
    useStore.logouts();
    //编程式导航跳转首页
    $router.push({ path: '/home' })
}
const gouser = (path: string) => {
    $router.push({ path })
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 70px;
    // background-color:#fff;
    display: flex;
    position: fixed;
    z-index: 999;
    justify-content: center;

    .content {

        width: 1200px;
        height: 70px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #bbb;

            .help {
                margin-right: 10px;
            }
        }
    }
}
</style>