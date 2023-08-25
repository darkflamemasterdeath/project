<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="spu名称">{{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="输入sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
          <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(千克)">
          <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
          <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性" >
          <el-form :inline="true" label-width="80px">
            <el-form-item :label="attr.attrName" v-for="(attr) in attrlist" :key="attr.id">
              <el-select placeholder="请选择" v-model="attr.attrAndvalue">
              <el-option :label="attrvalue.valueName" :value="`${attr.id}:${attrvalue.id}`" v-for="(attrvalue) in attr.attrValueList" :key="attrvalue.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
         <el-form-item label="销售属性">
            <el-form :inline="true" label-width="80px">
              <el-form-item :label="sale.saleAttrName" v-for="sale in salelist" :key="sale.id">
                <el-select placeholder="请选择" v-model="sale.attridAndVlaue">
                <el-option :label="salevalue.saleAttrValueName" :value="`${sale.id}:${salevalue.id}`" v-for="salevalue in sale.spuSaleAttrValueList" :key="salevalue.id"> </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item label="图片列表">
            <el-table style="width:100%" border :data="spuimglist" @selection-change="handleselect">
            <el-table-column type="selection" prop="prop" label="label" width="80"></el-table-column>
             <el-table-column prop="prop" label="图片" width="width">
              <template v-slot="{row}">
              
                  <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
                
              </template>
             </el-table-column>
              <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
               <el-table-column prop="prop" label="操作" width="width">
                <template v-slot="{row}">
                
                    <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
                  <el-button  v-else>默认</el-button>
                </template>
               </el-table-column>
            </el-table>

          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel" >取消 </el-button>
          </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuimglist: [],
      salelist: [],
      attrlist: [],
      skuInfo: {
        //
        "category3Id": 0,
        "price": 0,
        "spuId": 0,
        "tmId": 0,
        "skuName": "",
        "weight": "",
          "skuDesc": "",
        "skuAttrValueList": [
          // {
          //   "attrId": 0,
          //   "attrName": "string",
          //   "id": 0,
          //   "skuId": 0,
          //   "valueId": 0,
          //   "valueName": "string"
          // }
        ],
        "skuDefaultImg": "",
       
        "skuImageList": [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "skuId": 0,
          //   "spuImgId": 0
          // }
        ],
        
        "skuSaleAttrValueList": [
          // {
          //   // "id": 0,
          //   // "saleAttrId": 0,
          //   // "saleAttrName": "string",
          //   // "saleAttrValueId": 0,
          //   // "saleAttrValueName": "string",
          //   // "skuId": 0,
          //   // "spuId": 0
          // }
        ],

       
      },
      spu: {},
      imglist:[]
    }
  },
methods: {
  async getdata(row, ids) {
    const { category1Id, category2Id, category3Id } = ids
    this.skuInfo.category3Id = category3Id
    this.skuInfo.spuId = row.id
    this.skuInfo.tmId = row.tmId
    this.spu=row
    console.log('这', row, ids)
    let result = await this.$API.sku.reqSpuImgList(row.id)
    if (result.code == 200) {

      let list = result.data
        list.forEach(element => {
          element.isDefault=0
        });
         this.spuimglist=list
    }
    let result1 = await this.$API.sku.reqSpuSaleAttrList(row.id)
    if (result1.code == 200) {
    this.salelist=result1.data
    }
   //获取平台属性
   
    let result2 = await this.$API.sku.reqattrinfolist(category1Id,category2Id,category3Id)
    if (result2.code == 200) {
    this.attrlist=result2.data
   }
  },
  handleselect(value) {
    console.log(value)
    this.imglist=value
  },
  changeDefault(row) {
    this.spuimglist.forEach(item => { 
      item.isDefault=0
    })
    row.isDefault = 1
    this.skuInfo.skuDefaultImg=row.imgUrl
  },
  cancel() {
    this.$emit('changescenes', 0)
    Object.assign(this._data,this.$options.data())
  },
  async save() {
    const { attrlist, skuInfo , salelist, spuimglist } = this
    let arr=[]
   //把收集到的属性整理
   attrlist.forEach(element => {
     if (element.attrAndvalue) {
       const [ attrId, valueId ] = element.attrAndvalue.split(':')
       let obj = { attrId, valueId }
       arr.push(obj)
    }
   });
    skuInfo.skuSaleAttrValueList=salelist.reduce((prev, item) => {
      if (item.attridAndVlaue) {         
        const [saleAttrId, saleAttrValueId] = item.attridAndVlaue.split(":")
        prev.push({saleAttrId,saleAttrValueId})
      }  
      return prev
    }, [])
    skuInfo.skuImageList = spuimglist.map(item => { 
      return {
        imgName: item.imgName,
        imgUrl: item.imgUrl,
        isDefault: item.isDefault,
        spuImgId:item.id
      }
    })
    skuInfo.skuAttrValueList = arr
    console.log('图片信息', spuimglist)
    let result = await this.$API.sku.reqsaveskyinfo(skuInfo)
    console.log(result)
    if (result.code === 200) {
       
      // Object.assign(this._data, this.$options.data())
      this.$message({ type: 'success', message:'保存成功'})
         this.$emit('changescenes', 0)
    }
   }
},
}
</script>

<style>

</style>
<!-- {
  "category3Id": 0,
  "createTime": "2023-08-03T09:08:42.833Z",
  "id": 0,
  "isSale": 0,
  "price": 0,
  "skuAttrValueList": [
    {
      "attrId": 0,
      "attrName": "string",
      "id": 0,
      "skuId": 0,
      "valueId": 0,
      "valueName": "string"
    }
  ],
  "skuDefaultImg": "string",
  "skuDesc": "string",
  "skuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "isDefault": "string",
      "skuId": 0,
      "spuImgId": 0
    }
  ],
  "skuName": "string",
  "skuSaleAttrValueList": [
    {
      "id": 0,
      "saleAttrId": 0,
      "saleAttrName": "string",
      "saleAttrValueId": 0,
      "saleAttrValueName": "string",
      "skuId": 0,
      "spuId": 0
    }
  ],
  "spuId": 0,
  "tmId": 0,
  "weight": "string"
} -->