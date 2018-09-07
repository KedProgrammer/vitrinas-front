<template>
  <section
    :class="{ 'modal-ceu__show': true }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-promo medium">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        class="login-form create-order"
        @submit.prevent="createOrder">

        <datepicker
          placeholder="Fecha de pedido"
          v-model="initialDate"
          input-class="input-order"
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
        <textarea placeholder="Comentario inicial"/>
        <button
          class="login-button"
          type="submit">Crear orden</button>

      </form>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    Datepicker
  },
  data () {
    return {
      initialDate: '',
      orderTotal: 0,
      billNumber: 0,
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

    },
    toggleShow () {}
  }
}
</script>

<style>

</style>
