<template>
  <div>
    <el-card class="box-card" style='margin:10px 0px'>
      <div slot="header" class="clearfix" >
          <el-tabs class="tab" v-model="activename">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>

        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setweek">本周</span>
        <span @click="setmonth">本月</span>
        <span @click="setyear">本年</span>
        <el-date-picker
        v-model="value"
        class="date"
        size="mini"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd"
          >
        </el-date-picker>
      </div>
      </div>
      <!-- 主体区域 -->
      <div>
        <el-row>
            <el-col :span="18">
                <div class="charts" ref="char"></div>
            </el-col>
            <el-col :span="6">  
               
                <h3>门店{{title}}排名</h3>
                <ul>
                    <li><span class="rindex">0</span><span>一花</span><span class="rvalue">12312</span></li>
                    <li><span class="rindex">1</span><span>二乃</span><span class="rvalue">32123</span></li>
                    <li><span class="rindex">2</span><span>三玖</span><span class="rvalue">12123</span></li>
                    <li><span class="rindex">3</span><span>四叶</span><span class="rvalue">15423</span></li>
                    <li><span >4</span><span>五月</span><span class="rvalue">45123</span></li>
                    <li><span >5</span><span>六花</span><span class="rvalue">65123</span></li>
                   
                </ul>
            </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
    name: '',
data() {
    return {
        activename: 'first',
        value: '',
        mycharts:null
    }
    },
mounted() {
    this.mycharts = echarts.init(this.$refs.char)
    this.mycharts.setOption({
        title: {
                    text:'销售额趋势'
                },
    
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        color:'yellowgreen',
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            }
   )


    },
    computed: {
        title() {
        return this.activename=='first'? '销售额':'访问量'
        },
        ...mapState({
            listState:(state)=>state.home.list
        })
    },
    watch: {
        title() {
            console.log('修改')
            this.mycharts.setOption({
                title: {
                    text: this.title+`趋势`
                },
                xAxis: {
                    data:this.title=='销售额'? this.listState.orderFullYearAxis:this.listState.userFullYearAxis
                },
                series: [
                    {   name:'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear,
                        color:'yellowgreen'
                    }
                ]
            })
        },
        listState() {
                this.mycharts.setOption({
                title: {
                    text: '销售额趋势'
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.listState.orderFullYearAxis,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        color: 'yellowgreen',
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.listState.orderFullYear
                    }
                ]
            }
            )

        }
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM-DD')
            this.value=[day,day]
        },
        setweek() {
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            console.log(start,end)
            this.value=[start,end]
        },
        setmonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.value=[start,end]
        },
        setyear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.value = [start, end]
        }
    },
}
</script>

<style scoped> 
.clearfix{
    display: flex;
    justify-content: space-between;
    position: relative;
}
.tab{
    width: 100%;
}
.right{
    position: absolute;
    right: 0;
}
.right span{
    margin:  10px;
}
.date{
    width: 300px;
    margin: 0 20px;
}
.charts{
    width: 100%;
    height: 300px;
}
ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}
ul li{
    height: 8%;
    margin: 10px 0;
}
ul li span{
    margin: 0 5px;
}
.rindex{
    float: left;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-radius: 50%;
    background-color: black;
    color: white;
    text-align: center;
    line-height: 20px;
}
.rvalue{
    float: right;
}
</style>