import { defineStore } from 'pinia'
//pinia仓库的写法：组合式api，选择式api写法
import { reqhospitaldetail, reqhospitaldepartment } from '@/api/hospital'
//引入详情数据的ts类型
import type { Hospitaldetail } from '@/api/hospital/type'
import type { DetailState } from './interface'
import { HosPitaldetail, DeparmentResponseData, DeparmentArr } from '@/api/hospital/type'
const useDetailstore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            //医院详情数据
            hospitalInfo: ({} as HosPitaldetail),
            //科室数据
            deparmentArr: []
        }
    },
    actions: {
        //获取医院详情的方法
        async getHospital(hoscode: string) {
            console.log(hoscode)
            let result: Hospitaldetail = await reqhospitaldetail(hoscode)

            if (result.code == 200) {
                this.hospitalInfo = result.data
            }
        },
        async getDepatment(hoscode: string) {
            let result: DeparmentResponseData = await reqhospitaldepartment(hoscode)
            console.log('科室', result)
            if (result.code == 200) {
                this.deparmentArr = result.data
            }
        }
    },
    getters: {}
})

//获取仓库的方法对外暴露
export default useDetailstore
