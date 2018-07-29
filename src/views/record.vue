<template>
  <main class="admin-resumen__main">

    <Menu />

    <article class="admin-resumen__paneles">
      <section class="admin-resumen__fecha-totales">

        <div class="admin-resumen__calendario">
          <v-date-picker
            mode='range'
            is-inline
            :show-caps="true"
            :theme-styles='themeStyles'
            v-model='myRange'
            :show-popove='false'
            tint-color="#9013fe"
            :attributes='attrs' />
        </div>

      </section>
      <!-- tabla resumen -->
      <section class="admin-resumen__tabla-resumen">

        <p class="admin-resumen__fecha-pedido">
          <strong>Pedido Del: {{ start }}</strong>
          <span class="admin-resumen__fecha-desde"/>
          <strong> Al:  {{ end }}</strong>
          <span class="admin-resumen__fecha-hasta"/>
        </p>

        <div class="admin-resumen__lista">
          <!-- ordenar por  -->
          <div class="admin-resumen__ordenar">
            <div class="admin-resumen__ordernar-titulo">
              Sort
            </div>
            <!-- agregar la clase 'activo' para indicar que se esta ordenando por ese item-->
            <div
              @click="setActive('date')"
              :class="{activo: evaluateActive('date')}"
              class="admin-resumen__ordernar-item">
              Fecha
              <i class="ion-ios-arrow-down"/>
            </div>
            <div
              :class="{activo: evaluateActive('id')}"
              @click="setActive('id')"
              class="admin-resumen__ordernar-item">
              ID
            </div>
            <div
              :class="{activo: evaluateActive('state')}"
              @click="setActive('state')"
              class="admin-resumen__ordernar-item">
              Estado
            </div>
            <div
              :class="{activo: evaluateActive('price')}"
              @click="setActive('price')"
              class="admin-resumen__ordernar-item">
              Monto
            </div>
          </div>
          <div class="admin-resumen__lista-contenedor">
            <!-- item -->
            <!-- 'admin-resumen__triger' clase que abre el modal -->
            <div
              v-for="order in orders"
              :key="order.id"
              @click="toggleModalDetails(order)"
              class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>{{ order.id }}</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  {{ setDate(order.created_at) }}
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la {{ setTime(order.trackTime) }}
                </div>
                <div class="admin-resumen__lista-estado">
                  ({{ order.status }})
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p
                    v-if="order"
                  ><strong>Restaurante:</strong> {{ order.commerce.commercial_name }}</p>
                  <p><strong>Cliente</strong> {{ order.campus_email }}</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>{{ order.total | currency('$', 0) }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </article>

    <!-- modal -->
    <modal-details
      @order-modal="orderFromModal = $event"
      @close-details="showModalDetails = $event"
      @event-toggle-modal="toggleModalDetails"
      :toggle-modal="showModalDetails"
      :order-summary="orderSummary"
      :set-time="setTime"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import configService from '../settings/api-url.js'
import Menu from '../components/layout/Menu'
import ModalDetails from '../components/record/modalDetails'
export default {
  name: 'History',
  components: {
    Menu,
    ModalDetails
  },
  data () {
    return {
      orderFromModal: {},
      orderSummary: {},
      activeFilter: '',
      start: '',
      end: '',
      orders: [],
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080'
          },
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date(2018, 0, 1)
        }
      ],
      themeStyles: {
        wrapper: {
          backgroundColor: '#fff',
          borderRadius: '6px',
          border: '1px solid #e5edef'
        },
        weekdayHorizontalDivider: {
          borderBottom: 'solid #000 1px'
        },
        weekdaysHorizontalDivider: {
          borderBottom: 'solid #9013fe 1px',
          width: '90%'
        },
        weekdays: {
          padding: `8px`,
          color: '#9013fe'
        },
        dayContent: {
          borderRadio: '50%'
        }
      },
      myRange: {
        start: new Date(2018, 6, 9),
        end: new Date(2018, 6, 10)
      },
      showModalDetails: false
    }
  },
  watch: {
    university (value) {
      const date = new Date()
      const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      configService(`central_admin/universities/${value.id}/orders?date=${data}`)
        .then(response => {
          this.orders = response.data
          this.setOrderCount()
          this.setTrackTime()
          console.log(this.orders)
        })
        .catch(error => {
          console.log(error)
        })
    },
    orderFromModal (newOrder, oldOrder) {
      console.log(newOrder)
      const index = this.orders.findIndex(element => {
        return element.id === newOrder.id
      })
      this.orders.splice(index, 1, newOrder)
      this.orderSummary = newOrder
    },
    myRange (value) {
      console.log(value)
      const startDate = new Date(value.start)
      const endDate = new Date(value.end)
      const dataStart = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
      const dataEnd = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
      this.start = dataStart
      this.end = dataEnd
      if (dataStart === dataEnd) {
        console.log('hola')
        const date = new Date(value.start)
        const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        configService(`central_admin/universities/${this.university.id}/orders?date=${data}`)
          .then(response => {
            this.orders = response.data
            this.setOrderCount()
            this.setTrackTime()
            console.log(this.orders)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        configService(`central_admin/universities/${this.university.id}/orders?start_date=${dataStart}&end_date=${dataEnd}`)
          .then(response => {
            this.orders = response.data
            console.log(this.orders)
            this.setOrderCount()
            this.setTrackTime()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  methods: {
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
          buttons = ['complete_order', 'reject_order']
          break
        case 'waiting_pickup_deliveryman':
          buttons = ['pickup_order']
          break
        case 'delivering_order':
          buttons = ['complete_order', 'problem_with_delivery', 'problem_with_hand_off']
          break
        case 'troubleshooting_deliveryman':
          buttons = ['pickup_order', 'cancel_order']
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
    sortBy (type) {
      switch (type) {
        case 'id':
          this.orders = this.orders.sort((a, b) => {
            return b.id - a.id
          })
          break
        case 'price':
          this.orders = this.orders.sort((a, b) => {
            return b.total - a.total
          })
          break
        case 'state':
          this.orders = this.orders.sort((a, b) => {
            if (a.status > b.status) {
              return 1
            }
            if (a.status < b.status) {
              return -1
            }
          })
          break
        case 'date':
          this.orders = this.orders.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at)
          })
          break
        default:
          break
      }
    },
    evaluateActive (filter) {
      if (this.activeFilter === filter) {
        return true
      }
    },
    setActive (filter) {
      this.activeFilter = filter
      this.sortBy(filter)
    },
    setDate (date) {
      const data = new Date(date)
      return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`
    },
    setRange () {
      console.log(this.myRange)
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
    toggleModalDetails (order) {
      this.showModalDetails = true
      this.calculateStateButtons(order)
    },
    setOrderCount () {
      this.orders = this.orders.map((element, index) => {
        let auxiliar = []
        element.json_products.forEach(element => {
          const repeated = auxiliar.findIndex(element1 => {
            return element1.total_price === element.total_price && element1.name === element.name
          })
          if (repeated === -1) {
            auxiliar.push({...element, count: 1})
          } else {
            auxiliar[0].count++
          }
        })
        element.json_products = auxiliar
        return element
      })
    },
    setTrackTime () {
      this.orders = this.orders.map(element => {
        const createdTime = new Date(element.created_at)
        const trackDeliveryMinutes = parseInt(element.commerce.avg_delivery_time)
        const trackPreparationMinutes = parseInt(element.commerce.avg_preparation_time)
        const trackTime = new Date(createdTime.getFullYear(), createdTime.getMonth(),
          createdTime.getDate(), createdTime.getHours(), createdTime.getMinutes() + trackDeliveryMinutes + trackPreparationMinutes)
        const newElement = {...element, trackTime: trackTime}
        return newElement
      })
    }
  },
  created () {
    const date = new Date()
    const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    configService(`central_admin/universities/${this.university.id}/orders?date=${data}`)
      .then(response => {
        this.orders = response.data
        this.setOrderCount()
        this.setTrackTime()
        console.log(this.orders)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
