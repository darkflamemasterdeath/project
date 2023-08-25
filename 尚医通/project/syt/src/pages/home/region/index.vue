<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul>

                <li :class="{ active: RegionFlag == '' }" @click="changeactive('')">全部</li>
                <li :class="{ active: RegionFlag == t.value }" @click="changeactive(t.value)" v-for="(t) in  RegionArr "
                    :key="t.value">{{ t.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqhospitallevelanddiqu } from '@/api/home'
import type { HospitalLevelAndDiquResponseData, HospitallArr } from "@/api/home/type"
//地区组件挂载完毕获取数据

//存储地区的数据
let RegionArr = ref<HospitallArr>([])
//地区高亮的响应式数据
let RegionFlag = ref<string>('')
onMounted(() => {
    getRegionlist()
})
const getRegionlist = async () => {
    let result: HospitalLevelAndDiquResponseData = await reqhospitallevelanddiqu('Beijin')
    console.log(',,,,,,,', result)
    if (result.code == 200) {
        RegionArr.value = result.data
    }
}
const changeactive = (value: string) => {
    RegionFlag.value = value
    //给父组件传递参数
    $emit('getRegion', value)
}
let $emit = defineEmits(['getRegion'])
</script>

<script lang="ts">
export default {
    name: 'Region'
}
</script>
<style lang="scss" scoped>
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            margin-right: 10px;
            width: 48px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 5px;
                margin-bottom: 10px;

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