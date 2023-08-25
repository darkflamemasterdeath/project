<template>
    <div class="search">

        <el-autocomplete @select="goDetail" :trigger-on-focus="false" :fetch-suggestions="fetchData" v-model="hosname"
            clearable placeholder="请输入医院名称" class="form" />
        <el-button type="primary" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { reqhospitalInfo } from '@/api/home/index'
import { useRouter } from 'vue-router'
import { HospitalInfo, Content } from '@/api/home/type'
//创建路由器对象
let $router = useRouter()
//收集关键字
let hosname = ref('')
const fetchData = async (keyword: string, cb: any) => {
    // console.log(keyword,cb)
    //用户输入完后会触发此函数
    let result: HospitalInfo = await reqhospitalInfo(keyword)
    // console.log('搜做', result)
    //整理数据,
    let showData = result.data.map(item => {
        return {
            value: item.hosname,
            hoscode: item.hoscode//存储医院的标识符{编码}
        }
    })
    //给组件提供展示的数据
    cb(showData)
}
//点击某一个推荐项
const goDetail = (item: any) => {
    console.log('出发了', item)
    //点击推荐项代餐跳转
    $router.push({ path: '/hospital', query: { hoscode: item.hoscode } })
}
</script>
<script lang="ts">
export default {
    name: 'Search'
}
</script>
<style lang="scss" scoped>
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;

    ::v-deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 10px;
    }
}
</style>