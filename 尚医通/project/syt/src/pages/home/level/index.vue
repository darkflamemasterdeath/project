<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级:</div>
            <ul class="hosptial">
                <li :class="{ active: activeFlag == '' }" @click="changelevel('')">全部</li>
                <li @click="changelevel(level.value)" :class="{ active: activeFlag == level.value }"
                    v-for="level in levelArr" :key="level.value">{{ level.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqhospitallevelanddiqu } from '@/api/home'
import type { HospitalLevelAndDiquResponseData, HospitallArr } from "@/api/home/type"
//定义一个数组存储医院等级数据
let levelArr = ref<HospitallArr>([])
//控制医院等级高亮响应式数据
let activeFlag = ref<string>('')
//组件挂载完毕
onMounted(() => {
    getlist()
})
const getlist = async () => {
    let result: HospitalLevelAndDiquResponseData = await reqhospitallevelanddiqu('HosType')
    console.log(result)
    if (result.code == 200) {
        levelArr.value = result.data
    }
}
const changelevel = (level: string) => {
    // console.log(level)
    activeFlag.value = level
    //触发自定义事件
    $emit('getlevel', level)

}
let $emit = defineEmits(['getlevel'])
</script>
<script lang="ts">
export default {
    name: 'Level'
}
</script>
<style lang="scss" scoped>
.level {
    color: #7f7f7f;

    h1 {

        font-weight: 900;
        margin: 10px 0;
    }

    .content {
        display: flex;

        .left {
            margin-right: 10px;
        }

        .hosptial {
            display: flex;

            li {
                margin-right: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;

            }
        }
    }
}
</style>