<template>
    <div>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <h1>实名信息</h1>
                </div>
            </template>
            <!-- 实名认证结构提示 -->
            <div class="tip" style="color:#7f7f7f">

                <p> <el-icon>
                        <InfoFilled />
                    </el-icon>完成实名认证后才能添加就诊人,正常进行挂号，为了不影响后续步骤，建议提前实名认证</p>
            </div>
            <!-- 切换 -->
            <div v-if="userinfo.authStatus == 1" class="miaoshu">
                <el-descriptions class="margin-top" :column="1" border size="small">

                    <el-descriptions-item :width="20" label-align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <user />
                                </el-icon>
                                用户姓名
                            </div>
                        </template>
                        {{ userinfo.name }}
                    </el-descriptions-item>
                    <el-descriptions-item :width="20" label-align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <iphone />
                                </el-icon>
                                证件类型
                            </div>
                        </template>
                        {{ userinfo.certificatesType == '10' ? '身份证' : '户口本' }}
                    </el-descriptions-item>
                    <el-descriptions-item :width="20" label-align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <location />
                                </el-icon>
                                证件号码
                            </div>
                        </template>
                        {{ userinfo.certificatesNo }}
                    </el-descriptions-item>

                </el-descriptions>
            </div>
            <!-- 未验证的结构 -->
            <el-form :model="params" :rules="rules" v-else style="width: 50%;margin: 20px auto;" label-width="80px">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名" v-model="params.name"> </el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select placeholder="请选择证件的类型" v-model="params.certificatesType">
                        <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType"
                            :key="index"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"> </el-input>
                </el-form-item>
                <el-form-item label="上传证件" prop="certificatesUrl">
                    <!-- limit照片墙约束的个数 -->
                    <!-- on-exceed:超出约束数量的狗子 -->
                    <el-upload ref="upload" list-type="picture-card" :on-exceed="exceedhandle" :limit="1"
                        action="/api/oss/file/fileUpload?fileHost=userAuah" :on-success="successhand">
                        <img style="width: 100%;height: 100%;" src="../../../assets//images/auth_example.png" alt="">
                    </el-upload>

                    <el-dialog>
                        <img w-full alt="Preview Image" />
                    </el-dialog>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset">重写</el-button>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { InfoFilled, Plus } from '@element-plus/icons-vue';
import { requserInfo, reqidcardinfo, reqUserCertation } from '@/api/user/index'
import { reactive, ref, onMounted } from 'vue';
import { Userinfo } from '@/api/user/type'
import { ElMessage } from 'element-plus';
let userinfo = ref<any>({})
let arrType = ref<any>([])
let params = reactive<Userinfo>({
    'certificatesNo': '',
    'certificatesType': '',
    'certificatesUrl': '',
    'name': ''
})
let upload = ref()
onMounted(() => {
    //获取用户信息的方法
    getuserinfo()
    getcardinfo()
})
const getuserinfo = async () => {
    let result: any = await requserInfo()
    console.log(result, '132')
    if (result.code == 200) {
        userinfo.value = result.data
    }
}
const getcardinfo = async () => {
    let result: any = await reqidcardinfo()
    if (result.code == 200) {
        arrType.value = result.data
    }
}
const exceedhandle = () => {
    ElMessage({
        type: 'error',
        message: '图片只能上传一张'
    })
}
//图片上传成功的狗子
const successhand = (response: any) => {
    console.log(response)
    params.certificatesUrl = response.data
}
const reset = () => {
    //清除图片
    console.log(upload)
    upload.value.clearFiles()
    Object.assign(params, {
        'certificatesNo': '',
        'certificatesType': '',
        'certificatesUrl': '',
        'name': ''
    })
}
const submit = async () => {
    try {
        await reqUserCertation(params)
        ElMessage({
            type: 'success',
            message: '认证成功'
        })
        getuserinfo()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '认证失败'
        })
    }

}
//自定义校验规则的方法
const validatorname = () => {
    //rule为当前校验字段的校验规则对象
    //value要校验的内容
    //callback校验成功放行

}
const rules = {
    name: [
        { required: true, validator: validatorname }
    ]
}
</script>

<style lang="scss" scoped>
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
    }

    .miaoshu {
        margin: 20px 0;
    }
}
</style>


