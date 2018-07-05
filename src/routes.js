import Today from './views/today.vue'
import Restaurant from './views/restaurant.vue'
import Record from './views/record.vue'
import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/hoy',
    component: Today,
    name: 'today'
  },
  {
    path: '/restaurante',
    component: Restaurant,
    name: 'restaurant'
  },
  {
    path: '/historial',
    component: Record,
    name: 'record'
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
