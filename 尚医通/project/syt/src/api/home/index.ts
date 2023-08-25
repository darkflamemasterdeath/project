//统一管理首页的模块接口
import request from "@/utils/request";
import type { HospitalResponseData, HospitalLevelAndDiquResponseData, HospitalInfo } from "./type";
//通过枚举去管理首页模块的接口地址
enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院等级和地区的接口
    HOSPITALLEVELANDDIQU_URL = '/cmn/dict/findByDictCode/',
    //关键子搜索医院名字
    HOSPITALNAME_URL = '/hosp/hospital/findByHosname/'
}
//获取医院的数据
export const reqhospital = (page: number, limit: number, hostype = '', districtCode = '') => request<any, HospitalResponseData>({ url: `${API.HOSPITAL_URL}${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`, method: 'get' })
//获取医院的等级或者地区
// districtCode
export const reqhospitallevelanddiqu = (dictCode: string) => request.get<any, HospitalLevelAndDiquResponseData>(API.HOSPITALLEVELANDDIQU_URL + dictCode)
export const reqhospitalInfo = (hosname: string) => request.get<any, HospitalInfo>(API.HOSPITALNAME_URL + hosname)