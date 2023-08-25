//search
import { reqlist } from "@/api"
const state = {
    list_data: {}
}
const mutations = {
    GETLIST(state, value) {
        state.list_data = value
    }

}
const actions = {
    async reqlistdata({ commit }, value) {
        let result = await reqlist(value)
        if (result.code === 200) {
            commit('GETLIST', result.data)

        }

    }
}
const getters = {
    attrsList(state) {
        return state.list_data.attrsList
    },
    goodsList(state) {
        return state.list_data.goodsList
    },
    trademarkList(state) {
        return state.list_data.trademarkList
    },


}
export default {

    state,
    mutations,
    actions,
    getters
}