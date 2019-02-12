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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueFilter from 'vue-filter'
import store from './store/store'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import  messages  from './statesIn'
import Tooltip from 'vue-directive-tooltip'
import XLSX from 'xlsx';

Vue.config.productionTip = false

Vue.use(EventBus)
Vue.use(VueRouter)
Vue.use(VueOffline)
Vue.use(Vue2Filters)
Vue.use(VueFilter)
Vue.use(VueI18n)
Vue.use(Tooltip)
Vue.use(XLSX)
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'es', // set locale
  messages, // set locale messages
})

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
Vue.component('datetime', Datetime)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(vbclass, router)

router.beforeEach((to, from, next) => {
  var userToken = ''

  if (localStorage.getItem('user') !== null) {
    userToken = JSON.parse(localStorage.getItem('user')).auth_token
    next()
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
  store,
  i18n
}).$mount('#app')
