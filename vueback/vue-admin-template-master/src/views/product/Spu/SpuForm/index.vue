<template>
  <div>
    <el-form label-width="80px" :model="spu">
        <el-form-item label="spu名称">
            <el-input placeholder="sup的名称" v-model="spu.spuName"></el-input>
        </el-form-item>

        <el-form-item label="品牌">
            <el-select placeholder="请选择品牌" v-model="spu.tmId">
                <el-option :label="tm.tmName" :value="tm.id" v-for="(tm) in  treadmark" :key="tm.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="spu描述">
            <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
        </el-form-item>

        <el-form-item label="spu图片">
            <el-upload
      action="/dev-api/admin/product/fileUpload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handlersuccess"
      :file-list="imageslist"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-select :placeholder="`还有${unSelectSaleAtt.length}未选择`" v-model="attrId">

                <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect) in unSelectSaleAtt" :key="unselect.id"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" :disabled="!attrId" @click="addSaleAttr">添加销售属性</el-button>
            <el-table style="width:100%" border :data="spu.spuSaleAttrList"> 
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
             <el-table-column  prop="saleAttrName" label="属性名" width="width"></el-table-column>
              <el-table-column  prop="prop" label="属性值名称列表" width="width">
                <!-- @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm" 
                @click="showInput"-->
                <template v-slot="{row}">
                <el-tag
                    :key="tag.id"
                    v-for="(tag,index) in row.spuSaleAttrValueList"
                    closable
                    :disable-transitions="false"
                    @close="row.spuSaleAttrValueList.splice(index,1)">
                    {{ tag.saleAttrValueName }}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="row.inputVisible"
                    v-model="row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInput(row)">
    </el-input>
    <el-button v-else class="button-new-tag" size="small"  @click="addsaleattrvalue(row)">添加</el-button>
                </template>
              </el-table-column>
               <el-table-column  prop="prop" label="操作" width="width">
                <template v-slot="{$index}">
                
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                    
                </template>
               </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="addUpdateSpu">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
             dialogImageUrl: '',
            dialogVisible: false,
            spu: {
                "category3Id":'',
                "description": "",
                "id": '',
                "spuName": "",
                 "tmId": '',
                "spuImageList": [
                    {
                        "id": 0,
                        "imgName": "string",
                        "imgUrl": "string",
                        "spuId": 0
                    }
                ],
                "spuSaleAttrList": [
                    {
                        "baseSaleAttrId": 0,
                        "id": 0,
                        "saleAttrName": "string",
                        "spuId": 0,
                        "spuSaleAttrValueList": [
                            {
                                "baseSaleAttrId": 0,
                                "id": 0,
                                "isChecked": "string",
                                "saleAttrName": "string",
                                "saleAttrValueName": "string",
                                "spuId": 0
                            }
                        ]
                    }
                ],
            },
            treadmark: [],
            imageslist: [],
            saleresult: [],
            attrId: ''
            //收集未选择的销售id
        }
    },
    computed: {
        unSelectSaleAtt() {
           return this.saleresult.filter(item => { 
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                 })
            })
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handlersuccess(response,file,fileList) {
             
          this.imageslist=fileList
        },
        async initspu(row) { 
            console.log('发请求', row)
            let result = await this.$API.spu.reqspu(row.id)
            console.log('...', result)
            if (result.code == 200) {
                this.spu=result.data
            }
            let treadmark = await this.$API.spu.reqTreadMarkList()
            // console.log(treadmark)
            if (treadmark.code == 200) {
                this.treadmark=treadmark.data
            }
            let imageslist = await this.$API.spu.reqspuimageslist(row.id)
            // console.log('images',imageslist)
            if (imageslist.code == 200) {
                let listArr = imageslist.data
                    listArr.forEach(element => {
                        element.name = element.imgName
                        element.url=element.imgUrl
                    });
                    this.imageslist =listArr
            }
            let saleresult = await this.$API.spu.reqBaseattrlist()
            if (saleresult.code == 200) {
                this.saleresult = saleresult.data
                console.log(this.saleresult)
            }
        },
        addSaleAttr() {
            const [ baseSaleAttrId, saleAttrName ] = this.attrId.split(':')
            //向spu对象的spusaleattrlist添加新的属性
            // console.log('看这里',this.attrId,baseSaleattrid,saleattrname)
            let newsaleattr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
            //添加新的属性
            this.spu.spuSaleAttrList.push(newsaleattr)
            this.attrId=''
        },
        addsaleattrvalue(row) {
            this.$set(row, 'inputVisible', true)
            this.$set(row,'inputValue','')
        },
        handleInput(row) {
            const { baseSaleAttrId, inputValue } = row
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空')
                return;
            }
            let nwesaleattrvalue = { baseSaleAttrId, saleAttrValueName: inputValue }
                row.spuSaleAttrValueList.push(nwesaleattrvalue)
            row.inputVisible =false
        },
       async addUpdateSpu() { 
           this.spu.spuImageList= this.imageslist.map(item => {
               return {
                    
                    imgName: item.name,
                imgUrl:(item.response&&item.response.data)||item.url
            }
           })      
        console.log('你',this.spu)
           let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
        //   console.log('我',result)
           if (result.code == 200) {
                this.$message({ type:'success',message: '保存成功'})
this.$emit('changeScene',0)
           }
         Object.assign(this._data, this.$options.data())
        },
        async addspudata(category3Id) { 
            console.log('大撒')
            this.spu.category3Id= category3Id
            let treadmark = await this.$API.spu.reqTreadMarkList()
            // console.log(treadmark)
            if (treadmark.code == 200) {
                this.treadmark = treadmark.data
            }

             let saleresult = await this.$API.spu.reqBaseattrlist()
            if (saleresult.code == 200) {
                this.saleresult = saleresult.data
                console.log(this.saleresult)
            }
        },
        cancel() { 
            this.$emit('changeScene', 0)
            Object.assign(this._data,this.$options.data())
            console.log('...............',this.$options.data())
        }
    }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>