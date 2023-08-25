import request from '@/utils/request'
import { HospitalWork, DoctorInfodata, DoctorResponseData, Hospitaldetail, DeparmentResponseData, LoginData, UserLoginResponest, WxloginResponseData } from './type'


enum API {
    HOSPITALDETAIL_URL = "/hosp/hospital/",
    //获取某个科室的信息
    HOSPITALKESHI_URL = '/hosp/hospital/department/',
    GETUSERCODE_URL = '/sms/send/',
    USERLOGIN_URL = '/user/login',
    WXLOGIN_URL = `/user/weixin/getLoginParam`,
    //获取某个医院某一个科室预约挂号数据
    HOSPITALLIST_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    //某一天医生排班的数据
    DOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    //获取某个人账号高下就ren 信息
    GETUSER_URL = '/user/patient/auth/findAll',
    //获取挂号医生的信息
    GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}

export const reqhospitaldetail = (hoscode: string) => request.get<any, Hospitaldetail>(API.HOSPITALDETAIL_URL + hoscode)
export const reqhospitaldepartment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALKESHI_URL + hoscode)
//获取验证码
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponest>(API.USERLOGIN_URL, data)
//获取微信扫码登陆需要的参数
export const reqWxLogin = (wxRedirectUrl: string) => request.get<any, WxloginResponseData>(API.WXLOGIN_URL + `?wxRedirectUrl=${wxRedirectUrl}`)
export const reqhospitallist = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWork>(API.HOSPITALLIST_URL + `${page}/${limit}/${hoscode}/${depcode}`)
export const reqHospatalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
export const reqGetUser = () => request.get<any, any>(API.GETUSER_URL)
export const reqdoctor = (scheduleId: string) => request.get<any, DoctorInfodata>(API.GETDOCTOR_URL + scheduleId)