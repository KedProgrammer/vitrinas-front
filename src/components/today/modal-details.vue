<template>
  <div
    :class="{ 'activo': showModal }"
    class="modal-admin">
    <button
      @click="close"
      class="modal-admin__cerrar">
      Cerrar
    </button>
    <div class="modal-admin__header">
      <h3>{{ orderSummary.id }}</h3>
      <h2>{{ orderSummary.commerce.commercial_name }}</h2>
      <p
        v-if="orderSummary.status !== 'order_completed'"
        class="modal-admin__hora">
        {{ setTime(orderSummary.trackTime,orderSummary.deliveryDiference) }}
      </p>
      <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
      <h4 class="modal-admin__estado-pedido activo">{{ orderSummary.status }}</h4>
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
          {{ product.count }}
        </div>
        <!-- informacion del producto -->
        <div class="modal-admin__lista-info">
          <p class="modal-admin__lista-titulo">{{ product.name }}</p>
          <ul class="modal-admin__lista-adicional">
            <div
              v-for="addon in product.add_ons"
              :key="addon.id"
            >
              <li
                v-for="addon1 in addon.add_ons"
                :key="addon1.name">
                {{ addon1.name }}
              </li>
            </div>
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
          {{ setCoupon(orderSummary) }}
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
          {{ orderSummary.payment_type }} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div
        v-if="orderSummary.payment_type === 'efectivo'"
        class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Paga con:
        </div>
        <div
          class="modal-admin__pago-modo">
          {{ orderSummary.cash }} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Apariencia
        </div>
        <div class="modal-admin__pago-modo">
          {{ orderSummary.appearance }} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Celular
        </div>
        <div class="modal-admin__pago-modo">
          {{ orderSummary.cellphone }} <i class="ion-ios-arrow-forward"/>
        </div>
      </div>
      <div
        v-if="!orderSummary.is_takeout"
        class="modal-admin__pagos-row">
        <div class="modal-admin__pago">
          Runner
        </div>
        <div class="modal-admin__pago-modo">
          {{ setDelivery(orderSummary.delivery) }} <i class="ion-ios-arrow-forward"/>
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
        {{ button }}
      </div>
    </div>
    <!-- informacion base -->
    <div class="modal-admin__info">
      <p>
        <strong>Cliente: </strong>{{ setName(orderSummary) }}
        ({{ orderSummary.campus_email }})
      </p>
      <p>
        <strong>Restaurante: </strong>
        {{ orderSummary.commerce.commercial_name }} {{ orderSummary.commerce.telephone }}
      </p>
    </div>
  </div>
</template>

<script>
import configService from '../../settings/api-url.js'
export default {
  name: 'ModalDetails',
  props: {
    showModal: {
      default: false,
      type: Boolean
    },
    orderSummary: {
      type: Object,
      default: () => {
        return {
          commerce: {
            commercial_name: ''
          },
          delivery: {

          }
        }
      }
    }
  },
  methods: {
    setTime (date, delivery) {
      console.log(date, delivery)
      const dateFormatted = new Date(date)
      let minutes = dateFormatted.getMinutes()
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (delivery) {
        if (delivery < 0) {
          return `Demorado ${Math.abs(delivery)} minutos`
        }
      }
      const hour = dateFormatted.getHours()
      const createdTime = hour > 12 ? `Para ${(hour - 12)}:${minutes}pm` : `Para ${(hour)}:${minutes}am`
      return createdTime
    },
    setTrackTime () {
      const createdTime = new Date(this.orderSummary.created_at)
      const trackDeliveryMinutes = parseInt(this.orderSummary.commerce.avg_delivery_time)
      const trackPreparationMinutes = parseInt(this.orderSummary.commerce.avg_preparation_time)
      const trackTime = new Date(createdTime.getFullYear(), createdTime.getMonth(),
        createdTime.getDate(), createdTime.getHours(), createdTime.getMinutes() + trackDeliveryMinutes + trackPreparationMinutes)
      const newElement = {...this.orderSummary, trackTime: trackTime}
      this.orderSummary = newElement
    },
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
          buttons = ['complete_order']
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
    setState (button, order) {
      const data = {
        commerce_id: order.commerce.id,
        comment: 'cualquier problema'
      }
      configService.post(`central_admin/orders/${order.id}/${button}`, data)
        .then(response => {
          const newOrder = response.data
          this.calculateStateButtons(newOrder)
          this.$emit('order-modal', this.orderSummary)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setName (order) {
      return `${order.first_name} ${order.last_name}`
    },
    setCoupon (order) {
      if (order.coupon_name) {
        return order.coupon_name
      } else {
        return 'Sin cupon'
      }
    },
    setDelivery (delivery) {
      if (delivery.delivery_man) {
        return `${delivery.delivery_man.first_name} ${delivery.delivery_man.last_name}`
      } else {
        return 'No Asignado'
      }
    },
    addonNames (addon) {
      let name = ''
      addon.forEach(element => {
        name = element.name
      })
      return name
    },
    close () {
      this.$emit('close-details', false)
    }
  },
  created () {
  }
}
</script>
