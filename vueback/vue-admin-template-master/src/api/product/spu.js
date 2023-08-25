import request from '@/utils/request'

export const reqspulist = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
export const reqspu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
export const reqTreadMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })
//获取图片
export const reqspuimageslist = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
///admin/product/baseSaleAttrList
//获取平台的销售属性
export const reqBaseattrlist = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })
//修改spu
///admin/product/saveSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    } else {
        //添加spu
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}
export const reqdeletespu = (spuId) => {
    return request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
}