<template>
  <div >
    <el-row :gutter="20">

      <el-col :span="12">
      <Search></Search>
      </el-col>
      <!-- ---------------------------- -->
      <el-col :span="12">
      <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
export default {
  components: {
    Search,
  Category
}
}
</script>

<style scoped>
.footers{
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
}
</style>