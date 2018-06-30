import Today from './views/today.vue'
import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/hoy',
    component: Today,
    name: 'today'
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
