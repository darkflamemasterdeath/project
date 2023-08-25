<template>
    <div class="hospital">
        <!-- 左侧导航区 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/ 医院信息</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item @click="changeActive('/hospital/register')" index="/hospital/register">
                    <el-icon><icon-menu /></el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item @click="changeActive('/hospital/detail')" index="/hospital/detail">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item @click="changeActive('/hospital/notice')" index="/hospital/notice">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item @click="changeActive('/hospital/close')" index="/hospital/close">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item @click="changeActive('/hospital/search')" index="/hospital/search">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询和取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧路由展示区 -->
        <div class="content">
            <!-- 子组件展示 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
//左侧菜单需要用到的图标
import {
    Document,
    Menu as IconMenu,
    InfoFilled,
    Setting,
    Search,
    HomeFilled
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import useDetailstore from '@/store/modules/hospital'
//获取仓库对象
let detailStore = useDetailstore()
let $router = useRouter()
//获取当前路由信息
let $route = useRoute()
const changeActive = (path: string) => {
    $router.push({ path: path, query: { hoscode: $route.query.hoscode } })
}
//组件挂载完毕通知pinia仓库发请求获取医院数据，储存仓库中
onMounted(() => {
    detailStore.getHospital($route.query.hoscode as string),
        //获取咿医院科室信息
        detailStore.getDepatment($route.query.hoscode as string)
})
</script>

<style scoped>
.hospital {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            color: #7f7f7f;
        }
    }

    .content {
        flex: 8
    }
}
</style>