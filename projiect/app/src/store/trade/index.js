import { reqpeople, reqshopinfo } from '@/api'
const state = {
    peoples: [],
    orderinfo: {}
}
const mutations = {
    GETLIST(state, value) {
        state.peoples = value
    },
    SHOPINFO(state, value) {
        state.orderinfo = value
    }
}
const actions = {
    //获取用户地址信息
    async getuserlisst({ commit }) {
        let result = await reqpeople()
        if (result.code === 200) {
            commit('GETLIST', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getshopinfo({ commit }) {
        let result = await reqshopinfo()
        console.log(result)
        if (result.code === 200) {
            commit('SHOPINFO', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    // peoplelist(state) {
    //     return state.peoples
    // }
}
export default {
    state,
    mutations,
    actions,
    getters
}