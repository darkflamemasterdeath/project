import { reqcode, reqzhuce, reqlogin, requserinfo, reqloginout } from '@/api'
const state = {
    code: '',
    token: '',
    userinfo: {}
}
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETINFO(state, value) {
        state.userinfo = value
    },
    CLEARUSER(state) {
        state.token = '',
            state.userinfo = '',
            localStorage.removeItem('token')
    }
}
const actions = {
    async getcode({ commit }, phone) {
        let result = await reqcode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async zhuce({ commit }, user) {
        let result = await reqzhuce(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    async userlogin({ commit }, data) {
        let result = await reqlogin(data)
        // console.log(result)
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    async getuserinfo({ commit }) {
        let result = await requserinfo()
        console.log(result)
        if (result.code === 200) {
            commit('GETINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async logout({ commit }) {
        let result = await reqloginout()
        if (result.code === 200) {
            commit('CLEARUSER')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}