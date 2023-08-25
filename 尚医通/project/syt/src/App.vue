<template>
  <div class="container">
    <Hospital_top></Hospital_top>
    <!-- 路由区 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <Buttom></Buttom>
    <!-- 登录组件 -->
    <Login v-if="userstore.visiable"></Login>
  </div>
</template>

<script lang="ts" setup>
import userStore from '@/store/modules/user'
let userstore = userStore()

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 1200px;
    margin-top: 80px;
    min-height: 700px;

  }

  .bottom {
    width: 100%;
    height: 50px;
    background-color: skyblue
  }
}
</style>