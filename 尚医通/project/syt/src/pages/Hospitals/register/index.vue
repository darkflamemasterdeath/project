<template>
    <div class="register">
        <div class="top">
            <div class="title">{{ hospitaldetail.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1692258473289" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2871" width="16" height="16">
                    <path
                        d="M418.30003 1006.914006V890.970043S278.069075 785.644077 253.293083 652.85812 127.220124 456.730183 187.267105 385.211206s143.036954 71.519977 159.635948 181.604941l49.549984 24.408992-13.912995-404.093869s-8.176997-93.48697 63.219979-90.801971a57.239982 57.239982 0 0 1 57.849982 61.02298S481.15301 16.510325 569.636981 16.510325c74.202976 0 55.041982 134.859957 55.041983 134.859956s6.468998-71.884977 71.519977-61.02298c70.785977 12.204996 55.041982 143.037954 55.041982 143.037954a41.495987 41.495987 0 0 1 47.231985-35.270989c48.817984 5.491998 58.825981 41.251987 57.726981 94.95197 0 33.439989-29.89999 244.091921-29.89999 244.091921s43.202986 280.58291-91.656971 376.266879l5.491998 82.502973z"
                        fill="#d81e06" p-id="2872"></path>
                    <path
                        d="M401.823036 1024V899.39104c-28.924991-23.309992-141.939954-121.191961-164.761947-243.481921a434.84986 434.84986 0 0 0-50.648984-128.147959c-29.53499-54.797982-54.919982-102.273967-12.203996-153.167951a62.36498 62.36498 0 0 1 48.817984-25.140992c64.805979 0 123.02196 117.407962 138.887955 206.379934l17.086995 8.542997-12.936996-376.633879c0-1.464-4.515999-54.919982 24.409992-86.163972a69.443978 69.443978 0 0 1 52.599983-21.846993h3.783999A81.769974 81.769974 0 0 1 486.890008 90.960301 120.336961 120.336961 0 0 1 513.739999 23.100323 73.837976 73.837976 0 0 1 569.636981 0.03433a61.63298 61.63298 0 0 1 47.841985 20.991993 119.116962 119.116962 0 0 1 24.408992 64.806979 71.640977 71.640977 0 0 1 57.116982-11.349996c53.089983 9.396997 67.002978 67.368978 69.687977 111.182964a60.289981 60.289981 0 0 1 31.12199-3.904999c74.569976 8.420997 73.227976 80.671974 72.495977 111.549964s-26.361992 219.682929-29.779991 244.091922c4.271999 29.53499 36.613988 282.535909-90.80197 383.955876l6.101998 90.557971zM222.904093 382.526207a30.87799 30.87799 0 0 0-22.455993 13.302995c-27.338991 32.46499-14.279995 61.02298 15.620995 116.431963a463.774851 463.774851 0 0 1 53.456983 137.545956c23.309992 125.09696 157.316949 227.371927 158.659949 228.347926l6.467998 5.003998v106.667966l287.783907-9.763997-5.003998-74.813976 7.566997-5.247998c124.97496-89.336971 84.821973-357.471885 84.333973-360.156884v-4.759998c10.007997-73.227976 29.289991-216.63193 29.778991-242.382922 1.22-61.02298-14.156995-74.936976-43.081987-78.231975a25.263992 25.263992 0 0 0-28.55899 21.723993l-32.70799-4.270999c0-1.22 12.203996-115.455963-41.373986-124.85296-40.274987-7.078998-49.916984 29.168991-52.112984 44.179986h-16.598994l-16.475995-1.463999v-3.416999c3.416999-27.826991 3.782999-81.526974-15.743995-103.494967a28.802991 28.802991 0 0 0-23.188992-10.007997 41.251987 41.251987 0 0 0-31.97599 12.203996c-21.967993 23.554992-20.746993 73.227976-19.282994 93.97597a71.884977 71.884977 0 0 1 1.709 17.817994l-7.200998 161.710948-25.262992-158.659949s-0.977-6.711998-1.830999-17.207994c-4.149999-18.184994-17.452994-28.558991-40.274987-29.412991a37.833988 37.833988 0 0 0-30.389991 11.105997c-15.499995 16.842995-16.475995 50.282984-15.499995 61.75598l14.767996 433.01886-82.014974-41.007986-1.22-8.420998c-13.913996-91.289971-69.322978-187.21894-107.888965-187.218939z"
                        fill="#d81e06" p-id="2873"></path>
                    <path
                        d="M520.085997 156.13128l-2.684999 314.389898-30.26799-312.924899 32.952989-1.464999z m121.069961-14.034996l-23.310992 328.425894-9.641997-329.157894 32.951989 0.732z m126.56096 92.99897l-33.68499 235.426924 0.733-237.867923 32.95199 2.439999zM385.835041 568.280147a468.655849 468.655849 0 0 1 68.467978 58.704981 348.684888 348.684888 0 0 1 53.333982 70.419977 343.070889 343.070889 0 0 0-64.073979-57.971981 445.223857 445.223857 0 0 0-73.227976-42.227986z m103.982966-48.329985a236.769924 236.769924 0 0 1 81.892974-13.424995 280.70591 280.70591 0 0 1 83.235973 12.204996 211.871932 211.871932 0 0 1 74.691976 41.250987 148.407952 148.407952 0 0 1 46.376985 69.932977 317.319898 317.319898 0 0 0-61.02298-48.818984 333.551893 333.551893 0 0 0-69.565978-30.51099 935.969698 935.969698 0 0 0-155.60895-30.633991z"
                        fill="#d81e06" p-id="2874"></path>
                </svg>
                <span>{{ hospitaldetail.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 展示内容区域 -->
        <div class="content">
            <div class="left">
                <img :src="`data:image/jepg;base64,` + hospitaldetail.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">预约周期：10天 放号时间：{{ hospitaldetail.hospitalInfo.bookingRule?.releaseTime }} 停挂时间：{{
                    hospitaldetail.hospitalInfo.bookingRule?.stopTime }}</div>
                <div class="address">
                    具体位置：{{ hospitaldetail.hospitalInfo.hospital?.param.fullAddress }}
                </div>
                <div class="route">
                    具体路线：{{ hospitaldetail.hospitalInfo.hospital?.route }}
                </div>
                <div class="releseTime">
                    退号时间：就诊前一工作日{{ hospitaldetail.hospitalInfo.bookingRule?.quitTime }}前取消
                </div>
                <div class="ruler">预约挂号规则</div>
                <div class="rulerinfo" v-for="(item, index) in hospitaldetail.hospitalInfo.bookingRule?.rule" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
        <!-- 放置每一个医院的科室的数据 -->
        <div class="deparment">
            <div class="leftNav">
                <ul>
                    <li @click="changeactive(index)" :class="{ active: index === curremIndex }"
                        v-for="(item, index) in hospitaldetail.deparmentArr" :key="index">{{ item.depname }}</li>
                </ul>
            </div>
            <div class="deparmentInfo">
                <!-- 用一个div代表大科室与小科室 -->
                <div class="showDeparment" v-for="(item, index) in hospitaldetail.deparmentArr" :key="index">

                    <!-- 每一个大科室下的小科室 -->

                    <div class="father" ref="ccc">
                        <h1>{{ item.depname }}</h1>
                        <ul class="cur">
                            <li @click="showlogin(items)" v-for="(items) in item.children" :key="items.depcode">{{
                                items.depname
                            }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDetailstore from '@/store/modules/hospital'
import UserStore from '@/store/modules/user';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

let $route = useRoute()
let $router = useRouter()
let hospitaldetail = useDetailstore()
let userStore = UserStore()
const ccc = ref()
//控制科室高亮的响应式数据
let curremIndex = ref<number>(0)
const changeactive = (value: number) => {
    curremIndex.value = value
    let allcur = document.querySelectorAll('.father')
    console.log(allcur, 'zhefdsfd')
    console.log(ccc.value, 'cccccccccc')
    allcur[curremIndex.value].scrollIntoView({
        behavior: 'smooth',
        // block: 'center'
        //startcenterendnearest
    })
}
const showlogin = (item: any) => {
    // userStore.visiable = true
    $router.push({ path: '/hospital/register_step', query: { hoscode: $route.query.hoscode, depcode: item.depcode } })

}
</script>

<style lang="scss" scoped>
.register {
    .top {
        display: flex;

        .title {
            font-size: 30px;
            font-weight: 800;
        }

        .level {
            color: #7f7f7f;
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;

            span {
                margin-left: 10px;
            }
        }
    }

    .content {
        margin-top: 20px;
        display: flex;

        .left {
            width: 80px;
            margin-right: 10px;

            img {
                width: 100%;
                height: 80px;
                border-radius: 50%;
            }
        }

        .right {
            flex: 1;

            .time,
            .address,
            .route,
            .releseTime,
            .rulerinfo {
                margin-top: 10px;
                color: #7f7f7f;
            }

            .ruler {
                margin: 10px 0;
            }
        }
    }

    .deparment {
        width: 100%;
        height: 500px;
        display: flex;
        margin-top: 20px;

        .leftNav {
            width: 80px;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                background: rgb(248, 248, 248);

                li {
                    flex: 1;
                    text-align: center;
                    font-size: 14px;
                    color: #7f7f7f;
                    line-height: 30px;

                    &.active {
                        border-left: 2px solid red;
                        color: red;
                        background: white;
                        font-weight: 600;
                        font-size: 14px;
                    }
                }
            }
        }

        .deparmentInfo {
            flex: 1;
            margin-left: 10px;

            height: 100%;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            .showDeparment {


                h1 {
                    background-color: rgb(248, 248, 248);
                    color: #7f7f7f;
                    margin-bottom: 10px;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 33%;
                        color: #7f7f7f;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>