import { HosPitaldetail, DeparmentArr, UserInfo } from '@/api/hospital/type'
//定义仓库内部存储数据state的数据类型
export interface DetailState {
    hospitalInfo: HosPitaldetail,
    deparmentArr: DeparmentArr
}

//state数据类型
export interface UserState {
    visiable: boolean,
    code: string,
    userInfo: UserInfo
}