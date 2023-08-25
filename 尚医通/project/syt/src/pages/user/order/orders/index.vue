<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
            </div>
        </template>
        <!-- 用户选择的下拉菜单 -->
        <el-form :inline="true">
            <el-form-item label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeuser">
                    <el-option :value="items.id" :label="items.name" v-for="(items, index) in allUser"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="就诊人">
                <el-select placeholder="请选择订单状态" v-model="ordersStatus" @change="changeorder">
                    <el-option :label="item.comment" v-for="(item, index) in allorder " :key="index"
                        :value="item.status"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table border style="margin:10px 0" :data="userArr">
            <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
            <el-table-column label="医院" prop="hosname"></el-table-column>
            <el-table-column label="科室" prop="depname"></el-table-column>
            <el-table-column label="医生" prop="title"> </el-table-column>
            <el-table-column label="服务费" prop="amount"></el-table-column>
            <el-table-column label="就诊人" prop="patientName"></el-table-column>
            <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
            <el-table-column label="操做">
                <template v-slot="{ row }">

                    <el-button type="text" @click="goDetail(row)">详情</el-button>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize4" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @current-change="handleCurrentChange"
            @size-change="getorders" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { requseorder, reqAllUser, reqAllorder } from '@/api/user/index'
import { useRouter } from 'vue-router';
let patientId = ref<string>('')
let ordersStatus = ref<string>('')
let pageNo = ref<number>(1)
let pageSize4 = ref<number>(10)
let userArr = ref<any>([])
let total = ref<number>(0)
let $router = useRouter()
//存储全部就诊人的信息
let allUser = ref<any>([])
let allorder = ref<any>([])
onMounted(() => {
    getorders()
    getdata()
})

const getorders = async (limit: number = 5) => {
    pageSize4.value = limit
    let result: any = await requseorder(pageNo.value, pageSize4.value, patientId.value, ordersStatus.value)

    console.log('dsadsad', result)
    if (result.code == 200) {
        userArr.value = result.data.records
        total.value = result.data.total
    }
}
const goDetail = (row: any,) => {
    $router.push({ path: '/user/order', query: { orderId: row.id } })
}
const handleCurrentChange = (page: number) => {
    pageNo.value = page
    getorders()
}
const getdata = async () => {
    const result = await reqAllUser()
    const result1 = await reqAllorder()
    console.log(result, '非宁静而的水', result1)
    allUser.value = result.data
    allorder.value = result1.data
}
const changeuser = () => {
    getorders()
}
//订单状态
const changeorder = () => {
    getorders()
}
</script>

<style lang="scss" scoped></style>