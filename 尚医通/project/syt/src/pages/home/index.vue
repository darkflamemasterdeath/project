<template>
    <div class="home">
        <!-- 我是首页轮播图 -->
        <Carousel></Carousel>
        <!-- 搜索 -->
        <Search></Search>
        <el-row :gutter="20">
            <el-col :span="20">
                <!-- 等级组件 -->
                <Level @getlevel="getlevels"></Level>

                <!-- 地区 -->
                <Region @getRegion="getregion"></Region>
                <!-- 医院的展示 -->
                <div class="hospital" v-if="HospitalList.length > 0">
                    <Card class="item" v-for="(item, index) in HospitalList" :key="index" :hosptialInfo="item"></Card>
                </div>
                <el-empty v-else description="此地区无医院信息"></el-empty>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" @current-change="currentchange" v-model:page-size="pageSize"
                    @size-change="sizechange" :page-sizes="[4, 8, 12]" :background="true"
                    layout=" prev, pager, next, jumper,->,total, sizes" :total="400" />
            </el-col>
            <el-col :span="4">
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
//引入组合式api函数
import { onMounted, ref } from 'vue'
import { reqhospital } from '@/api/home/index'
import Carousel from './carousel/index.vue'
//引入搜索组件
import Search from './search/index.vue'
//引入首页等级的组件
import Level from './level/index.vue'
//引入地区组件
import Region from './region/index.vue'
import Card from './card/index.vue'
import type { Content, HospitalResponseData } from '@/api/home/type'
import Tip from './tip/index.vue'
let pageNo = ref<number>(1)
//一页展示多少数据
let pageSize = ref<number>(10)
//存储医院已有的数据
let HospitalList = ref<Content>([])
let total = ref<number>(0)
//储存医院的地区
let hostype = ref<string>('')
let districtCode = ref<string>('')
//组件挂载完毕发请求
onMounted(() => {
    getHosputalInfo()
});
//获取已有的医院数据
const getHosputalInfo = async () => {
    let result: HospitalResponseData = await reqhospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
    console.log(result)
    if (result.code == 200) {
        HospitalList.value = result.data.content
        total.value = result.data.totalElements
    }
};
const currentchange = () => {
    console.log(111)
    getHosputalInfo()
};
const sizechange = () => {
    // console.log('1223')
    getHosputalInfo()
}
//子组件的自定义组件
const getlevels = (level: string) => {
    console.log('1111', level)
    hostype.value = level
    getHosputalInfo()
}
const getregion = (region: string) => {
    console.log('地区', region)
    districtCode.value = region
    getHosputalInfo()
}
</script>

<style scoped lang="scss">
.home {

    .hospital {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
            width: 48%;
            margin: 10px 0;
        }
    }
}
</style>