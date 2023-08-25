import { reqdetail, reqshop } from '@/api'
import { getUUID } from '@/utils/index'
const state = {
    detail_data: {},
    good_info: {},
    uuid: getUUID()
}
const mutations = {
    GETDETAIL(state, data) {
        state.detail_data = data
    }

}
const actions = {
    async getdetail({ commit }, value) {
        const result = await reqdetail(value)
        if (result.code === 200) {
            commit('GETDETAIL', result.data)
        }

    },
    async addshop({ commit }, { skuId, skuNum }) {
        let result = await reqshop(skuId, skuNum)
        // console.log(result)
        console.log(result)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }


}
const getters = {
    categoryView(state) {
        return state.detail_data.categoryView || {}
    },
    skuInfo(state) {
        return state.detail_data.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detail_data.spuSaleAttrList || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}