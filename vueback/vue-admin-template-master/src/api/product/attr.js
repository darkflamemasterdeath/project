//平台属性模块请求文件
import request from '@/utils/request'
//GET /admin/product/getCategory1
//获取一级分类数据接口
export const reqgetcategorylist = () => {
    return request({ url: '/admin/product/getCategory1', method: 'get' })

}

//二级分类接口
///admin/product/getCategory2/{category1Id}
export const reqgetcategorylist2 = (category1Id) => {
    return request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
}

//三级分类接口
//GET /admin/product/getCategory3/{category2Id}
export const reqgetcategorylist3 = (category2Id) => {
    return request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
}

///admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
//获取平台属性接口
export const reqattrlist = (category1Id, category2Id, category3Id) => {
    return request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}

///admin/product/saveAttrInfo
//添加属性与属性接口
export const reqAddMAttr = (data) => {
    return request({ url: `/admin/product/saveAttrInfo`, method: 'post', data: data })
}