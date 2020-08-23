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
    employerId: 0,
    loans: [],
    filterByEmployer: false
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
    getLoans (state) {
      return state.loans.filter(loan => {
         if (state.filterByEmployer) return loan.employee.id == state.employerId
         else return loan
      })
    },
    getEmployersNames (state) {
      return state.employers.map(employer => { 
        return { value: employer.id, label: employer.name }
      })
    },
    employersCount (state) {
      return state.employers ? state.employers.length : 0
    }
  },
  mutations: {
    setFilterByEmployer (state, data) {
      state.filterByEmployer = data
    },
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
    addEmployer (state, data) {
      state.employers.push(data)
    },
    updateEmployer (state, data) {
      let index = state.employers.map(employer => employer.id).indexOf(data.id)
      state.employers.splice(index, 1, data)
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
