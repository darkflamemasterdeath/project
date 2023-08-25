<template>
    <div class="carts" ref="charts">

    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',
    mounted() {
        let line = echarts.init(this.$refs.charts)
        line.setOption({
            xAxis: {
                show: false,
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'bar',
                    smooth: true,
                    data: [90, 40, 20, 80, 70, 10, 60, 40, 20, 90],
                    //拐点的样式
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    },
}
</script>

<style>
.carts {
    widows: 100%;
    height: 100%;
}
</style>