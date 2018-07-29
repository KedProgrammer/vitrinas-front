<template>
  <div class="view-today">
    <section class="admin-hoy__header">

      <div class="admin-hoy__filtro-titulo">
        <h4>Filters</h4>
      </div>

      <div class="admin-hoy__filtro-asign">
        <div class="admin-hoy__filtro">
          <!-- item filtro -->
          <!-- Agregar la clase activo para marcar el item -->
          <div
            @click="filterOrder('all')"
            :class="{activo: setActive('all')}"
            class="admin-hoy__filtro-item">
            <h4>All</h4>
            <p>({{ allCount }}-{{ outTrackedOrdersCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('vigentes')"
            :class="{activo: setActive('vigentes')}"
            class="admin-hoy__filtro-item">
            <h4>Vigentes</h4>
            <p>({{ vigentCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('estado')"
            :class="{activo: setActive('estado')}"
            class="admin-hoy__filtro-item">
            <h4>Estado int.</h4>
            <p>({{ intermedioCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('recogidos')"
            :class="{activo: setActive('recogidos')}"
            class="admin-hoy__filtro-item">
            <h4>Recogidos</h4>
            <p>({{ recogidosCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('problemas')"
            :class="{activo: setActive('problemas')}"
            class="admin-hoy__filtro-item">
            <h4>Problemas</h4>
            <p>({{ problemasCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('entregados')"
            :class="{activo: setActive('entregados')}"
            class="admin-hoy__filtro-item">
            <h4>Entregados</h4>
            <p>({{ entregadosCount }})</p>
          </div>
          <!-- item filtro -->
          <div
            @click="filterOrder('prime')"
            :class="{activo: setActive('prime')}"
            class="admin-hoy__filtro-item">
            <h4>PRIME</h4>
            <p>({{ primeCount }})</p>
          </div>
        </div>
        <div class="checkout__pago-row">
          <p>Cargar ordenes Automaticamente</p>
          <div class="lista-checkbox2">
            <input
              v-model="autoFetchOrder"
              type="checkbox"
              id="checkout-takeout-ucoins">
            <label
              for="checkout-takeout-ucoins"
              data-checkedsi="Si"
              data-checkedno="No"/>
          </div>
        </div>
      </div>

      <div class="admin-hoy__header-envio">
        <div class="admin-hoy__header-envio-contenedor">
          <!-- Agregar la clase activo para marcar el item -->
          <div
            @click="filterType('delivery')"
            :class='{activo: !isTakeout}'
            class="admin-hoy__header-domicilio ">
            <h4>Domicilios</h4>
            <p>({{ deliveryCount }})</p>
          </div>
          <div
            @click="filterType('takeout')"
            :class='{activo: isTakeout}'
            class="admin-hoy__header-takeout">
            <h4>Take-out</h4>
            <p>({{ takeoutCount }})</p>
          </div>
        </div>
        <router-link
          class="admin-hoy_cerrar"
          :to="{name: 'variables'}">
          Abrir/Cerrar
        </router-link>
      </div>

      <div class="admin-hoy__estadisticas">
        <!-- row -->
        <div class="admin-hoy__estadisticas-row">
          <!-- item -->
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-venta">
            <p>Ventas</p>
            <span>{{ calculateTotal() | currency('$', 0) }}</span>
          </div>
          <!-- item -->
        </div>
        <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-venta">
          <p>Tiempo Promedio de entrega</p>
          <span>{{ averageCompleted }} minutos</span>
        </div>
      </div>

    </section>

    <main class="admin-hoy__main">

      <Menu />

      <article class="admin-hoy__paneles">
        <div class="admin-hoy__panel-contenedor">
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>Pending</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterLeft('hour')"
                  :class="{activo: setLeftActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  @click="filterLeft('time')"
                  :class="{activo: setLeftActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterLeft('place')"
                  :class="{activo: setLeftActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  @click="filterLeft('price')"
                  :class="{activo: setLeftActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div
                v-for="order in pendingOrders"
                :key="order.id"
                class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div
                    @click="toggleDetail(order)"
                    class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>{{ order.commerce.commercial_name }}</h3>
                      <p
                        v-if="!order.is_takeout"
                      >{{ order.address }}</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>{{ order.total | currency('$', 0) }}</h3>
                      <p>
                        <i :class="setIconClass(order.payment_type)"/>
                        {{ order.id }}
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <v-select
                      v-if="!order.is_takeout && order.status !=='order_completed'"
                      :value="setName(order)"
                      label="name"
                      class="search-select"
                      max-height="250px"
                      placeholder="Asignar"
                      :clear-search-on-select="false"
                      :options="runners">
                      <div
                        class="runners__list-item"
                        slot="option"
                        :title="option.name"
                        slot-scope="option">
                        <div
                          @click="asingDeliveryMan(option.id,order,option.first_name,option.last_name)"
                          class="runners__list-name">
                          {{ option.name }}
                        </div>
                        <div class="runners__list-status">
                          <div class="runner__list-available">
                            {{ option.process }} / {{ option.capacity }}
                          </div>
                          <i class="ion-android-arrow-forward" />
                        </div>
                      </div>
                    </v-select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3 class="size">{{ order.status }}</h3>
                  <p>{{ order.cellphone }}</p>
                  <div
                    @click="changeState(order)"
                    class="admin-hoy__estado size">
                    {{ order.status }}
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>{{ setTime(order.created_at) }}</p>
                  <span>({{ order.originalCount }})</span>
                  <p>{{ order.deliveryDiference }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>Out of Track</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterMiddle('hour')"
                  :class="{activo: setMiddleActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  @click="filterMiddle('time')"
                  :class="{activo: setMiddleActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterMiddle('place')"
                  :class="{activo: setMiddleActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <a
                  @click="filterMiddle('price')"
                  :class="{activo: setMiddleActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div
                v-for="order in filteredOutTrackedOrders"
                :key="order.id"
                class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div
                    @click="toggleDetail(order)"
                    class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div class="admin-hoy__nombre-ubicacion">
                      <h3>{{ order.commerce.commercial_name }}</h3>
                      <p
                        v-if="!order.is_takeout"
                      >{{ order.address }}</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3>{{ order.total | currency('$', 0) }}</h3>
                      <p>
                        <i :class="setIconClass(order.payment_type)"/>
                        {{ order.id }}
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <v-select
                      v-if="!order.is_takeout"
                      :value="setName(order)"
                      label="name"
                      class="search-select"
                      max-height="250px"
                      placeholder="Asignar"
                      :clear-search-on-select="false"
                      :options="runners">
                      <div
                        class="runners__list-item"
                        slot="option"
                        :title="option.name"
                        slot-scope="option">
                        <div
                          @click="asingDeliveryMan(option.id,order,option.first_name,option.last_name)"
                          class="runners__list-name">
                          {{ option.name }}
                        </div>
                        <div class="runners__list-status">
                          <div class="runner__list-available">
                            {{ option.process }} / {{ option.capacity }}
                          </div>
                          <i class="ion-android-arrow-forward" />
                        </div>
                      </div>
                    </v-select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3 class="size">{{ order.status }}</h3>
                  <p>{{ order.cellphone }}</p>
                  <div
                    @click="changeState(order)"
                    class="admin-hoy__estado size">
                    {{ order.status }}
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>{{ setTime(order.created_at) }}</p>
                  <span>({{ order.originalCount }})</span>
                  <p>{{ order.deliveryDiference }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- panel -->
          <div class="admin-hoy__panel">
            <div class="admin-hoy__panel-header">
              <h3>{{ selectedFilter }}</h3>
              <!-- menu -->
              <div class="admin-hoy__panel-menu">
                <a
                  @click="filterRight('hour')"
                  :class="{activo: setRightActive('hour') }"
                  class="admin-hoy__panel-menu-item">
                  00:00
                </a>
                <a
                  @click="filterRight('time')"
                  :class="{activo: setRightActive('time') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-time-left"/>
                </a>
                <a
                  @click="filterRight('place')"
                  :class="{activo: setRightActive('place') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-shop"/>
                </a>
                <!-- agregar la clase 'activo' para aplicar estilo -->
                <a
                  @click="filterRight('price')"
                  :class="{activo: setRightActive('price') }"
                  class="admin-hoy__panel-menu-item">
                  <i class="ceu-icon-coin"/>
                </a>
              </div>
              <!--. menu -->
            </div>
            <!--. header panel  -->
            <!-- body panel -->
            <div class="admin-hoy__panel-body">
              <!-- item -->
              <div
                v-for="order in filterOrders"
                :key="order.id"
                class="admin-hoy__panel-item">
                <div class="admin-hoy__nombre">
                  <div class="admin-hoy__ubicacion-precio admin-hoy__triger">
                    <div
                      @click="toggleDetail(order)"
                      class="admin-hoy__nombre-ubicacion">
                      <h3>{{ order.commerce.commercial_name }}</h3>
                      <p
                        v-if="!order.is_takeout"
                      >{{ order.address }}</p>
                    </div>
                    <div class="admin-hoy__precio">
                      <h3> {{ order.total | currency('$', 0) }}</h3>
                      <p>
                        <i :class="setIconClass(order.payment_type)"/>
                        {{ order.id }}
                      </p>
                    </div>
                  </div>
                  <div class="admin-hoy__nombre-row">
                    <v-select
                      v-if="!order.is_takeout && order.status !=='order_completed'"
                      :value="setName(order)"
                      label="name"
                      class="search-select"
                      max-height="250px"
                      placeholder="Asignar"
                      :clear-search-on-select="false"
                      :options="runners">
                      <div
                        class="runners__list-item"
                        slot="option"
                        :title="option.name"
                        slot-scope="option">
                        <div
                          @click="asingDeliveryMan(option.id,order,option.first_name,option.last_name)"
                          class="runners__list-name">
                          {{ option.name }}
                        </div>
                        <div class="runners__list-status">
                          <div class="runner__list-available">
                            {{ option.process }} / {{ option.capacity }}
                          </div>
                          <i class="ion-android-arrow-forward" />
                        </div>
                      </div>
                    </v-select>
                  </div>
                </div>
                <div class="admin-hoy__estado-info">
                  <h3 class="size">{{ order.status }}</h3>
                  <p>{{ order.cellphone }}</p>
                  <div
                    @click="changeState(order)"
                    class="admin-hoy__estado size">
                    {{ order.status }}
                  </div>
                </div>
                <div class="admin-hoy__panel-tiempo">
                  <p>{{ setTime(order.created_at) }}</p>
                  <span>({{ order.originalCount }})</span>
                  <p>{{ order.deliveryDiference }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

    </main>
    <!-- modal detalles -->
    <modal-details
      @order-modal="orderFromModal = $event"
      @close-details="showDetail = $event"
      :show-modal="showDetail"
      :order-summary="orderSummary"
    />
  </div>
</template>

<script>
import configService from '../settings/api-url.js'
import Menu from '../components/layout/Menu'
import ModalDetails from '../components/today/modal-details'
import {stateGroups} from '../stateGroup.js'
import { mapState } from 'vuex'

export default {
  name: 'Today',
  components: {
    Menu,
    ModalDetails
  },
  data () {
    return {
      averageCompleted: 0,
      stateSet: '',
      intervalId: 0,
      autoFetchOrder: false,
      takeoutCount: 0,
      deliveryCount: 0,
      allCount: 0,
      vigentCount: 0,
      intermedioCount: 0,
      recogidosCount: 0,
      entregadosCount: 0,
      problemasCount: 0,
      primeCount: 0,
      outTrackedOrdersCount: 0,
      orderFromModal: {},
      filteredOutTrackedOrders: [],
      outTrackedOrders: [],
      orderSummary: {},
      rightPanelActive: '',
      middlePanelActive: '',
      letfPanelActive: '',
      pendingOrders: [],
      activeFilter: 'all',
      filterOrders: [],
      orders: [],
      selectedFilter: 'All',
      isTakeout: false,
      runnerUser: '',
      runners: [],
      showDetail: false
    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  watch: {
    autoFetchOrder (event, old) {
      if (event) {
        this.intervalId = setInterval(() => {
          this.fetchOrdersAfter()
        }, 5000)
      } else {
        clearInterval(this.intervalId)
      }
    },
    university (value) {
      this.isAllActive = true
      const date = new Date()
      const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      configService(`central_admin/universities/${value.id}/delivery_men?available_only=true`)
        .then(res => {
          console.log(res.data)
          this.runners = res.data.map(runner => {
            const data = {
              name: `${runner.first_name} ${runner.last_name}`,
              first_name: runner.first_name,
              last_name: runner.last_name,
              capacity: runner.max_workload,
              process: 1,
              id: runner.current_shift.id
            }
            return data
          })
        })
        .catch(error => {
          console.log(error)
        })
      configService(`central_admin/universities/${value.id}/orders?date=${data}`)
        .then(response => {
          this.orders = response.data
          this.setOrderCount()
          this.setTrackTime()
          this.setAverage()
          this.setOrdinalOrder(stateGroups.all, 'rightColumn')
          this.setOrdinalOrder(stateGroups.all, 'pending')
          this.setOutTrack()
          this.setCounts()
        })
        .catch(error => {
          console.log(error)
        })
      this.orderSummary = this.orders[0]
    },
    orderFromModal (newOrder, oldOrder) {
      const index = this.orders.findIndex(element => {
        return element.id === newOrder.id
      })
      this.orders.splice(index, 1, newOrder)
      this.setOrderCount()
      this.setTrackTime()
      this.setAverage()
      this.setOrdinalOrder(stateGroups.all, 'rightColumn')
      this.setOrdinalOrder(stateGroups.all, 'pending')
      this.setOutTrack()
      const order = this.orders.find(element => {
        return element.id === newOrder.id
      })
      this.orderSummary = order
      this.setCounts()
    },
    activeFilter (active) {
      console.log(active)
      switch (active) {
        case 'all':
          this.setOrdinalOrder(stateGroups.all, 'rightColumn')
          break
        case 'vigentes':
          this.groupOrders(stateGroups.vigentes, 'rightColumn')
          break
        case 'estado':
          this.groupOrders(stateGroups.intermedio, 'rightColumn')
          break
        case 'recogidos':
          this.setOrdinalOrder(stateGroups.recogidos, 'rightColumn')
          break
        case 'problemas':
          this.setOrdinalOrder(stateGroups.problemas, 'rightColumn')
          break
        case 'entregados':
          this.setOrdinalOrder(stateGroups.entregados, 'rightColumn')
          break
        case 'prime':
          this.setOrdinalOrder(active, 'rightColumn')
          break
        default:
          break
      }
      this.rightPanelActive = ''
      this.middlePanelActive = ''
      this.letfPanelActive = ''
    },
    isTakeout (active) {
      console.log(active)
      switch (this.activeFilter) {
        case 'all':
          this.groupOrders(stateGroups.all)
          break
        case 'vigentes':
          this.groupOrders(stateGroups.vigentes)
          break
        case 'estado':
          this.groupOrders(stateGroups.intermedio)
          break
        case 'recogidos':
          this.groupOrders(stateGroups.recogidos)
          break
        case 'problemas':
          this.groupOrders(stateGroups.problemas)
          break
        case 'entregados':
          this.groupOrders(stateGroups.entregados)
          break
        case 'prime':
          this.groupOrders(this.activeFilter)
          break
        default:
          break
      }
      this.rightPanelActive = ''
      this.middlePanelActive = ''
      this.letfPanelActive = ''
      this.filterOutTrackedOrders()
    }
  },
  methods: {
    setAverage () {
      let minutes = 0
      let count = 0
      console.log(this.orders)
      this.orders.forEach(element => {
        let timeCompleted = ''
        let timeCreated = ''
        if (element.status === 'order_completed') {
          count++
          timeCreated = new Date(element.created_at)
          element.logs.forEach(element => {
            if (element.to === 'order_completed') {
              timeCompleted = new Date(element.created_at)
            }
          })
          console.log(this.getDifference(timeCompleted, timeCreated))
          minutes = minutes + this.getDifference(timeCompleted, timeCreated)
        }
      })
      if (count === 0) {
        this.averageCompleted = 0
      } else {
        this.averageCompleted = Math.round(minutes / count)
      }
      console.log(minutes, count)
    },
    fetchOrdersAfter () {
      const date = new Date()
      const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      configService(`central_admin/universities/${this.university.id}/orders?date=${data}`)
        .then(response => {
          this.orders = response.data
          this.setOrderCount()
          this.setTrackTime()
          this.afterFetch(this.activeFilter)
          this.setOrdinalOrder(stateGroups.all, 'pending')
          this.setOutTrack()
          this.setCounts()
          console.log(this.filterOrders, this.pendingOrders, this.outTrackedOrders)
        })
        .catch(error => {
          console.log(error)
        })
    },
    afterFetch (active) {
      console.log(active)
      switch (active) {
        case 'all':
          this.setOrdinalOrder(stateGroups.all, 'rightColumn')
          break
        case 'vigentes':
          this.groupOrders(stateGroups.vigentes, 'rightColumn')
          break
        case 'estado':
          this.groupOrders(stateGroups.intermedio, 'rightColumn')
          break
        case 'recogidos':
          this.setOrdinalOrder(stateGroups.recogidos, 'rightColumn')
          break
        case 'problemas':
          this.setOrdinalOrder(stateGroups.problemas, 'rightColumn')
          break
        case 'entregados':
          this.setOrdinalOrder(stateGroups.entregados, 'rightColumn')
          break
        case 'prime':
          this.setOrdinalOrder(active, 'rightColumn')
          break
        default:
          break
      }
    },
    fetchOrders () {
      const date = new Date()
      const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      configService(`central_admin/universities/${this.university.id}/orders?date=${data}`)
        .then(response => {
          this.orders = response.data
          console.log(response.data)
          this.setOrderCount()
          this.setTrackTime()
          this.setAverage()
          this.setOrdinalOrder(stateGroups.all, 'rightColumn')
          this.setOrdinalOrder(stateGroups.all, 'pending')
          this.setOutTrack()
          this.setCounts()
          console.log(this.filterOrders, this.pendingOrders, this.outTrackedOrders)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setIconClass (type) {
      switch (type) {
        case 'ucoins':
          return 'ceu-icon-ucoins'
        case 'efectivo':
          return 'ceu-icon-coin'
        case 'credit_card':
          return 'ceu-icon-credit-card'
        case 'datafono':
          return 'ceu-icon-payment-terminal'
        case 'nequi':
          return 'ceu-icon-coin'
        default:
          break
      }
    },
    calculateTotal () {
      let result = 0
      this.orders.forEach(element => {
        if (element.status === 'order_completed') {
          console.log(element.status)
          result = result + element.json_products.reduce((anterior, actual) => {
            if (actual.category_type !== 'mercadillo') {
              return anterior + parseInt(actual.total_price) * actual.count
            }
          }, 0)
        }
      })
      return result
    },
    setStatusToChange (order) {
      switch (order.status) {
        case 'waiting_for_external_payment':
          return 'send_to_restaurant'
        case 'waiting_restaurant_confirmation':
          return 'accept_order'
        case 'preparing_order':
          return 'dispatch_order'
        case 'waiting_pickup_client':
          return 'complete_order'
        case 'waiting_pickup_deliveryman':
          return 'pickup_order'
        case 'delivering_order':
          return 'complete_order'
        case 'troubleshooting_restaurant':
          return 'complete_order'
        case 'troubleshooting_deliveryman':
          return 'pickup_order'
        case 'troubleshooting_hand_off':
          return 'complete_order'
        default:
          break
      }
    },
    changeState (order) {
      console.log(order)
      if (order.status === 'waiting_pickup_deliveryman' &&
          !order.delivery.delivery_man) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Debes asignar un domiciliario'
        })
        return
      }
      const method = this.setStatusToChange(order)
      const index = this.orders.findIndex(element => {
        return element.id === order.id
      })
      const data = {
        commerce_id: order.commerce.id,
        comment: 'cualquier problema'
      }
      configService.post(`central_admin/orders/${order.id}/${method}`, data)
        .then(response => {
          console.log(response.data)
          const newOrder = response.data
          this.orders.splice(index, 1, newOrder)
          this.setOrderCount()
          this.setAverage()
          this.setTrackTime()
          this.setOrdinalOrder(stateGroups.all, 'rightColumn')
          this.setOrdinalOrder(stateGroups.all, 'pending')
          this.setOutTrack()
          const summary = this.orders.find(element => {
            return element.id === newOrder.id
          })
          this.calculateStateButtons(summary)
          this.setCounts()
        })
        .catch(error => {
          console.log(error)
        })
    },
    setName (order) {
      if (order.delivery.delivery_man) {
        return `${order.delivery.delivery_man.first_name} ${order.delivery.delivery_man.last_name}`
      } else {
        return 'Sin Asignar'
      }
    },
    asingDeliveryMan (id, order, firstName, lastName) {
      console.log(id, order.delivery.id)
      const data = {
        delivery: {
          shift_id: id
        }
      }
      configService.put(`central_admin/universities/${this.university.id}/deliveries/${order.delivery.id}`, data)
        .then(response => {
          if (order.delivery.delivery_man) {
            order.delivery.delivery_man = {...order.delivery.delivery_man,
              first_name: firstName,
              last_name: lastName }
          } else {
            order.delivery.delivery_man = {
              first_name: firstName,
              last_name: lastName
            }
          }
          this.calculateStateButtons(order)
          this.setOrdinalOrder(stateGroups.all, 'pending')
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterRight (type) {
      this.rightPanelActive = type
      this.sortBy('right', type)
    },
    setRightActive (type) {
      if (this.rightPanelActive === type) {
        return true
      }
    },
    setMiddleActive (type) {
      if (this.middlePanelActive === type) {
        return true
      }
    },
    filterMiddle (type) {
      this.middlePanelActive = type
      this.sortBy('middle', type)
    },
    setLeftActive (type) {
      if (this.letfPanelActive === type) {
        return true
      }
    },
    filterLeft (type) {
      this.letfPanelActive = type
      this.sortBy('left', type)
    },
    setActive (type) {
      if (this.activeFilter === type) {
        return true
      }
    },
    sortBy (side, type) {
      switch (type) {
        case 'time':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              return new Date(b.trackTime) - new Date(a.trackTime)
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              return new Date(b.trackTime) - new Date(a.trackTime)
            })
          }
          if (side === 'middle') {
            this.filterOutTrackedOrders = this.filterOutTrackedOrders.sort((a, b) => {
              return new Date(b.trackTime) - new Date(a.trackTime)
            })
          }
          break
        case 'hour':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at)
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at)
            })
          }
          if (side === 'middle') {
            this.filterOutTrackedOrders = this.filterOutTrackedOrders.sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at)
            })
          }
          break
        case 'price':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              return a.total - b.total
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              return a.total - b.total
            })
          }
          if (side === 'middle') {
            this.filteredOutTrackedOrders = this.filteredOutTrackedOrders.sort((a, b) => {
              return a.total - b.total
            })
          }
          break
        case 'place':
          if (side === 'left') {
            this.pendingOrders = this.pendingOrders.sort((a, b) => {
              if (a.address > b.address) {
                return 1
              }
            })
          }

          if (side === 'right') {
            this.filterOrders = this.filterOrders.sort((a, b) => {
              if (a.address > b.address) {
                return 1
              }
            })
          }
          if (side === 'middle') {
            this.filteredOutTrackedOrders = this.filteredOutTrackedOrders.sort((a, b) => {
              if (a.address > b.address) {
                return 1
              }
            })
          }
          break
        default:
          break
      }
    },
    setOrderCount () {
      console.log(this.orders)
      this.orders = this.orders.map((element0, index) => {
        let auxiliar = []
        element0 = {...element0, originalCount: element0.json_products.length}
        element0.json_products.forEach(element => {
          const repeated = auxiliar.findIndex(element1 => {
            return element1.total_price === element.total_price && element1.name === element.name
          })
          if (repeated === -1) {
            auxiliar.push({...element, count: 1})
          } else {
            auxiliar[repeated].count++
          }
        })
        element0.json_products = auxiliar
        return element0
      })
    },
    filterType (type) {
      if (type === 'takeout') {
        this.isTakeout = true
      } else {
        this.isTakeout = false
      }

      this.filterOrder(this.activeFilter)
    },
    filterOrder (type) {
      this.selectedFilter = type
      this.activeFilter = type
    },
    calculateStateButtons (order) {
      let buttons = []
      switch (order.status) {
        case 'waiting_for_external_payment':
          buttons = ['send_to_restaurant', 'invalid_payment']
          break
        case 'waiting_restaurant_confirmation':
          buttons = ['accept_order', 'reject_order']
          break
        case 'preparing_order':
          buttons = ['dispatch_order']
          break
        case 'waiting_pickup_client':
          buttons = ['complete_order']
          break
        case 'waiting_pickup_deliveryman':
          buttons = ['pickup_order']
          break
        case 'delivering_order':
          buttons = ['complete_order', 'problem_with_delivery', 'problem_with_hand_off']
          break
        case 'troubleshooting_deliveryman':
          buttons = ['pickup_order', '']
          break
        case 'troubleshooting_hand_off':
          buttons = ['complete_order', 'cancel_order']
          break
        case 'troubleshooting_restaurant':
          buttons = ['accept_order', 'cancel_order', 'complete_order']
          break
        default:
          break
      }
      this.orderSummary = {...order, buttons: buttons}
      console.log(this.orderSummary)
    },
    toggleDetail (order) {
      this.showDetail = true
      this.calculateStateButtons(order)
    },
    filterOutTrackedOrders () {
      this.filteredOutTrackedOrders = this.outTrackedOrders.filter(element => {
        if (this.isTakeout) {
          if (element.is_takeout) {
            return true
          }
        } else {
          if (element.is_takeout === false) {
            return true
          }
        }
      })
      console.log(this.outTrackedOrders)
    },
    setOrdinalOrder (groupFilter, filterType) {
      let auxiliarOrders = []
      if (groupFilter === 'prime') {
        auxiliarOrders = this.orders.filter(element => {
          if (this.isTakeout) {
            if (element.user_prime && element.is_takeout) {
              return true
            }
          } else {
            if (element.user_prime && !element.is_takeout) {
              return true
            }
          }
        })
      } else {
        auxiliarOrders = this.orders.filter(element => {
          if (groupFilter.includes(element.status) && (this.isTakeout ? element.is_takeout : !element.is_takeout)) {
            return true
          }
        })
      }
      switch (filterType) {
        case 'rightColumn':
          this.filterOrders = [...auxiliarOrders]
          break
        case 'pending':
          this.pendingOrders = this.orders.filter(element => {
            if (element.id === 284) {
              console.log(element)
            }
            if (!element.is_takeout && !element.delivery.delivery_man && element.status !== 'order_completed') {
              return true
            }
          })
          break
        default:
          break
      }
    },
    groupOrders (groupFilter) {
      this.setOrdinalOrder(groupFilter, 'rightColumn')
      this.setOrdinalOrder(stateGroups.all, 'pending')
    },
    setTime (date) {
      const dateFormatted = new Date(date)
      let minutes = dateFormatted.getMinutes()
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      const hour = dateFormatted.getHours()
      const createdTime = hour > 12 ? `${(hour - 12)}:${minutes}pm` : `${(hour)}:${minutes}am`
      return createdTime
    },
    setTrackTime () {
      this.orders = this.orders.map(element => {
        let trackTime = new Date(element.programmed_for)
        let deliveryDiference = this.getDifference(trackTime, new Date())
        if (element.status === 'order_completed') {
          deliveryDiference = ''
        }
        const newElement = {...element, trackTime, deliveryDiference}
        return newElement
      })
    },
    getDifference (firstDate, secondDate) {
      let diff = (firstDate.getTime() - secondDate.getTime()) / 1000
      diff /= 60
      return Math.round(diff)
    },
    setOutTrack () {
      console.log(this.orders)
      const solicited = this.orders.filter(element => {
        const creationDifference = this.getDifference(new Date(), new Date(element.created_at))
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (stateGroups.solicitado.includes(element.status) && (creationDifference > 5 || deliveryDiference < 20) && element.status !== 'order_completed') {
          return true
        }
      })

      const accepted = this.orders.filter(element => {
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (['preparing_order'].includes(element.status) && deliveryDiference < 15 && element.status !== 'order_completed') {
          return true
        }
      })

      const alreadyRestaurant = this.orders.filter(element => {
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (['waiting_pickup_client', 'waiting_pickup_deliveryman'].includes(element.status) && deliveryDiference < 10 && element.status !== 'order_completed') {
          return true
        }
      })
      const picked = this.orders.filter(element => {
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (['delivering_order'].includes(element.status) && deliveryDiference < 20 && element.status !== 'order_completed') {
          return true
        }
      })
      const outTracked = this.orders.filter(element => {
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (stateGroups.allNoCompleted.includes(element.status) && deliveryDiference < 0 && element.status !== 'order_completed') {
          return true
        }
      })

      const noAsgined = this.orders.filter(element => {
        const deliveryDiference = this.getDifference(new Date(element.trackTime), new Date())
        if (!element.is_takeout && !element.delivery.delivery_man && deliveryDiference < 20 && element.status !== 'order_completed') {
          return true
        }
      })
      const problems = this.orders.filter(element => {
        if (stateGroups.problemas.includes(element.status) && element.status !== 'order_completed') {
          return true
        }
      })

      const tracked = [...solicited, ...accepted, ...picked, ...outTracked, ...noAsgined, ...problems, ...alreadyRestaurant]
      this.outTrackedOrders = []
      tracked.forEach(element => {
        const index = this.outTrackedOrders.findIndex(element1 => {
          return element1 === element
        })

        if (index === -1) {
          this.outTrackedOrders.push(element)
        }
      })
      this.filterOutTrackedOrders()
    },
    setCounts () {
      this.allCount = this.orders.length
      this.vigentCount = this.orders.filter(element => {
        return stateGroups.vigentes.includes(element.status)
      }).length
      this.intermedioCount = this.orders.filter(element => {
        return stateGroups.intermedio.includes(element.status)
      }).length
      this.recogidosCount = this.orders.filter(element => {
        return stateGroups.recogidos.includes(element.status)
      }).length
      this.entregadosCount = this.orders.filter(element => {
        return stateGroups.entregados.includes(element.status)
      }).length
      this.problemasCount = this.orders.filter(element => {
        return stateGroups.problemas.includes(element.status)
      }).length
      this.primeCount = this.orders.filter(element => {
        return element.user_prime
      }).length
      this.takeoutCount = this.orders.filter(element => {
        return element.is_takeout
      }).length
      this.deliveryCount = this.orders.filter(element => {
        return !element.is_takeout
      }).length
      this.outTrackedOrdersCount = this.outTrackedOrders.length
    }
  },
  created () {
    this.isAllActive = true
    configService(`central_admin/universities/${this.university.id}/delivery_men?available_only=true`)
      .then(res => {
        console.log(res.data)
        this.runners = res.data.map(runner => {
          const data = {
            name: `${runner.first_name} ${runner.last_name}`,
            first_name: runner.first_name,
            last_name: runner.last_name,
            capacity: runner.max_workload,
            process: 1,
            id: runner.current_shift.id
          }
          return data
        })
        console.log(this.runners)
      })
      .catch(error => {
        console.log(error)
      })
    this.fetchOrders()
    this.orderSummary = this.orders[0]
  }
}
</script>

<style>
.size {
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    max-width: 100px;
}
</style>
