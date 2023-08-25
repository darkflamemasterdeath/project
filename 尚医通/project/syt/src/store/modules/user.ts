//定义用户相关的操作
//定义defineStore小仓库
import { defineStore } from 'pinia'
import { reqCode, reqUserLogin } from '@/api/hospital/index'
import type { LoginData, UserLoginResponest, UserInfo } from '@/api/hospital/type'
import type { UserState } from './interface/index'
const UserStore = defineStore('User', {
    state: (): UserState => {
        // defineStore
        return {
            visiable: false,
            code: '',
            userInfo: JSON.parse(localStorage.getItem('USERINFO') as string) || {}
        }
    },
    actions: {
        async findcode(code: string) {
            let result: any = await reqCode(code)
            console.log('大苏打', result)
            if (result.code == 200) {
                this.code = result.data
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        async userlogin(data: LoginData) {
            // console.log(data)
            let result: UserLoginResponest = await reqUserLogin(data)
            console.log(',a', result)
            if (result.code == 200) {
                this.userInfo = result.data
                localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        logouts() {
            this.userInfo = { name: '', token: '' }
            localStorage.removeItem('USERINFO')
        }
    },
    getters: {}
})
//dialogFormVisible
export default UserStore