import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'

// import configService from './settings/api-url.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    modalOrder: {}
  },
  getters: {
  },
  mutations: {
    setModalOrder (state, data) {
      state.modalOrder = data
      console.log(state.modalOrder)
    }
  },
  actions: {

  },
  modules: {
    user
  }

})

export default store
