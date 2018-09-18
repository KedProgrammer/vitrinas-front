import Vue from 'vue'
import Vuex from 'vuex'

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
      console.log("hola mundo")
      state.modalOrder = data
      console.log(state.modalOrder)
    }
  },
  actions: {

  }

})

export default store
