<template>
  <div>
    <el-table style="width:100%" border :data="records">
    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
    <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
    <el-table-column prop="skuDesc" label="描述" width="310"></el-table-column>
    <el-table-column  label="默认图片" width="110">
      <template v-slot="{row}">
      
          <img :src="row.skuDefaultImg" alt="" style="width: 80px;height: 80px;">
        

      </template>
    </el-table-column>
    <el-table-column prop="weight" label="重量" width="80"></el-table-column>
    <el-table-column prop="price" label="价格" width="80"></el-table-column>
    <el-table-column prop="prop" label="操作" width="width">
      <template v-slot="{row}">
      
          <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="row.isSale==0" @click="sale(row)"></el-button>
           <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="cancel(row)"></el-button>
           <el-button type="primary" icon="el-icon-edit" size="mini"  @click="edit"></el-button>
         <el-button type="info" icon="el-icon-info" size="mini" @click="getskuinfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
    @current-change="getdata"
    @size-change="changelimit"
    style="text-align: center;"
    :current-page="page"
    :page-sizes="[3,5,10]"
    :page-size="limit"
    layout="prev,pager,next,jumper,->,sizes,total"
    :total="20"
    ></el-pagination>


    <el-drawer
    :visible.sync="show"
    :direction="direction"
    size="50%"
    >
   <el-row>
    <el-col :span="5">名称</el-col>
    <el-col :span="16">sku</el-col>
  </el-row>
   <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{ skuInfo.skuName }}</el-col>
    </el-row>
     <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
    </el-row>
     <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{ skuInfo.price }}元</el-col>
    </el-row>
     <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
        <template >
            <el-tag type="success" v-for="(attr) in skuInfo.skuAttrValueList" style="margin-right:10px;" :key="attr.id">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>
        </template></el-col>
      </el-row>
       <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
        <template>
         <el-carousel height="150px">
        <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
          <img :src="item.imgUrl" alt="">
        </el-carousel-item>
      </el-carousel>
            
        </template></el-col>
      </el-row>
  </el-drawer>
  </div>
</template>

<script>
import { Row } from 'element-ui'

export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      records: [],
      skuInfo: [],
      show: false,
      direction:'rtl'
    }
  },
mounted() {
  this.getdata()
  },
methods: {
  async getdata(pages = 1) {
    this.page = pages
    const {page,limit}=this
    let result = await this.$API.sku.reqlistsku(page, limit)
    console.log('sku', result)
    if (result.code = 200) {
      this.total = result.data.total
        this.records=result.data.records
      }
  },
  changelimit(limits) {
    this.limit = limits
    this.getdata()
  },
  async sale(row) {
    let result = await this.$API.sku.requpsale(row.id)
    console.log(result)
    if (result.code == 200) {
      row.isSale=1
    this.$message({type:'success',message:'上架成功'})
   }
  },
  async cancel(row) { 
    console.log('row', row)
    let result = await this.$API.sku.reqdownsale(row.id)
    if (result.code == 200) {
      row.isSale = 0
      this.$message({type:'success',message:'下架成功'})
    }
  },
  edit()
  {
    this.$message('正在开发中')
  },
  async getskuinfo(row) { 
    let result = await this.$API.sku.reqskuId(row.id)
    console.log(result)
      if(result.code==200)
      {
 this.skuInfo=result.data  
    }
    this.show=true
  }
},
}
</script>

<style>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 10px;
  }

</style>
<style scoped>

  .el-row .el-col-5{
    font-size:18px;
    text-align: right;
  }
  .el-col{
    margin: 10px;
  }
</style>