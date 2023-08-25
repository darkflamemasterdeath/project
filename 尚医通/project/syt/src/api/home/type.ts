//定义首页模块ts数据模型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


//已有的医院数据ts类型
export interface Hospital {
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
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": number,
        "rule": string[]
    }
}


//存储全部已有医院的数组类型
export type Content = Hospital[]

//获取已有医院接口返回的数据类型
export interface HospitalResponseData extends ResponseData {
    data: {
        content: Content,
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean

    }
}

//代表医院等级或者地区ts类型
export interface HospitalLevelAndDiqu {

    "createTime": string,
    "dictCode": string,
    "hasChildren": boolean,
    "id": number,
    "isDeleted": number,
    "name": string,
    "param": {},
    "parentId": number,
    "updateTime": string,
    "value": string
}


export type HospitallArr = HospitalLevelAndDiqu[]
//获取等级或医院地区接口返回的数据类型
export interface HospitalLevelAndDiquResponseData extends ResponseData {
    data: HospitallArr
}
export interface HospitalInfo extends ResponseData {
    data: Content
}