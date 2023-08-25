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
                min: 0,
                max:100
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    smooth: true,
                    data: [78],
                    //拐点的样式
                    color: 'green',
                    barWidth: 10,
                    showBackground:true
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