<template>
  <div>
    <el-card>
        <div slot="header">
            <div class="search-header"> 
                <span>线上热门搜索</span>
               
                <el-dropdown>
      <span >
     
         <i class="el-icon-more"> </i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
            </div>
        </div>
        <el-row :gutter="10">
            <el-col :span="12"><lineCharts></lineCharts></el-col>
            <el-col :span="12"><lineCharts></lineCharts></el-col>
        </el-row>
        <!-- table表格 -->
         <el-table
        :data="tableData"
        style="width: 100%"
        border
        >
        <el-table-column
          prop="date"
          label="排名"
          width="80"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="搜索关键字"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户数"
          sortable
          >
          <!-- :formatter="formatter" -->
        </el-table-column>
         <el-table-column
              prop="name"
              label="周涨幅"
              sortable
              width="180">
            </el-table-column>
      </el-table>
        <el-pagination
        class="pagenation"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>    
  </div>
</template>

<script>
import lineCharts from './lineCharts'
export default {
    data() {
        return {
            tableData:[{}]
        }
    },
    components: {
    lineCharts
}
}
</script>

<style scoped>
.search-header{
    display: flex;
    justify-content: space-between;
}
.pagenation{
    float: right;
}
</style>