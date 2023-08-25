import mockRequest from '@/utils/mockrequest'
const state = {
    list: {}
}
const mutations = {
    GETDATA(state, value) {
        state.list = value
    }
}
const actions = {
    async getData({ commit }) {
        let result = await mockRequest.get('/home/list')
        console.log(result)
        if (result.code == 20000) {
            commit('GETDATA', result.data)
        }
    }


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}