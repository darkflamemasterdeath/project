//定义详情模块数据ts
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
//医院详情数据
export interface HosPitaldetail {

    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": number,
        "rule": string[

        ]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string
        "intro": string
        "route": string,
        "status": number,
        "bookingRule": null
    }
}
//医院详情返回数
export interface Hospitaldetail extends ResponseData {
    data: HosPitaldetail
}

//医院科室的信息
export interface Deparment {
    "depcode": string,
    "depname": string,
    "children"?: Deparment[]
}

//存储科室的数组类型
export type DeparmentArr = Deparment[]

//返回数据的类型
export interface DeparmentResponseData extends ResponseData {
    data: DeparmentArr
}


//用户登录接口
export interface LoginData {
    phone: string,
    code: string
}
//登录接口返回过户信息数据
export interface UserInfo {
    name: string,
    token: string
}

//登录接口返回的数据类型
export interface UserLoginResponest extends ResponseData {
    data: UserInfo
}
//定义微信扫码登录返回的数据的ts类型
export interface WxLogin {
    appid: string,//唯一标识
    scope: string,//当前微信扫码授权确定
    redirectUri: string,
    state: string,
}

export interface WxloginResponseData extends ResponseData {
    data: WxLogin
}

export interface BaseMap {
    "workDateString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string
}

export interface workDate {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": string,
    "reservedNumber": null,
    "availableNumber": number,
    "status": number
}
export interface HospitalWork extends ResponseData {
    data: {
        total: number,
        "bookingScheduleList": workDate[],
        baseMap: BaseMap
    }
}

//代表的是一个医生的数据
export interface Doctor {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill": string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount": number,
    "status": number,
    "hosScheduleId": string
}

//全部医生
export type DocArr = Doctor[]
export interface DoctorResponseData extends ResponseData {
    data: DocArr
}

export interface DoctorInfodata extends ResponseData {
    data: Doctor
}


// {
//     "code": 200,
//         "message": "成功",
//             "data": {
//         "total": 10,
//             "bookingScheduleList": [
//                 {
//                     "workDate": "2023-08-20",
//                     "workDateMd": "08月20日",
//                     "dayOfWeek": "周日",
//                     "docCount": 4,
//                     "reservedNumber": 424,
//                     "availableNumber": 279,
//                     "status": 0
//                 }
//             ],
//                 "baseMap": {
//             "workDateString": "2023年08月",
//                 "releaseTime": "09:15",
//                     "bigname": "专科",
//                         "stopTime": "12:30",
//                             "depname": "病理科门诊",
//                                 "hosname": "首都医科大学附属北京安贞医院"
//         }
//     },
//     "ok": true
// }