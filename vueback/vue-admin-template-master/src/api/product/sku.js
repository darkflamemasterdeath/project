import request from '@/utils/request'
//获取图片的数据
///admin/product/spuImageList/{spuId}
export const reqSpuImgList = (spuId) => {
    return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}

//获取销售属性列表
export const reqSpuSaleAttrList = (spuId) => {
    return request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
}

//获取平台属性数据
///admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqattrinfolist = (category1Id, category2Id, category3Id) => {
    return request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}

//保存提交数据
///admin/product/saveSkuInfo
export const reqsaveskyinfo = (skuInfo) => {
    return request({ url: `/admin/product/saveSkuInfo`, method: 'post', data: skuInfo })
}
///admin/product/findBySpuId/{spuId}
//获取sku列表数据接口
export const reqSkulist = (spuId) => {
    return request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
}

///admin/product/list/{page}/{limit}
//获取sku数据
export const reqlistsku = (page, limit) => {
    return request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })
}
export const requpsale = (skuId) => {
    return request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
}

export const reqdownsale = (skuId) => {
    return request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })
}


//获取sku详情的接口
///admin/product/getSkuById/{skuId}
export const reqskuId = (skuId) => {
    return request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
}

