//获取品牌管理的数据模块
//GET /admin/product/baseTrademark/{page}/{limit}
import request from '@/utils/request'
export const reqTreadeMarkList = (page, limit) => {
    return request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
}
///admin/product/baseTrademark/save
//新增品牌
///admin/product/baseTrademark/update
//修改品牌
export const reqaddupdateTreadMark = (traeadmark) => {
    if (traeadmark.id) {
        //有id表示修改
        return request({ url: '/admin/product/baseTrademark/update', data: traeadmark, method: 'put' })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', data: traeadmark, method: 'post' })
    }
}


// DELETE / admin / product / baseTrademark / remove / { id }
///admin/product/baseTrademark/remove/{id}
//删除品牌
export const reqdeletetreadMark = (id) => {
    return request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
}

