<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span>{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button @click="handel" circle type="primary" :icon="Edit" width="200px"></el-button>

                <el-popconfirm @confirm="removeuser" title="你确定要删除吗?">
                    <template #reference>
                        <el-button v-if="showdelet" circle type="danger" :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>

            </div>
        </div>
        <div class="bottom">
            <p>证件类型:{{ user.param.certificatesTypeString }}</p>
            <p>证件号码:{{ user.certificatesNo }}</p>
            <p>用户性别:{{ user.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期:{{ user.birthdate }}</p>
            <p>手机号码:{{ user.phone }}</p>
            <p>婚姻状况:{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址:{{ user.param.cityString }}无</p>
            <p>详细住址:{{ user.address }}</p>
            <!-- 红色的已经选择的盒子 -->
            <transition name="confir">
                <div class="confirm" v-if="index === currentIndex">已选择</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import { reqdelete } from '@/api/user'
import { ElMessage } from 'element-plus';
let props = defineProps(['user', 'currentIndex', 'index', 'showdelet'])
// console.log(user,'展示')
let $route = useRoute()
let $router = useRouter()
let $emit = defineEmits(['change', 'remove'])
const handel = () => {
    if ($route.path == '/user/patient') {
        $emit('change', props.user)
    } else {
        $router.push({ path: '/user/patient', query: { type: 1, id: props.user.id, updata: 'edit' } })
    }

}
//删除
const removeuser = async () => {
    try {
        await reqdelete(props.user.id)
        //消息提示
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        $emit('remove')
    } catch (error) {

    }
}
</script>

<style lang="scss" scoped>
.visitor {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .top {
        width: 100%;
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .left {
            .free {
                background-color: white;
                padding: 5px;
                font-size: 12px;
                border-radius: 10px;
            }

            span {
                color: #7f7f7f;
                margin-left: 10px;
            }
        }
    }

    .bottom {
        position: relative;
        padding: 10px;

        .confirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 10px;
            border: 1px solid red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top: 20%;
            opacity: 0.4;
            transform: rotate(35deg);
            border-radius: 100px;
            font-weight: 900;
        }

        .confir-enter-from {
            transform: scale(1);
        }

        .confir-enter-active {
            transition: 0.3s;
        }

        .confir-enter-to {
            transform: scale(1.2);
        }

        p {
            line-height: 40px;
        }
    }
}
</style>