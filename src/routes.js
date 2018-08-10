import Today from './views/today.vue'
import Restaurant from './views/restaurant.vue'
import Record from './views/record.vue'
import Team from './views/team.vue'
import Variables from './views/variables.vue'
import Addons from './views/addons.vue'
import ModifierGroup from './views/modifier-group.vue'
import Login from './views/login.vue'
import Ads from './views/ads.vue'
import Cupons from './views/cupons.vue'
import Error404 from './views/error404.vue'

const routes = [
  {
    path: '/',
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
    path: '/equipo',
    component: Team,
    name: 'team'
  },
  {
    path: '/variables',
    component: Variables,
    name: 'variables'
  },
  {
    path: '/adicionales',
    component: Addons,
    name: 'addons'
  },
  {
    path: '/grupo-modificador',
    component: ModifierGroup,
    name: 'modifier-group'
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { bodyClass: 'login' }
  },
  {
    path: '/ads',
    component: Ads,
    name: 'ads'
  },
  {
    path: '/cupons',
    component: Cupons,
    name: 'cupons'
  },
  {
    path: '/*',
    component: Error404,
    name: 'error-404'
  }
]

export default routes
