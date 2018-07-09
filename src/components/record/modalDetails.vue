<template>
   <div
    :class="{ 'activo': toggleModal }"
    class="modal-admin">
    <button
      @click="close"
      class="modal-admin__cerrar">
      Cerrar
    </button>
    <div class="modal-admin__header">
      <h3>{{ orderSummary.id }}</h3>
      <h2>{{ orderSummary.commerce.commercial_name }}</h2>
      <p class="modal-admin__hora">
        Para {{ setTime(orderSummary.trackTime) }}
      </p>
      <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
      <h4 class="modal-admin__estado-pedido activo">{{orderSummary.status}}</h4>
    </div>
    <!-- lista del pedido -->
    <div class="modal-admin__lista">

      <!-- item -->
      <div
        v-for="product in orderSummary.json_products"
        :key="product.id"
        class="modal-admin__lista-item">
        <!-- numero producto en la listaa -->
        <div class="modal-admin__lista-num">
          {{product.count}}
        </div>
        <!-- informacion del producto -->
        <div class="modal-admin__lista-info">
          <p class="modal-admin__lista-titulo">{{ product.name }}</p>
          <ul class="modal-admin__lista-adicional">
            <li
              v-for="addon in product.add_ons"
              :key="addon.add_ons.id">
              {{ addonNames(addon.add_ons) }}
            </li>

          </ul>
          
          <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
          <p class="modal-admin__lista-mensaje">
            Enviar salsa de tomate y mayonesa, no incluir la cebolla
          </p>
          
          <div class="modal-admin__lista-precio">
            {{ product.total_price }}
          </div>
        </div>

      </div>

    </div>
    <!-- precio total -->
    <div class="modal-admin__costos">
      <div class="modal-admin__row">
        <p class="modal-admin__cupon">
          <strong>Cupón</strong>
          {{setCoupon(orderSummary)}}
        </p>
        <div class="modal-admin__domicilio">
          Sin domicilio
        </div>
      </div>
      <p
        v-if="orderSummary.is_takeout"
        class="modal-admin__row">
        <strong>Takeout</strong>
        {{ orderSummary.takeout }}
      </p>
      <p
        v-else
        class="modal-admin__row">
        <strong>Domicilio</strong>
        {{ orderSummary.delivery_price }}
      </p>
      <div class="modal-admin__total">
        TOTAL COP {{ orderSummary.total }}
      </div>
    </div>
    <!-- formad de pagos -->
    <div class="modal-admin__pagos">
      <div class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Forma de pago
        </div>
        <div class="modal-admin__pago-modo">
          {{orderSummary.payment_type}} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div
      v-if="!orderSummary.is_takeout"
       class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Runner
        </div>
        <div class="modal-admin__pago-modo">
          {{setDelivery(orderSummary.delivery)}} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
    </div>
    <!-- estados -->
    <div class="modal-admin__estados">
      <!-- item -->
      <div 
      @click="setState(button,orderSummary)"
      v-for="button in orderSummary.buttons"
      :key="button"
      class="modal-admin__estado-item">
        {{button}}
      </div>
    </div>
    <!-- informacion base -->
    <div class="modal-admin__info">
      <p>
        <strong>Cliente: </strong>{{setName(orderSummary)}}
        ({{orderSummary.campus_email}})
      </p>
      <p>
        <strong>Restaurante: </strong>
        {{orderSummary.commerce.commercial_name}} {{orderSummary.commerce.telephone}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDetails',
  props: {
    toggleModal: {
      default: false,
      type: Boolean
    },
    orderSummary: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setTime: {
      type: Function,
      default: () => {
        return 
      }
    }
  },
  methods: {
    close () {
       this.$emit('close-details', false)
    },
    setName(order){
      return `${order.first_name} ${order.last_name}`
    },
    setDelivery (delivery){
      if (delivery.delivery_man){
         return `${delivery.delivery_man.first_name} ${delivery.delivery_man.last_name}`
      }else {
        return 'No Asignado'
      }
     
    },
    setCoupon(order) {
      if (order.coupon_name) {
        return order.coupon_name
      }else{
        return 'Sin cupon'
      }
    },
    addonNames (addon) {
      let name = ''
      addon.forEach(element => {
        name = element.name
      })
      return name
    },
    eventToggleModal () {
      this.$emit('event-toggle-modal')
    }
  }
}
</script>
