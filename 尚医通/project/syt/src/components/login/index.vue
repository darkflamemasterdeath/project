<template>
    <div class="login">

        <!-- v-model控制对话框显示与隐藏 -->
        <el-dialog @close="close" v-model="userStore.visiable" title="用户登录">
            <el-row>
                <!-- 左侧结构：收集号码登录，微信扫-扫登录 -->
                <el-col :span="12">
                    <div class="logint">
                        <div v-show="scene == 0">
                            <el-form ref="form" :model="loginParma" :rules="rules">
                                <el-form-item prop="phone">
                                    <el-input v-model="loginParma.phone" :prefix-icon="User"
                                        placeholder="请输入手机号码"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input v-model="loginParma.code" :prefix-icon="Lock"
                                        placeholder="请输入手机验证码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone ? true : false" @click="getCode">
                                        获取验证码
                                        <!-- <span v-if="!flag">获取验证码({{ time }}s)</span> -->
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button type="primary" @click="login" style="width:100%"
                                :disabled="!Phone || loginParma.code.length < 6">用户登录</el-button>

                            <div class="bottom" @click="changesence">

                                <p>微信扫码登录</p>
                                <svg t="1692324232619" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2891" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2892"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2893"></path>
                                </svg>

                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            <div id="login_container"></div>
                            <div class="phone" @click="handler">
                                <p>手机短信验证码登录</p>
                                <svg t="1692432809876" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2959" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="2960"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets//images//code_app.png" alt="">
                                <svg t="1692324232619" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2891" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#2c2c2c" p-id="2892"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#2c2c2c" p-id="2893"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>"快速预约挂号"</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <svg t="1692324751404" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4249" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4250"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>预约挂号app</p>
                            </div>

                        </div>
                        <p class="tip">尚医通官方指定平台</p>
                        <p class="tip">快速挂号 安全放心</p>
                    </div>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" @click="closeck">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//user仓库的数据(visiable)可以控制login对话框的显示影藏
import UserStore from '@/store/modules/user'
import { User, Lock, Phone, } from '@element-plus/icons-vue'
import { ElMessage, formContextKey } from 'element-plus';
// import { validateHeaderName } from 'http';
import type { WxloginResponseData } from '@/api/hospital/type'
import { ref, reactive, computed } from 'vue'
import { reqWxLogin } from '@/api/hospital/index'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute()
let $router = useRouter()
let scene = ref<number>(0)//0代表手机号登录，1代表微信扫码登陆
let flag = ref<boolean>(true)
// let time = ref<number>(5)
let loginParma = reactive({
    phone: '',
    code: ''
})
let userStore = UserStore()
const changesence = async () => {
    scene.value = 1
    let redirecturl = encodeURIComponent(window.location.origin + '/wxlogin')
    let result: WxloginResponseData = await reqWxLogin(redirecturl)
    console.log(result, '微信')
    //@ts-ignore
    new WxLogin({
        self_redirect: true,
        id: "login_container",
        appid: result.data.appid,//唯一标识
        scope: "snsapi_login",//当前微信扫码授权确定
        redirect_uri: result.data.redirectUri,
        state: result.data.state,
        style: "black",
    })

}
//计算出当前收集到的元素内容是否是手机号码格式
let isPhone = computed(() => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    //返回布尔值
    return reg.test(loginParma.phone)

})
//获取验证按钮的回调
const getCode = async () => {
    // alert(123)


    await userStore.findcode(loginParma.phone)
    loginParma.code = userStore.code

}
const login = async () => {
    try {
        await userStore.userlogin(loginParma)
        userStore.visiable = false
        let redirect = $route.query.redirect
        if (redirect) {
            $router.push(redirect as string)
        } else {
            $router.push('/home')
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}
const validatorPhone = (rule: any, value: any, callBack: any) => {
    console.log(rule, value, callBack)
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入正确的手机号码格式'))
    }
}
const rules = {
    phone: [{ trigger: 'change', validator: validatorPhone }
        //trigger
        // { required: true, message: '手机号格式不正确', trigger: 'change', min: 11 },
    ],
    // code: [{ required: true, message: '验证码必须为6位', tigger: 'blue', min: 6 }]
}
const close = () => {
    // console.log('挂你')
    // Object.assign(loginParma, { phone: '', code: '' })
    // // form.value.resetFields()
}
const closeck = () => {
    // userStore.visiable = false
    // Object.assign(loginParma, { phone: '', code: '' })
}
const handler = () => {
    scene.value = 0
}
</script>
<script lang="ts">
export default {
    name: 'Login'
}
</script>
<style lang="scss" scoped>
.login {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .logint {
        padding: 20px;
        border: 1px solid #ccc;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    margin: 10px 0;
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 150px;
                    height: 150px;
                }

                p {
                    margin: 5px 0;
                }
            }
        }

        .tip {
            text-align: center;
            margin: 10px 0;
            font-size: 20px;
            font-weight: 600;
        }
    }
}
</style>