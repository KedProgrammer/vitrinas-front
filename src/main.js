import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueOffline from 'vue-offline'
import vSelect from 'vue-select'
import * as VueGoogleMaps from 'vue2-google-maps'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueSweetalert2 from 'vue-sweetalert2'

import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueOffline)
Vue.component('v-select', vSelect)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-E1G59dcqv3orfjhQzupr7F1UCodDTh8',
    libraries: 'places'
  }
})
Vue.use(VCalendar)
Vue.use(VueSweetalert2)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
