<template>
  <main class="main-order">
    <!-- <header class="restaurante-user__header">

      <div class="admin__route-logo">
        <img

          class="restaurante-user__logo"
          alt="logo morado v3 comida en la u">

        <div class="admin__route-current">
          Pedidos de hoy
        </div>
      </div>

      <div class="restaurante-user__header-titulo">
        <p>Conexión a internet</p>

        <span class="admin__estado-conexion activo">
          Conectado
        </span>
      </div>

      <div class="restaurante-user__avatar">
        <img
          src="../assets/images/perfil/perfil-mini.jpg"
          alt="">
      </div>

    </header> -->

    <section class="admin-hoy__header">

      <div class="admin-hoy__filtro-titulo">
        <h4>Filters</h4>
      </div>

      <div class="admin-hoy__filtro-asign">
        <div class="admin-hoy__filtro">
          <!-- item filtro -->
          <!-- Agregar la clase activo para marcar el item -->
          <div class="admin-hoy__filtro-item ">
            <h4>En proceso</h4>
            <p>{{ inProcessCount }} </p>
          </div>
          <!-- item filtro -->
          <div class="admin-hoy__filtro-item">
            <h4>Terminados</h4>
            <p>{{ finishedCount }}</p>
          </div>
          <div class="admin-hoy__filtro-item">
            <h4>Entregados</h4>
            <p>{{ deliveredCount }}</p>
          </div>
          <div
            @click="changeFilter('almacen')"
            class="admin-hoy__filtro-item"
            :class="{activo: activeFilter === 'almacen'}">
            <h4>Almacén</h4>
          </div>
          <div
            @click="changeFilter('produccion')"
            class="admin-hoy__filtro-item"
            :class="{activo: activeFilter === 'produccion'}">
            <h4>Producción</h4>
          </div>
        </div>
        <div class="search-order">
          <div>
            <form @submit.prevent="searchOrder">
              <input
                type="text"
                v-model="orderNumber"
                placeholder="buscar orden" >
            </form>
          </div>
          <div>
            <v-select
              :options="searchOptions"
              placeholder="Buscar por"
              class="custom-select1"
              v-model="searchOption"
            />
          </div>
        </div>
      </div>

      <div class="admin-hoy__estadisticas">
        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-venta">
            <p>Ventas</p>
            <span>$2’300.540</span>
          </div>
          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-ocupation">
            <p>Ocupation</p>
            <span>70%</span>
          </div>
        </div> -->
        <button
          @click="importFile"
          class="new-order">
          Exportar
        </button>
        <button
          v-if="user.user.type === 'AdminUser'"
          @click="openNew = true"
          class="new-order">
          Nueva Orden
        </button>
        <button
          @click="logout"
          class="new-order">
          Salir
        </button>

        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-lost">
            <p>Lost</p>
            <span>$20.450</span>
          </div>

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-sad">
            <p>Sad</p>
            <span>15% (7)</span>
          </div>
        </div> -->

        <!-- row -->
        <!-- <div class="admin-hoy__estadisticas-row">

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-avtime">
            <p>Av. Time</p>
            <span>26 min</span>
          </div>

          <div class="admin-hoy__estadisticas-item admin-hoy__estadisticas-mad">
            <p>Mad</p>
            <span> 4% (2)</span>
          </div>
        </div> -->

      </div>

    </section>

    <main class="admin-hoy__main">
      <section class="main-items">
        <article class="main-dater">
          <v-date-picker
            mode='range'
            is-inline
            :show-caps="true"
            :theme-styles='themeStyles'
            v-model='searchByRange'
            :show-popove='false'
            tint-color="#9013fe"
            :attributes='attrs' />
        </article>
        <article class="admin-hoy__paneles">
          <div class="admin-hoy__panel-contenedor">
            <!-- panel -->
            <orders-box
              type="process"
              :orders="ordersInProcess"
              @show-modal="showModal=$event"
              @sorted-order="ordersInProcess=$event"
            />
            <!-- panel -->
            <orders-box
              type="finished"
              :orders="ordersFinished"
              @show-modal="showModal=$event"
            />
            <orders-box
              type="delivered"
              :orders="ordersDelivered"
              @show-modal="showModal=$event"
            />
          <!-- panel -->
          </div>
        </article>

      </section>
    </main>

    <!-- modal datos pedido -->
    <order-modal
      :show-modal="showModal"
      :order="modalOrder"
      @close-modal="showModal=$event"
      @change-orders="changeOrders($event)"
    />
    <orderCreateModal
      :open-new="openNew"
      @close-modal="openNew=$event"
      @push-order="pushNew($event)"
    />
    <show-order
      :show-modal="openSearchModal"
      :order="searchedOrder"
      @close-modal="openSearchModal=$event"
      @change-orders="changeOrdersSearch($event)"
    />
  </main>
</template>

