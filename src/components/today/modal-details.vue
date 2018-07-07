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
      <p class="modal-admin__hora">
        Para la 1:15pm
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
          2
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
          <!--
          <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
          <p class="modal-admin__lista-mensaje">
            Enviar salsa de tomate y mayonesa, no incluir la cebolla
          </p>
          -->
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
          HappyCharlie
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
    </div>
    <!-- estados -->
    <div class="modal-admin__estados">
      <!-- item -->
      <div class="modal-admin__estado-item">
        Runner esp...
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Listo en rest
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Recogido
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Entregado
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Pagado
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Problema Cliente
      </div>
      <!-- item -->
      <div class="modal-admin__estado-item">
        Problema rest
      </div>
    </div>
    <!-- informacion base -->
    <div class="modal-admin__info">
      <p>
        <strong>Cliente: </strong>Pepito perez
        (pepito@javeriana.edu.co
      </p>
      <p>
        <strong>Restaurante: </strong>
        Delirato 3103224982
      </p>
    </div>
  </div>
</template>

<script>
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
          }
        }
      }
    }
  },
  methods: {
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
    console.log(this.orderSummary)
  }
}
</script>
