import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'
import employer from './modules/employer/employer'

// import configService from './settings/api-url.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    modalOrder: {},
    employers: [],
    employerId: 0
  },
  getters: {
    getEmployer (state) {
      return state.employers.find(employer => employer.id === state.employerId)
    }
  },
  mutations: {
    setModalOrder (state, data) {
      state.modalOrder = data
    },
    setEmployers (state, data) {
      state.employers = data
    },
    setEmployer (state, data) {
      const employer = state.employers.find(employer => employer.id === data)
      state.employerId = employer.id
    },
    removeEmployer (state) {
      state.employerId = 0
    }
  },
  actions: {

  },
  modules: {
    user,
    employer
  }
})

export default store