<script>
import showOrder from '../components/orderMain/showOrder'
import orderModal from '../components/orderMain/orderModal'
import orderCreateModal from '../components/orderMain/newOrder'
import ordersBox from '../components/orderMain/ordersBox'
import Menu from '../components/layout/Menu'
import configService from '../settings/api-url'
import { mapState } from 'vuex'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      activeFilter: 'almacen',
      openSearchModal: false,
      searchedOrder: {},
      orderNumber: 0,
      searchOption: '',
      inProcessCount: 0,
      finishedCount: 0,
      deliveredCount: 0,
      orders: {},
      orderToModal: {},
      showModal: false,
      ordersDelivered: [],
      ordersInProcess: [],
      ordersFinished: [],
      openNew: false,
      searchOptions: [{label: 'Id de la orden', value: 0}, {label: 'Numero de factura', value: 1},
        {label: 'Número de pedido', value: 2}, {label: 'Nombre del cliente', value: 3}],
      myRange: {
        start: new Date(),
        end: new Date()
      },
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
      }
    }
  },
  components: {
    ordersBox,
    Menu,
    orderCreateModal,
    orderModal,
    showOrder
  },
  computed: {
    ...mapState(['modalOrder', 'user']),
    searchByRange: {
      get () {
        return this.myRange
      },
      set (value) {
        this.fetchRangeOrders(value)
        this.myRange = value
      }
    }
  },
  methods: {
    importFile () {
      let headers = {}
      headers.id = 'id'
      headers.bill_number = 'Numero de factura'
      headers.aasm_state = 'Estado del pedido'
      headers.client_name = 'Nombre del cliente'
      headers.client_number = 'Telefono del cliente'
      headers.initial_date = 'Fecha inicial'
      headers.description = 'Descripcion de la orden'
      headers.seller_name = 'Nombre del vendedor'
      headers.order_number = 'Número de la orden'
      headers.place = 'Lugar de la orden'
      headers.delivery_date = 'fecha de entrega'
      headers.comments = 'Comentario'
      headers.updated_at = 'Fecha actualizacion'
      const newOrders = [headers, ...this.orders]
      
      const orders = XLSX.utils.json_to_sheet(newOrders, {skipHeader: true})
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, orders, 'orders')
      XLSX.writeFile(wb, 'orders.xlsx') // name of the file is 'book.xlsx'// sheetAName is name of Worksheet
    },
    changeFilter (filter) {
      console.log(filter)
      this.activeFilter = filter
      this.fetchRangeOrders(this.myRange)
    },
    logout () {
      localStorage.removeItem('user')
      this.$router.push({name: 'login'})
    },
    filterOrders (orders) {
      this.ordersInProcess = orders.filter(element => {
        return element.aasm_state === 'en_proceso'
      })
      this.ordersFinished = orders.filter(element => {
        return element.aasm_state === 'orden_terminada'
      })
      this.ordersDelivered = orders.filter(element => {
        return element.aasm_state === 'orden_entregada'
      })
      this.inProcessCount = this.ordersInProcess.length
      this.finishedCount = this.ordersFinished.length
      this.deliveredCount = this.ordersDelivered.length
    },
    pushNew (event) {
      console.log(event)
      this.fetchTodayOrders()
    },
    changeOrders (event) {
      this.fetchRangeOrders(this.myRange)
    },
    changeOrdersSearch (event) {
      console.log('hola show modal')
      this.fetchRangeOrders(this.myRange)
      this.searchedOrder = event
    },
    searchOrder () {
      if (!this.searchOption) {
        this.searchOption = 0
      }
      configService(`admin/orders?search=${this.searchOption.value}&number=${this.orderNumber}`)
        .then(res => {
          this.searchedOrder = res.data
          this.openSearchModal = true
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            position: 'center',
            type: 'warning',
            title: 'No se encontro ninguna orden',
            showConfirmButton: false,
            timer: 1500
          })
          this.fetchRangeOrders(this.myRange)
        })
    },
    fetchRangeOrders (value) {
      console.log(value)
      const searchLocale = this.activeFilter === 'almacen' ? 0 : 1
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
        configService(`admin/orders?date=${data}&place=${searchLocale}`)
          .then(response => {
            this.orders = response.data
            this.filterOrders(this.orders)
            console.log(this.orders)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log(dataStart, dataEnd)
        configService(`admin/orders?start_date=${dataStart}&end_date=${dataEnd}&place=${searchLocale}`)
          .then(response => {
            this.orders = response.data
            this.filterOrders(this.orders)
            console.log(this.orders)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchTodayOrders () {
      const searchLocale = this.activeFilter === 'almacen' ? 0 : 1
      const today = new Date()
      const data = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      configService(`admin/orders?date=${data}&place=${searchLocale}`)
        .then(res => {
          this.orders = res.data
          this.filterOrders(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.fetchTodayOrders()
  }
}
</script>

<style>

</style>
