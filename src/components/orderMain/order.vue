<template>
  <div class="admin-hoy__panel-item">
    <div class="admin-hoy__nombre">
      <!-- la clase admin-hoy__triger  ejecuta el evento abrir modal-->
      <div class="admin-hoy__ubicacion-precio admin-hoy__triger">
        <div class="admin-hoy__nombre-ubicacion">
          <h3>{{ order.client_name }}</h3>
        </div>
        <div class="admin-hoy__precio">
          <h3>{{ order.total }}</h3>
        </div>
      </div>
    </div>
    <div class="admin-hoy__estado-info">
      <h3 class="admin-hoy__estado-aceptado">{{ order.aasm_state }}</h3>
      <p>({{ order.client_number }})</p>
      <div
        @click="sendOrder"
        class="admin-hoy__estado">
        Ver detalles
      </div>
    </div>
    <div class="admin-hoy__panel-tiempo">
      <!-- se manejan 3 estados alto medio y bajo -->
      <!-- agregar la clase 'alto' para activar este estado -->
      <!-- agregar la clase 'medio' para activar este estado -->
      <!-- se deja sin clase para indicat bajo -->
      <span class="alto"> {{ order.id }} </span>
      <p>{{ order.bill_number }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    order: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    ...mapMutations(['setModalOrder']),
    sendOrder () {
      this.$emit('show-modal', true)
      this.setModalOrder(this.order)
    }
  }
}
</script>

<style>

</style>
