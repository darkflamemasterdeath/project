import request from '@/utils/request'
import type { ResponseData, QrCode, PayResult } from './type'
enum API {
    SUBMITOEDER_URL = '/order/orderInfo/auth/submitOrder/',
    //获取订单详情数据
    GETORDER_URL = '/order/orderInfo/auth/getOrderInfo/',
    CANCELORDER = '/order/orderInfo/auth/cancelOrder/',
    QRCODEGETORDER = '/order/weixin/createNative/',
    //查询订单支付的结果
    RESULT_YRL = '/order/weixin/queryPayStatus/',
    //获取当前账号用户信息
    USERINFO_URL = '/user/auth/getUserInfo',
    //获取证件类型接口地址
    CREAINFO_URL = '/cmn/dict/findByDictCode/',
    //用户认证的接口
    USERCEARTATION_RUL = '/user/auth/userAuah',
    //货期用户订单号的数据
    USERORDER_URL = '/order/orderInfo/auth/',
    //获取全部就诊人信息
    ALLUSER_URL = '/user/patient/auth/findAll',
    //获取订单装填
    ORDERALL_URL = '/order/orderInfo/auth/getStatusList',
    //获取各个城市的数据
    CITY_URL = '/cmn/dict/findByParentId/',
    //新曾
    NEWPEOPLE_URL = '/user/patient/auth/save',
    //更新
    UPDATE_URL = '/user/patient/auth/update',
    //删除就诊人
    DELETE_URL = '/user/patient/auth/remove/'

}

export const reqsubmitorder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, ResponseData>(API.SUBMITOEDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
export const reqorderinfo = (id: string) => request.get<any, any>(API.GETORDER_URL + id)
export const reqcancelorder = (id: string) => request.get<any, any>(API.CANCELORDER + id)
export const reqQcode = (orderId: string) => request.get<any, QrCode>(API.QRCODEGETORDER + orderId)
export const reqpayresult = (orderId: string) => request.get<any, PayResult>(API.RESULT_YRL + orderId)
export const requserInfo = () => request.get<any, any>(API.USERINFO_URL)
export const reqidcardinfo = (CertificatesType = 'CertificatesType') => request.get<any, any>(API.CREAINFO_URL + CertificatesType)
export const reqUserCertation = (data: any) => request.post<any, any>(API.USERCEARTATION_RUL, data)
export const requseorder = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, any>(API.USERORDER_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
export const reqAllUser = () => request.get<any, any>(API.ALLUSER_URL)
export const reqAllorder = () => request.get<any, any>(API.ORDERALL_URL)
export const reqcity = (parentId: string) => request.get(API.CITY_URL + parentId)
//新增与修改
export const reqnewpeople = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_URL, data)
    }
    else {
        return request.post<any, any>(API.NEWPEOPLE_URL, data)
    }
}
export const reqdelete = (id: number) => request.delete<any>(API.DELETE_URL + id)