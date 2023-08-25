import { reqshopcar, reqdeletshop, requpdate } from '@/api'
const state = {
    cardata: []
}
const mutations = {
    getshop(state, value) {
        state.cardata = value
    }
}
const actions = {
    async getshopcar({ commit }) {
        let result = await reqshopcar()
        // console.log(result)
        if (result.code === 200) {
            commit('getshop', result.data)
        }
    },
    async deleteshop({ commit }, skuId) {

        const result = await reqdeletshop(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('Faile'))
        }


    },
    async updata({ commit }, { skuId, isChecked }) {
        let result = await requpdate(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    deletAll({ dispatch, getters }) {
        console.log(dispatch, getters)
        let PromiseAll = []
        getters.carlist.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('deleteshop', element.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    updateall({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.carlist.cartInfoList.forEach(item => {
            let promise = dispatch('updata', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    carlist(state) {
        return state.cardata[0] || {}
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}