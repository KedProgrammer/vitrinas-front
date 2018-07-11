import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import EventBus from './plugins/event-bus'
import VueOffline from 'vue-offline'
import vSelect from 'vue-select'
import * as VueGoogleMaps from 'vue2-google-maps'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Vue2Filters from 'vue2-filters'
import vbclass from 'vue-body-class'
import configService from './settings/api-url'
import VueCollapse from 'vue2-collapse'

import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(EventBus)
Vue.use(VueRouter)
Vue.use(VueOffline)
Vue.use(Vue2Filters)
Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-E1G59dcqv3orfjhQzupr7F1UCodDTh8',
    libraries: 'places'
  }
})
Vue.use(VCalendar)
Vue.use(VueSweetalert2)
Vue.use(VueCollapse)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(vbclass, router)

router.beforeEach((to, from, next) => {
  var userToken = ''

  if (localStorage.getItem('yek') !== null) {
    userToken = localStorage.getItem('yek')
    next()
    console.log('logueado')
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
    console.log('no logueado')
  }
  configService.defaults.headers.common['Authorization'] = userToken
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
