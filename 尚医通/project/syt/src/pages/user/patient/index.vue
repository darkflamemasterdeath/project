<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button class="button" type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <div class="visitor" v-if="sence == 0">
            <Visiter @remove="removepeople" @change="changesence" class="visi" v-for="(item, index) in usearr" :key="index"
                :user="item" :index="index" :showdelet="true"></Visiter>
        </div>
        <!-- 添加就诊人或者修改 -->
        <div class="form" v-if="sence == 1">
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form style="width: 60%;margin: 10px auto;">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请你输入用户姓名" v-model="userParams.name"> </el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择你的类型" style="width: 100%;" v-model="userParams.certificatesType">
                        <!-- @vue-skip -->
                        <el-option :label="item.name" :value="item.value" v-for="(item) in cards"
                            :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请你输入证件号码" v-model="userParams.certificatesNo"> </el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="userParams.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="请你选择日期" v-model="userParams.birthdate"
                        value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="输入手机号" v-model="userParams.phone"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息</el-divider>
            <el-form style="width: 60%;margin: 10px auto;">
                <el-form-item label="婚姻状况">
                    <el-radio-group v-model="userParams.isMarry">
                        <el-radio :label="1">已婚</el-radio>
                        <el-radio :label="0">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保">
                    <el-radio-group v-model="userParams.isInsure">
                        <el-radio :label="1">自费</el-radio>
                        <el-radio :label="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前的住址">
                    <el-cascader :props="props" v-model="userParams.addressSelected" />
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input placeholder="输入地址" v-model="userParams.address"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">紧急联系人信息</el-divider>
            <el-form style="width: 60%;margin: 10px auto;" label-width="80px">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请你输入用户姓名" v-model="userParams.contactsName"> </el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择你的类型" style="width: 100%;" v-model="userParams.contactsCertificatesType">
                        <!-- @vue-skip -->
                        <el-option :label="item.name" :value="item.value" v-for="(item) in cards"
                            :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo"> </el-input>
                </el-form-item>

                <el-form-item label="手机号码">
                    <el-input placeholder="输入手机号" v-model="userParams.contactsPhone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset">重写</el-button>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { reqGetUser } from '@/api/hospital'
import { reqidcardinfo, reqcity, reqnewpeople } from '@/api/user'
import { ref, onMounted, reactive, watch } from 'vue';
import { ElMessage, type CascaderProps } from 'element-plus'
import { useRoute } from 'vue-router';
onMounted(() => {
    getuserdata()
    //获取证件类型
    getcardtype()
    ischang()
})
let $route = useRoute()
let cards = ref([])
let sence = ref<number>(0)
let usearr = ref([])
//新增数据
let userParams = reactive<any>({
    "name": "",
    "certificatesType": "",
    "certificatesNo": "",
    "sex": 0,
    "birthdate": "",
    "phone": "",
    "isMarry": 0,
    "isInsure": 0,
    "addressSelected": [],
    "address": "",
    "contactsName": "",
    "contactsPhone": "",
    "contactsCertificatesType": "",
    "contactsCertificatesNo": "",
})
const ischang = () => {
    if ($route.query.type) {
        sence.value = 1
    }
}
const getuserdata = async () => {
    let result: any = await reqGetUser()
    console.log('dsadsa', result)
    if (result.code == 200) {
        usearr.value = result.data
    }
}
const addUser = () => {
    //切换场景
    reset()
    sence.value = 1
}
const reset = () => {
    Object.assign(userParams, {
        "id": null,
        "name": "",
        "certificatesType": "",
        "certificatesNo": "",
        "sex": 0,
        "birthdate": "",
        "phone": "",
        "isMarry": 0,
        "isInsure": 0,
        "addressSelected": [],
        "address": "",
        "contactsName": "",
        "contactsPhone": "",
        "contactsCertificatesType": "",
        "contactsCertificatesNo": "",
    })
}
//就诊人子组件
const changesence = (user: any) => {
    console.log(user, 'dsadsadsdsad')
    sence.value = 1
    //收集信息
    Object.assign(userParams, user)
}
const getcardtype = async () => {
    let result = await reqidcardinfo()
    if (result.code == 200) {
        cards.value = result.data
    }
}
const props: CascaderProps = {
    lazy: true,//懒加载

    //加载级联选择器数据方法
    async lazyLoad(node: any, resolve) {
        let result = await reqcity(node.data.id || '86')
        let showData = result.data.map((item: any) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren
            }
        })
        console.log(showData)
        //注入组件要展示的数据
        resolve(showData)
    },
}
const submit = async () => {
    //要么新增要么跟新
    try {
        await reqnewpeople(userParams)
        ElMessage({
            type: 'success',
            message: userParams.id ? "更新成功" : '新增成功'
        })
        sence.value = 0
        getuserdata()
    } catch (error) {

    }

}
watch(() => usearr.value, () => {
    if ($route.query.updata == 'edit') {
        let user = usearr.value.find((item: any) => {
            return item.id == $route.query.id
        })
        Object.assign(userParams, user)
    }
})
const removepeople = () => {
    getuserdata()
}
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.visitor {
    display: flex;
    flex-wrap: wrap;

    .visi {
        width: 32%;
        margin: 5px;
    }
}
</style>