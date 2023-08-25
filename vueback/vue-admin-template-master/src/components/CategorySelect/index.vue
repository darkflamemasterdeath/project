<template>
  <div>

    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类" >
        <el-select :disabled="show" placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
          <el-option :label="attr.name" :value="attr.id" v-for="(attr) in list1" :key="attr.id"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
       <el-form-item label="二级分类" >
            <el-select :disabled="show" placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
              <el-option :label="attr2.name" :value="attr2.id" v-for="(attr2) in list2" :key="attr2.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="三级分类" >
            <el-select :disabled="show" placeholder="请选择" v-model="cForm.category3Id" @change="handler3"> 
              <el-option :label="attr3.name" :value="attr3.id" v-for="(attr3) in list3" :key="attr3.id"></el-option>
            </el-select>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      list1: [],
      //收集相应的一级二级三级分类的id
      list2: [],
      list3:[],
      cForm: {
        category1Id: '',
        category2Id: '',
          category3Id: ''
      },
      
    }
  },
  mounted() {
    this.getcategory1list()
  },
  methods: {
   async getcategory1list() { 
     let result=await this.$API.attr.reqgetcategorylist()
// console.log(result)
      if (result.code == 200) {
        this.list1 = result.data
}
    },
   async handler1() {
      // alert('123')
      //通过一级分类的id获取二级分类
     this.list2 = [],
       this.list3 = [],
       this.cForm.category2Id = '',
       this.cForm.category3Id=''
      let {category1Id}=this.cForm
     let result = await this.$API.attr.reqgetcategorylist2(category1Id)
     console.log(result)
     if (result.code == 200) {
      this.list2=result.data
     }
    },
    async handler2() { 
      this.list3 = '',
      this.cForm.category3Id=''
      let { category2Id } = this.cForm
      let result = await this.$API.attr.reqgetcategorylist3(category2Id)
      if (result.code == 200) { 
        this.list3=result.data
      }
    },
    async handler3() { 
      console.log('666')
      this.$emit('getcategroyId', { ...this.cForm })
    }
  },
}
</script>

<style scoped>

</style>