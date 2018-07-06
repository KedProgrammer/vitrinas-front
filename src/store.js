import Vue from 'vue'
import Vuex from 'vuex'

import configService from './settings/api-url.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    university: {
      id: 1
    },
    commerces: {}
  },
  getters: {
  },
  mutations: {
    updateCommerce (state, res) {
      state.commerces = res.data
    }
  },
  actions: {
    updateCommerceAsync (context, payload) {
      return configService(`/central_admin/universities/${context.state.university.id}/commerces`)
        .then(res => {
          context.commit('updateCommerce', res)
          return res
        })
    }
  }

})

export default store
