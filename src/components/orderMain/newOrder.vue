<template>
  <section
    :class="{ 'modal-ceu__show': openNew }"
    class="modal-ceu modal-edit">
    <div
      @click="closeModal"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-promo medium">
      <div
        @click="closeModal"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        class="login-form create-order"
        @submit.prevent="createOrder">

        <datepicker
          placeholder="Fecha de pedido"
          v-model="initialDate"
          :required="true"
        />
        <input
          required
          v-model="billNumber"
          placeholder="Numero de factura"
          type="number">
        <input
          required
          type="text"
          placeholder="Nombre de cliente"
          v-model="clienteName">
        <input
          required
          type="number"
          placeholder="Numero del cliente"
          v-model="clientNumber">
        <input
          required
          type="number"
          placeholder="Total orden"
          v-model="orderTotal">
        <textarea
          v-model="comments"
          placeholder="Comentario inicial"/>
        <button
          class="login-button"
          type="submit">Crear orden</button>

      </form>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import configService from '../../settings/api-url.js'
export default {
  components: {
    Datepicker
  },
  props: {
    openNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      comments: '',
      initialDate: '',
      orderTotal: '',
      billNumber: '',
      clienteName: '',
      clientNumber: '',
      myRange: {
        start: new Date(2018, 6, 9),
        end: new Date(2018, 6, 10)
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
  methods: {
    createOrder () {
      const data = {
        order: {
          initial_date: this.initialDate,
          bill_number: this.billNumber,
          comments: this.comments,
          client_name: this.clienteName,
          client_number: this.clientNumber,
          total: this.orderTotal
        }
      }
      configService.post('orders/orders', data)
        .then(res => {
          this.initialDate = ''
          this.comments = ''
          this.orderTotal = ''
          this.billNumber = ''
          this.clienteName = ''
          this.clientNumber = ''
          this.$emit('close-modal', false)
          this.$emit('push-order', res.data)
          this.$swal({
            position: 'center',
            type: 'success',
            title: 'Tu orden ha sido creada',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          this.$swal({
            position: 'center',
            type: 'warning',
            title: 'Error al crear la orden',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(error)
        })
    },
    closeModal () {
      this.initialDate = ''
      this.comments = ''
      this.orderTotal = ''
      this.billNumber = ''
      this.clienteName = ''
      this.clientNumber = ''
      this.$emit('close-modal', false)
    }
  }
}
</script>

<style>

</style>
