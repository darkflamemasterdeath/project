<template>
  <div>
      <el-card style="margin: 10px 0;">
      <CategorySelect @getcategroyId="getcategoryid"  :show="scene!=0"/>
      </el-card>
      <el-card>
        <!-- 有三部分进行切换 -->
        <div  v-show="scene == 0">
          <!-- 展示sup列表的结构 -->
          <el-button type="primary" icon="el-icon-plus" :disabled="!cForm.category3Id" @click="addSpu">添加</el-button>
          <el-table style="width:100%;" border :data="records">
            <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
            <el-table-column   label="spu名称" prop="spuName"> </el-table-column>
            <el-table-column label="sup描述" prop="description"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{row}">
                  <hint-button title="添加sku" type="success" icon="el-icon-plus" size="mini" @click="addsku(row)"></hint-button>
                  <hint-button title="修改spu" type="waring" icon="el-icon-edit" size="mini" @click="updateSpu(row)"></hint-button>
                  <hint-button title="查看当前spu全部类实例sku" type="info" icon="el-icon-info" size="mini" @click="checksku(row)"></hint-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deletespu(row)">
            <hint-button title="删除spu" type="danger" icon="el-icon-delete" slot="reference" size="mini"></hint-button>
            </el-popconfirm>
              </template>
            </el-table-column>        
        </el-table>
        <el-pagination
        @current-change="changpage"
        @size-change="changesize"
        :current-page="page"
        :page-sizes="[3,5,10]"
        :page-size="limit"
        layout="prev,pager,next,jumper,->,total,sizes"
        :total="total"
        style="text-align: center;"
        ></el-pagination>
        </div>
        <SpuForm  v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
        <SkuForm v-show="scene == 2" ref="sku"  @changescenes="changescenes"> </SkuForm>
      </el-card>
        <!-- ----------------------------------------------------- -->
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
    <el-table :data="skulist" v-loading="loading" border>
      <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
      <el-table-column prop="price" label="价格" width="200"></el-table-column>
      <el-table-column prop="weight" label="重量"></el-table-column>
      <el-table-column label="默认图片">
        <template v-slot="{row}">
        
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;" alt="">
          
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  data() {
    return {
      //控制三级联动的可操作性
      show: true,
      page: 1,
      limit: 3,
      cForm: {},
      records: [],
      total: 0,
      scene: 0,//0代表展示spu列表数据，1添加spu修改spu,2代表添加修改sku
      dialogTableVisible: false,
      spu: {},
      skulist: [],
      loading:true
    }
  },
  components: {
    SkuForm,
    SpuForm
  },
methods: {
  getcategoryid(cForm) {
    
    this.cForm = { ...cForm }
    this.getspulist()
  },
  async getspulist() { 
    const {page,limit}=this
    let result = await this.$API.spu.reqspulist(page, limit,this. cForm.category3Id)

    if (result.code == 200) {
      this.total = result.data.total
    this.records=result.data.records
  }
  },
  changpage(page) { 
    
    this.page = page
    this.getspulist()
  },
  changesize(limit) {
    this.limit = limit
    this.getspulist()
  },
  addSpu() {
    
    this.scene = 1
    //通知子组件发送请求
    this.$refs.spu.addspudata(this.cForm.category3Id)
  },
  updateSpu(row)
  {
    this.scene = 1
    console.log('修改', row)
    this.$refs.spu.initspu(row)
  },
  changeScene(scene) { 
    this.scene = scene
    this.getspulist()
  },
  //删除spu
  async deletespu(row) { 

    let result = await this.$API.spu.reqdeletespu(row.id)
    console.log(result)
    if (result.code == 200) {
      this.$message({type:'success',message:'删除成功'})
      this.getspulist()
    }
  },
   addsku(row) {
     this.scene = 2
     this.$refs.sku.getdata(row, {...this.cForm})
  console.log(this.$refs.sku.getdata)
  },
  changescenes(value) {
    this.scene=value
  },
  //查看sku列表
async  checksku(spu) {
    this.dialogTableVisible = true
    this.spu = spu
    //获取sku列表进行展示
  let result = await this.$API.sku.reqSkulist(spu.id)
  console.log('sku列表', result)
  if (result.code = 200) {
    this.skulist=result.data
  }
     this.loading = false
  },
  close(done) {
    this.loading = true
    this.skulist = []
    done()
  }
 
},
}
</script>

<style>

</style>