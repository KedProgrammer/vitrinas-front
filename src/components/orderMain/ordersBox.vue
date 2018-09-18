<template>
  <div class="admin-hoy__panel">
    <div class="admin-hoy__panel-header">
      <h3>{{ setTitle }}</h3>
      <!-- menu -->
      <div class="admin-hoy__panel-menu">
        <!-- agregar la clase 'activo' para aplicar estilo -->
        <a
          @click="sortBy('id')"
          class="admin-hoy__panel-menu-item">
          <i class="ceu-icon-time-left"/>
        </a>
        <a
          @click="sortBy('total')"
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
      <order
        :key="order.id"
        v-for="order in orders"
        :order="order"
        @show-modal="$emit('show-modal', true)"
      />
      <!-- item -->

      <!-- item -->

      <!-- item -->

      <!-- item -->

    </div>
  </div>
</template>

<script>
import order from './order'

export default {
  watch: {
    showModal (event) {
      console.log(event)
    }
  },
  data () {
    return {
      showModal: true
    }
  },
  components: {
    order
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    orders: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    change () {
      console.log('hola mjundo')
    },
    sortBy (type) {
      switch (type) {
        case 'total':
          this.orders.sort((a, b) => {
            return a.total - b.total
          })
          this.$emit('sorted-order', this.order)
          break
        case 'id':
          this.orders.sort((a, b) => {
            return a.id - b.id
          })
          this.$emit('sorted-order', this.order)
          break
      }
    }
  },
  computed: {
    setTitle () {
      switch (this.type) {
        case 'process':
          return 'En proceso'
        case 'finished':
          return 'terminado'
        case 'delivered':
          return 'Entregado'
      }
    }
  }

}
</script>

<style>

</style>
