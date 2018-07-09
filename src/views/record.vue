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
          <strong>Pedido Del:</strong>
          <span class="admin-resumen__fecha-desde"/>
          <strong>Al:</strong>
          <span class="admin-resumen__fecha-hasta"/>
        </p>

        <div class="admin-resumen__lista">
          <!-- ordenar por  -->
          <div class="admin-resumen__ordenar">
            <div class="admin-resumen__ordernar-titulo">
              Sort
            </div>
            <!-- agregar la clase 'activo' para indicar que se esta ordenando por ese item-->
            <div class="admin-resumen__ordernar-item activo">
              Fecha
              <i class="ion-ios-arrow-down"/>
            </div>
            <div class="admin-resumen__ordernar-item">
              ID
            </div>
            <div class="admin-resumen__ordernar-item">
              Estado
            </div>
            <div class="admin-resumen__ordernar-item">
              Monto
            </div>
          </div>
          <div class="admin-resumen__lista-contenedor">
            <!-- item -->
            <!-- 'admin-resumen__triger' clase que abre el modal -->
            <div
              v-for="order in orders"
              :key="order.id"
              @click="toggleModalDetails"
              class="admin-resumen__lista-item">
              <!-- datos -->
              <div class="admin-resumen__lista-datos-id">
                <div class="admin-resumen__lista-id">
                  ID <strong>{{order.id}}</strong>
                </div>
                <div class="admin-resumen__lista-fecha">
                  {{setTime(order.created_at)}}
                </div>
                <div class="admin-resumen__lista-hora">
                  Para la {{ setTime(order.trackTime) }}
                </div>
                <div class="admin-resumen__lista-estado">
                  ({{order.status}})
                </div>
                <div class="admin-resumen__lista-tiempo">
                  32 minutos
                </div>
              </div>
              <!-- datos -->
              <div class="admin-resumen__lista-lista-datos-total">
                <div class="admin-resumen__lista-cliente-restaurante">
                  <p><strong>Restaurante:</strong> {{order.commerce.commercial_name}}</p>
                  <p><strong>Cliente</strong> {{order.campus_email}}</p>
                </div>
                <div class="admin-resumen__lista-total">
                  TOTAL COP <strong>{{order.total}}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </article>

    <!-- modal -->
    <modal-details
      @event-toggle-modal="toggleModalDetails"
      :toggle-modal="showModalDetails"/>
  </main>
</template>

<script>
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
        start: new Date(2018, 7, 2),
        end: new Date(2018, 7, 10)
      },
      showModalDetails: false
    }
  },
  methods: {
    setTime (date) {
      const dateFormatted = new Date(date)
      let minutes = dateFormatted.getMinutes()
      if (minutes < 10){
        minutes = `0${minutes}`
      }
      const hour = dateFormatted.getHours()
      const createdTime = hour > 12 ? `${(hour - 12)}:${minutes}pm` : `${(hour)}:${minutes}am`
      return createdTime
    },
    toggleModalDetails () {
      this.showModalDetails = !this.showModalDetails
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
     setTrackTime() {
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
  created (){
    const date = new Date()
    const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
     configService(`central_admin/universities/2/orders?date=${data}`)
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
