import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'
import employer from './modules/employer/employer'

// import configService from './settings/api-url.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    modalOrder: {},
    employers: null,
    employerId: 0,
    loans: null
  },
  getters: {
    getEmployer (state) {
      return state.employers.find(employer => employer.id === state.employerId)
    },
    getLoan: (state) => (id) =>  {
      return state.loans.find(loan => {
        return loan.id == id
      })
    },
    getEmployersNames (state) {
      return state.employers.map(employer => { 
        return { value: employer.id, label: employer.name }
      })
    }
  },
  mutations: {
    setLoans (state, data) {
      state.loans = data
    },
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
    },
    setLoan (state, data) {
      state.loans.push(data)
    },
  },
  actions: {

  },
  modules: {
    user,
    employer
  }
})

export default store
