<template>
  <div
    :class="{'activo': showModal}"
    class="modal-admin">
    <button
      @click="$emit('close-modal', false)"
      class="modal-admin__cerrar">
      Cerrar
    </button>
    <div class="modal-admin__header">
      <h3>Factura {{ order.bill_number }}</h3>
      <h2> Vitrinas Antioquia</h2>
      <p class="modal-admin__hora">
        Fecha de pedido
        {{ formatOrder }}
      </p>
      <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
      <h4 class="modal-admin__estado-pedido activo"> {{ order.aasm_state }}</h4>
    </div>
    <!-- lista del pedido -->
    <div class="comment-section">
      <textarea v-model="order.comments"/>
      <button
        @click="editComment"
        class="new-order">
        Editar comentario
      </button>
    </div>
    <!-- precio total -->
    <div class="modal-admin__costos">
      <div class="modal-admin__row">
        <p class="modal-admin__cupon">
          <strong>Nombre cliente</strong>
          {{ order.client_name }}
        </p>
        <div class="modal-admin__domicilio">
          Telefono cliente : {{ order.client_number }}
        </div>
      </div>
      <!-- <p class="modal-admin__row">
        <strong>Domicilio</strong>
        $0
      </p> -->
      <div class="modal-admin__total">
        TOTAL COP {{ order.total }}
      </div>
    </div>
    <!-- formad de pagos -->
    <!-- <div class="modal-admin__pagos">
      <div class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Forma de pago
        </div>
        <div class="modal-admin__pago-modo">
          Efectivo <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Runner
        </div>
        <div class="modal-admin__pago-modo">
          Juan Camilo Martines <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
    </div> -->
    <!-- estados -->
    <div class="modal-admin__estados">
      <!-- item -->
      <!-- item -->
      <div
        v-if="order.aasm_state !== 'orden_entregada'"
        @click="changeOrder"
        class="modal-admin__estado-item">
        {{ setButton }}
      </div>
    </div>
    <!-- informacion base -->
    <div class="modal-admin__info">
      <p>
        <strong>Ultima edición: </strong>{{ formatUpdate }}
      </p>
      <p>
        <strong>Id de la orden: </strong>
        {{ order.id }}
      </p>
    </div>
  </div>
</template>

<script>
import configService from '../../settings/api-url'
import { mapMutations } from 'vuex'
export default {
  computed: {
    formatOrder () {
      const date = new Date(this.order.initial_date)
      console.log(this.order.initial_date, date.getDate())
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    formatUpdate () {
      const date = new Date(this.order.updated_at)
      return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    },
    setButton () {
      switch (this.order.aasm_state) {
        case 'en_proceso':
          return 'Orden terminada'
        case 'orden_terminada':
          return 'Orden entregada'
      }
    }
  },
  methods: {
    ...mapMutations(['setModalOrder']),
    changeOrder () {
      const data = {
        order: {}
      }
      configService.put(`orders/orders/${this.order.id}?state=${this.order.aasm_state}`, data)
        .then(res => {
          this.$emit('change-orders', res.data)
          this.setModalOrder(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editComment () {
      const data = {
        order: {
          comments: this.order.comments
        }
      }
      configService.put(`orders/orders/${this.order.id}`, data)
        .then(res => {
          this.$swal({
            position: 'center',
            type: 'success',
            title: 'Tu orden ha sido editada!',
            showConfirmButton: false,
            timer: 1500
          })
          this.setModalOrder(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>

</style>
