<template>
  <!-- <div>品牌管理</div> -->
 <div>
   <el-button type="primary" icon="el-icon-plus" style="margin:10px 0;" @click="showDialog">添加</el-button>
   <el-table  style="width: 100%;" border :data="list">
     <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
     <el-table-column label="品牌名称" prop="tmName" width="width"></el-table-column>
     <el-table-column label="品牌LOGO" prop="prop" width="width">
      <template v-slot="{row}">
    
     <img :src="row.logoUrl" alt="" style="widows: 50px; height: 50px;">
      </template> 
     </el-table-column>
     <el-table-column label="操作" prop="prop" width="width">
      <template v-slot="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletetreadMark(row)">删除</el-button>
      </template>
    </el-table-column>
   </el-table>
   <!-- @current-change="handleSzieChange" @size-change="handleSzieChange" -->
  <el-pagination style="margin-top: 20px; text-align: center;"
   :total="total" :current-page="page" 
   :page-size="limit" 
   :page-sizes="[3,5,10]" 
   :pager-count="7"
   layout="prev,pager,next,jumper,->,sizes,total"
   @current-change="getpagelist"
   @size-change="handleSzieChange"
   ></el-pagination>
   <!-- 对话框 -->
   <el-dialog :title="treadfrom.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
    <!--  -->
    <el-form style="width: 50%;" :model="treadfrom"   :rules="rules" ref="ruleForm"> 
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input  autocomplete="off" v-model="treadfrom.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO"   label-width="100px" prop="tmName" >
        <el-upload
    class="avatar-uploader"
    action="/dev-api/admin/product/fileUpload"
    :show-file-list="false"
       :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
    <img v-if="treadfrom.logoUrl" :src="treadfrom.logoUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submittreamark">确 定</el-button>
    </div>
  </el-dialog>
 </div>
  
</template>

<script>
// import { ElPagination } from 'element-ui/types/pagination';

export default {
  name: 'TradMark',
    data() {
      return {
        page: 1,
        limit: 6,
        //总共数据条数
        total: 0,
        list: [],
        dialogFormVisible: false,
        imageUrl: '',
        treadfrom: {
          tmName: '',
          logoUrl:''
        },
            rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择图片'}
        ],
      }
      }
    },
    // components: { ElPagination }
    mounted() {
      this.getpagelist()
  },
    methods: {
      async getpagelist(pager = 1) {
        this.page=pager
        const { page,limit}=this
        
       let result = await this.$API.trademark.reqTreadeMarkList(page, limit)
       
        if (result.code == 200) {
          this.list = result.data.records
          this.total=result.data.total
        }
      },
      handleSzieChange(limits) {
        this.limit = limits
        this.getpagelist()
      },
      showDialog() {
        this.dialogFormVisible = true
        this.treadfrom = {tmName:'',logoUrl:''}
       },
       //修改品牌
      updateTradeMark(row) { 
        this.dialogFormVisible = true
       
        this.treadfrom = {...row }
      },
       handleAvatarSuccess(res, file) {
         this.imageUrl = URL.createObjectURL(file.raw);
        
      this.treadfrom.logoUrl=res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
      },
    submittreamark() { 
        this.$refs.ruleForm.validate( async (succes) => { 
          if (succes) {
            let result = await this.$API.trademark.reqaddupdateTreadMark(this.treadfrom)
            this.dialogFormVisible = false
            if (result.code == 200) {
              this.$message({
                type: 'success',
                message: this.treadfrom.id ? '修改成功' : '添加成功'
              })
              //添加或修改成功之后再次获取列表信息
              this.getpagelist(this.treadfrom.id ? this.page : 1)
            }
          } else { 
          
            return false
          }


        })
      },
      //删除品牌信息
      deletetreadMark(row) {
          this.$confirm(`品牌${row.tmName}将被删除是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
          }).then(async () => {
            let result = await this.$API.trademark.reqdeletetreadMark(row.id)
        //  console.log('===========',result)
            if (result.code == 200) {
               this.$message({
            type: 'success',
                 message: '删除成功!'
               });
          this.getpagelist(this.list.length>1?this.page:this.page-1)
            }
          
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
       }
   }
}
</script>
<!--



    


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  -->
<style scoped>

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>