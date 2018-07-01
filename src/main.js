import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueOffline from 'vue-offline'
import vSelect from 'vue-select'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueOffline)
Vue.component('v-select', vSelect)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
