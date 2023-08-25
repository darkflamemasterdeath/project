<template>
    <div class="buttom">
        <div class="content">
            <div class="left">
                京ICP备 13018359号 电话挂号010-56253825
            </div>
            <div class="right">
                <span>联系我们</span>
                <span>合作伙伴</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.buttom {

    width: 100%;
    height: 50px;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .right {
            span {
                margin: 0 10px;
                font-size: 14px;
            }
        }
    }
}
</style>