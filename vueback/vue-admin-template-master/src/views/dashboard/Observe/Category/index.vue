<template>
  <div>
    <el-card>
<div slot="header" class="header">
     <div class="cate-header">
        <span>销售类别占比</span>
                <el-radio-group v-model="value">
                <el-radio-button label="全部渠道"></el-radio-button>
                <el-radio-button label="线上"></el-radio-button>
                <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
    </div>
</div>
<div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
data() {
    return {
        value:'全部渠道'
    }
    },
mounted() {
    let myecharts = echarts.init(this.$refs.charts)
    myecharts.setOption(
        {
            title: {
                text: '视频',
                subtext: 1048,
                left: 'center',
                top:'center'
            }
            ,
             tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outsize'
                        },
                        
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: 1048, name: '视频' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
        })
    myecharts.on('mouseover', (parmas) => {
        const { name, value } = parmas.data
        myecharts.setOption({
            title: {
                text: name,
                subtext:value
            }
           })
        })
    },
}
</script>

<style>
.cate-header
{
    display: flex;
    justify-content: space-between;
}
.header{
    border-bottom: 1px solid #eee;
}
.charts{
    width: 100%;
    height: 300px;
}
</style>