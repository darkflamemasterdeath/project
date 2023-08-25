import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    roles: [],
    buttons: [],
    //对比后展示
    resultAsyncRouter: [],
    Allrouter: []
  }
}
//, setToken
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_USERINFO: (state, value) => {
    //用户名
    state.name = value.name
    //用户头像
    state.avatar = value.avatar
    //菜单权限标记
    state.routes = value.routes
    //按钮权限标记
    state.buttons = value.buttons
    //角色信息
    state.roles = value.roles
  },
  SET_RESULTASYNCROUTER: (state, data) => {
    state.resultAsyncRouter = data
    state.Allrouter = constantRoutes.concat(state.resultAsyncRouter, anyRoutes)
    router.addRoutes(state.Allrouter)
  }
}
const computedAsyncrouter = (asyncRoutes, routers) => {
  return asyncRoutes.filter(item => {
    if (routers.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        //还有2，3，4，5，6级路由
        item.children = computedAsyncrouter(item.children, routers)
      }
      return true;
    }
  })
}
const actions = {
  // user login
  async login({ commit }, userInfo) {
    console.log('123')
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      console.log('+++++++++', result)
      return 'ok'
    } else {
      console.log('+-----', result)
      return Promise.reject(new Error('falie'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data),
          commit('SET_RESULTASYNCROUTER', computedAsyncrouter(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

