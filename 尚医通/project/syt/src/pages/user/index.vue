<template>
    <div class="user">
        <!-- 左侧显示导航区 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span> / 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="gouser('/user/certification')">
                    <el-icon><icon-menu /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="gouser('/user/order')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="gouser('/user/patient')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="gouser('/user/profile')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="gouser('/user/feedback')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧二级路由 -->
        <div class="content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Setting,
    HomeFilled
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
let $router = useRouter()
let $route = useRoute()

const gouser = (path: string) => {
    $router.push({ path: path })

}
</script>

<style lang="scss" scoped>
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content {
        flex: 8
    }
}
</style>