<template>
    <div>
        <el-card class="box-card">
            <template #header>

                <div class="detail"> 挂号情</div>

            </template>
            <!-- 展示身体部分的顶部结构 -->
            <div class="top">
                <el-tag class="ml-2" type="success">
                    <div class="tag">
                        <span><svg t="1692605390526" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6918" id="mx_n_1692605390527" width="16"
                                height="16">
                                <path
                                    d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696c-12.608-12.416-32.864-12.288-45.28 0.32-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224s0.128 0.224 0.224 0.32c2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224L889.28 343.424c12.16-12.832 11.488-33.088-1.376-45.216z"
                                    fill="#2c2c2c" p-id="6919"></path>
                            </svg></span>
                        <span>{{ orderINfo.param?.orderStatusString }}</span>
                    </div>
                </el-tag>
                <div class="right_info">
                    <img src="../../../../assets/images/code_login_wechat.png" alt="">
                    <div>
                        <p>微信 关注 "北京114预约挂号"</p>
                        <p> "快速预约挂号"</p>
                    </div>
                </div>
            </div>
            <!-- 底部结构 -->
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <user />
                                    </el-icon>
                                    就诊人信息
                                </div>
                            </template>
                            {{ orderINfo.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <iphone />
                                    </el-icon>
                                    就诊日期
                                </div>
                            </template>
                            {{ orderINfo.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <location />
                                    </el-icon>
                                    就诊医院
                                </div>
                            </template>
                            {{ orderINfo.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <tickets />
                                    </el-icon>
                                    就诊科室
                                </div>
                            </template>
                            <el-tag size="small">{{ orderINfo.depname }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <office-building />
                                    </el-icon>
                                    医生职称
                                </div>
                            </template>
                            {{ orderINfo.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <office-building />
                                    </el-icon>
                                    医生服务费
                                </div>
                            </template>
                            {{ orderINfo.number }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <office-building />
                                    </el-icon>
                                    挂号订单
                                </div>
                            </template>
                            {{ orderINfo.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon>
                                        <office-building />
                                    </el-icon>
                                    挂号时间
                                </div>
                            </template>
                            {{ orderINfo.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="btn" v-if="orderINfo.orderStatus == 0 || orderINfo.orderStatus == 1">
                        <el-popconfirm title="确认取消吗？" @confirm="cancel">
                            <template #reference>
                                <el-button>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" v-if="orderINfo.orderStatus == 0" @click="openDialog">支付</el-button>
                    </div>
                </div>
                <div class="right">

                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>

                            </div>
                        </template>
                        <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                        <p style="color: red"> 2.【取号】就诊当天需在{{ orderINfo.fetchTime }}前 在医院取号，未取号视为爽约，该号不退不换； </p>
                        <p> 3.【退号】在{{ orderINfo.quitTime }}前可在线退号 ，逾期将不可办理退号退费； </p>
                        <p> 4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号； </p>
                        <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <!-- 展示二维码结构 -->
        <!-- 对话框通过v-model控制显示隐藏 true:展示 false隐藏 -->
        <el-dialog v-model="dialogTableVisible" width="400px" title="微信支付">
            <div class="qrcode">
                <img :src="imgUrl" alt="">
                <p>微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <el-button type="primary" @click="closedliag">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqorderinfo, reqcancelorder, reqQcode, reqpayresult } from '@/api/user'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { QrCode, PayResult } from '@/api/user/type'
//@ts-ignore
import QRCode from 'qrcode'
let $route = useRoute()
//存储二维码的图片路径
let imgUrl = ref<string>('')
console.log($route, '风格的服饰的')
let orderINfo = ref<any>({})
// 对话框显示隐藏
let dialogTableVisible = ref<boolean>(false)
let timer = ref<any>()
onMounted(() => {
    console.log('66666666666')
    getorder()
})
const getorder = async () => {
    let result: any = await reqorderinfo($route.query.orderId as string)
    console.log(result, '范德萨')
    if (result.code == 200) {
        orderINfo.value = result.data
    }
}
const cancel = async () => {

    try {
        let result = await reqcancelorder($route.query.orderId as string)
        console.log('接撒', result)
        getorder()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消失败'
        })
    }
}
const openDialog = async () => {
    let result: QrCode = await reqQcode($route.query.orderId as string)
    console.log('二维码', result)
    let imgurl = await QRCode.toDataURL(result.data.codeUrl)
    // reqpayresult
    imgUrl.value = imgurl
    timer.value = setInterval(async () => {
        let result: PayResult = await reqpayresult($route.query.orderId as string)
        console.log('fanhui ', result)
        if (result.data) {

            dialogTableVisible.value = false
            ElMessage({
                type: 'success',
                message: '支付成功'
            })
            clearInterval(timer.value)
            getorder()
        }
    }, 2000)
    dialogTableVisible.value = true
}
const closedliag = () => {
    clearInterval(timer.value)
    dialogTableVisible.value = false
}
</script>

<style lang="scss" scoped>
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;

    }

    .top {
        display: flex;
        justify-content: space-between;

        border-bottom: 1px solid #ccc;
        padding: 10px;

        .tag {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            p {
                font-size: 14px;
                line-height: 20px;
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 4;

            .btn {
                margin: 10px 0;
            }
        }

        .right {
            margin-left: 10px;
            flex: 6;

            p {
                line-height: 30px;
            }
        }
    }
}

.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        line-height: 30px;
    }
}
</style>