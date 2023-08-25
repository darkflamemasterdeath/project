import { requestlist } from "@/api"
import { requestmock, reqfloorlist } from '@/api'
//home

//存数据
const state = {
    catelist_data: [],
    banner_data: [],
    floor_data: []
}
//修改数据
const mutations = {

    CATELIST(state, data) {
        state.catelist_data = data
    },
    BANNERDATA(state, data) {
        state.banner_data = data
    },
    REQFLOORLIST(state, data) {
        state.floor_data = data
    }

}
//发送请求
const actions = {
    //通过api里面的接口函数发送请求
    async catelist({ commit }) {
        let result = await requestlist()

        if (result.code === 200) {
            commit("CATELIST", result.data)
        }
    },
    async getbanner({ commit }) {
        let result = await requestmock()

        if (result.code === 200) {
            commit('BANNERDATA', result.data)
        }

    },
    async getfloordata({ commit }) {
        let result = await reqfloorlist()
        if (result.code === 200) {
            commit('REQFLOORLIST', result.data)
        }
    }
}
//计算属性
const getters = {}
export default {

    state,
    mutations,
    actions,
    getters
}