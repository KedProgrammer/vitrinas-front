import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
