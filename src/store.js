import Vue from 'vue'
import Vuex from 'vuex'

import configService from './settings/api-url.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    university: {
      id: 1
    },
    commerces: {},
    commerce: {},
    domiciliary: {},
    domiciliarys: {}
  },
  getters: {
  },
  mutations: {
    updateCommerces (state, res) {
      state.commerces = res.data
    },
    updateCommerce (state, res) {
      state.commerce = res.data
    }
  },
  actions: {
    updateCommercesAsync (context, payload) {
      return configService(`/central_admin/universities/${context.state.university.id}/commerces`)
        .then(res => {
          context.commit('updateCommerces', res)
          return res
        })
    },
    updateCommerceAsync (context, id) {
      return configService(`/normal_user/commerces/${id}`)
        .then(res => {
          context.commit('updateCommerce', res)
          return res
        })
    }
  }

})

export default store
