import mainOrders from './views/mainOrders.vue'
import Login from './views/login.vue'
import Cost from './views/costos.vue'
import Products from './views/products'
import mainImage from './views/mainImage'
import humanManagement from './views/humanManagement'
import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/',
    component: mainImage
  },
  {
    path: '/products',
    component: Products,
    name: 'products'
  },
  {
    path: '/costos',
    component: Cost,
    name: 'costs'
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
    path: '/humanManagement',
    component: humanManagement,
    name: 'human-management'
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
