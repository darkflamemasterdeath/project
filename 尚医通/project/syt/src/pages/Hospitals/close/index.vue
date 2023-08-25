<template>
    <div>
        <div class="info">
            <h1>{{ hospitalstore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
            <el-empty description="暂无信息"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDetailstore from '@/store/modules/hospital'
//获取仓库
let hospitalstore = useDetailstore()
</script>

<style lang="scss" scoped>
.info {
    h1 {
        text-align: center;
        font-weight: 900;
        font-size: 30px;
    }
}
</style>