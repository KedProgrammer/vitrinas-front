import mainOrders from './views/mainOrders.vue'
import Login from './views/login.vue'

import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/',
    component: mainOrders
  },
  {
    path: '/orders',
    component: mainOrders,
    name: 'orders'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
