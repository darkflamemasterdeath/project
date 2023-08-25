<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <!-- 卡片：展示就诊人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" :icon="User" @click="gouser">添加就诊人</el-button>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                </div>
            </template>
            <!-- 身体部分展示就诊人信息 -->
            <div class="user">

                <Visiter :showdelet="false" :currentIndex="currentIndex" :index="index" @click="changIndex(index)"
                    v-for="(item, index) in usersarr" :key="item.id" class="item" :user="item"></Visiter>
            </div>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>
                    </div>
                </template>
                <!-- 卡片的身体 -->
                <el-descriptions class="margin-top" :column="2" border>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期:
                            </div>
                        </template>
                        {{ docinfo.workDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院:
                            </div>
                        </template>
                        {{ docinfo.param?.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室:
                            </div>
                        </template>
                        {{ docinfo.param?.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生姓名:
                            </div>
                        </template>
                        {{ docinfo.docname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职称:
                            </div>
                        </template>
                        {{ docinfo.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生专长:
                            </div>
                        </template>
                        {{ docinfo.skill }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生的服务费:
                            </div>
                        </template>
                        <span style="color:red">{{ docinfo.amount }}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-card>
        <div class="btn">
            <el-button type="primary" :disabled="currentIndex == -1 ? true : false" @click="sumitorder"> 确定挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';

import { reqGetUser, reqdoctor } from '@/api/hospital/index'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { DoctorInfodata, Doctor } from '@/api/hospital/type'
import { reqsubmitorder } from '@/api/user'
import { SubmitOrder } from '@/api/user/type'
let $route = useRoute()
let $router = useRouter()
onMounted(() => {
    fetchUserData()
    doctorinfo()
})
let usersarr = ref<any>([])
//存储医生信息
let docinfo = ref<any>({})
let currentIndex = ref<number>(-1)
const fetchUserData = async () => {
    let result = await reqGetUser()
    console.log(result, '就职业技能')
    if (result.code == 200) {
        usersarr.value = result.data
    }
}
const doctorinfo = async () => {
    let result: DoctorInfodata = await reqdoctor($route.query.docId as string)
    console.log(result, '医生信息')
    if (result.code == 200) {
        docinfo.value = result.data
    }
}
const changIndex = (index: number) => {
    console.log(index, 'index')
    currentIndex.value = index
}
//确定挂号按钮的糊掉
const sumitorder = async () => {
    let hoscode = docinfo.value.hoscode
    let scheduleId = docinfo.value.id
    let patientId = usersarr.value[currentIndex.value].id
    console.log('触发', hoscode, scheduleId, patientId)
    let result: any = await reqsubmitorder(hoscode, scheduleId, patientId)
    console.log(result, '得到')
    if (result.code == 200) {
        $router.push({ path: '/user/order', query: { orderId: result.data } })
        console.log('贵u俩', result.data)
    }
}
//预约挂号添加就诊人
const gouser = () => {
    $router.push({ path: '/user/patient', query: { type: 1 } })
}
</script>

<style lang="scss" scoped>
.container {
    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;

                margin: 5px;
            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
}
</style>