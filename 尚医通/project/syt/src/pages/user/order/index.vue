<template>
    <div>
        <div v-if="$route.query.orderId">
            <Detaile></Detaile>
        </div>
        <div v-else>

            <Allorder></Allorder>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Detaile from './detail/index.vue'
import Allorder from './orders/index.vue'
let $route = useRoute()
</script>

<style lang="scss" scoped></style>