<template>
  <div>
    <el-card style="margin: 20px 0;">
    <CategorySelect @getcategroyId="getcateId" :show="!isShowTable"></CategorySelect>
    </el-card>
<el-card>
  <div v-show="isShowTable">
    <!-- attrid.hasOwnProperty('category3Id') -->
    <el-button type="primary" icon="el-icon-plus" :disabled="!attrid.hasOwnProperty('category3Id')" @click="addattr">添加属性</el-button>
    <!-- 展示平台属性 -->
    <el-table style="width: 100%;"  border :data="attrlist">
      <el-table-column   type="index" label="序号"  width="80px"></el-table-column>
       <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
        <el-table-column prop="" label="属性值列表" width="width">
          <template v-slot="{ row }">
          <el-tag type="succes" v-for="(attrvalue) in row.attrValueList" :key="attrvalue.id" style="margin: 10px 10px;">{{ attrvalue.valueName }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column prop="prop" label="操作" width="250px">
          <template v-slot="{row}" >
        
              <el-button  type="warning" icon="el-icon-edit" size="mini" @click="updateattr(row)">修改</el-button>
              <el-button  type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          
          </template>
         </el-table-column>
    </el-table>
  </div>
  <!-- 添加属性|修改属性的结构 -->
  <div v-show="!isShowTable">
  <el-form :inline="true"  label-width="80px" :model="attrInfo">
  <el-form-item label="属性名">
    <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
  </el-form-item>
  </el-form>
  <el-button type="primary" icon="el-icon-plus" @click="addvalue" :disabled="!attrInfo.attrName">添加属性值</el-button>
  <el-button @click="isShowTable=true">取消</el-button>
  <el-table style="width: 100%; margin: 20px 0;" border :data="attrInfo.attrValueList">
    <el-table-column align="center" type="index" label="序号" width="80px"></el-table-column>
     <el-table-column   label="属性值名称" width="width">
      <template v-slot="{row,$index}">
      <el-input v-model="row.valueName" :ref="$index" placeholder="请输入属性值名称" v-if="row.flag" @blur="tolook(row)" @keydown.native.enter="row.flag=false"></el-input>
      <span v-else @click="outlook(row,$index)" style="display: block;">{{ row.valueName }}</span>
      </template>
     </el-table-column>
      <el-table-column   label="操作" width="width">
        <template v-slot="{row,$index}">
  <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deletevalue(row,$index)">
          <el-button type="danger" icon="el-icon-delete"  size="mini" slot="reference" @click="ceshi"></el-button>
</el-popconfirm>
        </template>
      </el-table-column>
  </el-table>
  <el-button type="primary" @click="update">保存</el-button>
  <el-button @click="isShowTable=true">取消</el-button>
  </div>
</el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      attrid: {},
      attrlist: [],
      isShowTable: true,
      //新增|修改属性
      attrInfo: {
        //属性名
        "attrName": "",
       
        "attrValueList": [ //属性值，可以有多个所以用数组，每个属性值都是一个对象
         
        ],
        "categoryId": 0,//三级分类的id
        "categoryLevel": 0,
      }
    }
  },
methods: {
  getcateId(cForm) {
    console.log(cForm)
    // this.$bus.on()
    this.attrid=cForm
   this.getattrlist()
  },
 async getattrlist() { 
   let { category1Id , category2Id , category3Id }=this.attrid
   let result = await this.$API.attr.reqattrlist(category1Id, category2Id, category3Id)
   console.log(',,,,,,,,,,,,,', result)
   if (result.code == 200) {
     this.attrlist = result.data
    }
  },
  addvalue() {
    // 向属性值的数组添加元素
    this.attrInfo.attrValueList.push({
      attrId: this.attrInfo.id,
      valueName: '',
      flag:true
    })
  },
  addattr() { 
    this.isShowTable = false
   //清楚
   this.attrInfo= {
        //属性名
        "attrName": "",

          "attrValueList": [ //属性值，可以有多个所以用数组，每个属性值都是一个对象

          ],
            "categoryId": this.attrid.category3Id,//三级分类的id
              "categoryLevel": 3,
      }
  },
  updateattr(row) { 
    this.isShowTable = false
    console.log('ppppppppppppppp', row)
    this.attrInfo = cloneDeep(row)
    this.attrInfo.attrValueList.forEach(element => {
      this.$set(element,'flag',false)
    });
  },
  tolook(row) { 
    if (row.valueName.trim() == '') {
      this.$message('请输入一个正常的属性值')
    } else { 
    row.flag = false
    }
  },
  outlook(row,index) {
    row.flag = true
    this.$nextTick(() => { 
      console.log('111')
      this.$refs[index].focus()
    })
  },
  ceshi() { 
    console.log('666')
  },
  deletevalue(row,index) { 
    // alert('12')
    this.attrInfo.attrValueList.splice(index,1)
  },
  async update() { 
   this.attrInfo.attrValueList= this.attrInfo.attrValueList.filter(item => {
      if (item.valueName != '') { 
        delete item.flag
        return true
      }
   })
   try {
     await this.$API.attr.reqAddMAttr(this.attrInfo)
     this.$message({ type: 'success', message: '保存成功' })
     this.getattrlist()
     this.isShowTable=true
   } catch (error) {
    //  this.$message({type:'danger'})
    alert('123')
   }
  }
},
}
</script>

<style>

</style>