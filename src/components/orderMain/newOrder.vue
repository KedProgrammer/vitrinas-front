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
        <div class="orderInput">
          <datepicker
            placeholder="Fecha de pedido"
            v-model="initialDate"
            :required="true"
          />
        </div>
        <datepicker
          placeholder="Fecha de entrega"
          v-model="deliveryDate"
          :required="true"
        />
        <input
          v-model="billNumber"
          placeholder="Numero de factura"
          type="number">
        <input
          required
          v-model="orderNumber"
          placeholder="Numero de pedido"
          type="number">
        <input
          required
          type="text"
          placeholder="Nombre de cliente"
          v-model="clienteName">
        <input
          type="number"
          placeholder="Número del cliente"
          v-model="clientNumber">
        <input
          required
          placeholder="Nombre vendedor"
          v-model="sellerName">
        <h4> Local </h4>
        <v-select
          placeholder="local"
          :searchable="false"
          :show-labels="false"
          v-model="placeId"
          :options="places"/>
        <textarea
          class="margen"
          v-model="description"
          placeholder="Descripción de la orden"/>
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
      placeId: '',
      places: [{label: 'Almacén', value: 0}, {label: 'Producción', value: 1}],
      sellerName: '',
      deliveryDate: '',
      description: '',
      comments: '',
      initialDate: '',
      orderTotal: '',
      orderNumber: '',
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
      if (this.placeId) {
        const data = {
          order: {
            place: this.placeId.value,
            seller_name: this.sellerName,
            initial_date: this.initialDate,
            bill_number: this.billNumber,
            comments: this.comments,
            client_name: this.clienteName,
            client_number: this.clientNumber,
            description: this.description,
            delivery_date: this.deliveryDate,
            order_number: this.orderNumber
          }
        }
        console.log(data)
        configService.post('admin/orders', data)
          .then(res => {
            this.orderNumber = ''
            this.deliveryDate = ''
            this.sellerName = ''
            this.initialDate = ''
            this.comments = ''
            this.orderTotal = ''
            this.billNumber = ''
            this.clienteName = ''
            this.clientNumber = ''
            this.description = ''
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
              title: `Error al crear la orden: ${error.response.data.message}`,
              showConfirmButton: false,
              timer: 3000
            })
            console.log(error.response.data)
          })
      } else {
        this.$swal({
          position: 'center',
          type: 'warning',
          title: `Debes seleccionar un lugar`,
          showConfirmButton: false,
          timer: 3000
        })
      }
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

<style scoped>
  .margen {
    margin: 30px
  }
</style>
