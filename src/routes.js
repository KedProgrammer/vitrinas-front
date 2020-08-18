import mainOrders from './views/mainOrders.vue'
import Login from './views/login.vue'
import Cost from './views/costos.vue'
import Products from './views/products'
import mainImage from './views/mainImage'
import humanManagement from './views/humanManagement'
import employerCreate from './views/employerCreate'
import employersIndex from './views/employersIndex'
import loanIndex from './views/loanIndex'
import loanShow from './views/loanShow'
import loanCreate from './views/loanCreate'
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
    path: '/loans',
    component: loanIndex,
    name: 'loans'
  },
  {
    path: '/loan-show/:id',
    component: loanShow,
    name: 'loan-show',
  },
  {
    path: '/loan-create',
    component: loanCreate,
    name: 'loan-create',
  },
  {
    path: '/humanManagement',
    component: humanManagement,
    name: 'human-management',
    children: [
      {
        path: 'employer-create',
        component: employerCreate,
        name: 'employer-create',
      },
      {
        path: '',
        component: employersIndex,
        name: 'employer-index',
      }
    ]
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
