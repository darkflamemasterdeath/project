export interface ResponseData {
    'code': number,
    'messgae': string,
    'ok': boolean
}
//提交订单接口返回的数据ts类型
export interface SubmitOrder extends ResponseData {
    'data': number
}
export interface PayInfo {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}
export interface QrCode extends ResponseData {
    data: PayInfo
}

//查询支付结果的ts类型
export interface PayResult extends ResponseData {
    data: boolean
}
export interface Userinfo {
    'certificatesNo': string,
    'certificatesType': string,
    'certificatesUrl': string,
    'name': string
}