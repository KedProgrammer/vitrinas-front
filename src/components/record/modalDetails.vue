<template>
  <div
    :class="{ 'activo': toggleModal }"
    class="modal-admin">
    <button
      @click="eventToggleModal"
      class="modal-admin__cerrar">
      Cerrar
    </button>
    <div class="modal-admin__header">
      <h3>56721</h3>
      <h2>Delirato</h2>
      <p class="modal-admin__hora">
        Para la 1:15pm
      </p>
      <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
      <h4 class="modal-admin__estado-pedido activo">Aceptado</h4>
    </div>
    <!-- lista del pedido -->
    <div class="modal-admin__lista">

      <!-- item -->
      <div class="modal-admin__lista-item">
        <!-- numero producto en la listaa -->
        <div class="modal-admin__lista-num">
          1
        </div>
        <!-- informacion del producto -->
        <div class="modal-admin__lista-info">
          <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
          <ul class="modal-admin__lista-adicional">
            <li>Pepsi</li>
            <li>Francesa</li>
          </ul>
          <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
          <p class="modal-admin__lista-mensaje">
            Enviar salsa de tomate y mayonesa, no incluir la cebolla
          </p>
          <div class="modal-admin__lista-precio">
            $32.300
          </div>
        </div>

      </div>

      <!-- item -->
      <div class="modal-admin__lista-item">
        <!-- numero producto en la listaa -->
        <div class="modal-admin__lista-num">
          2
        </div>
        <!-- informacion del producto -->
        <div class="modal-admin__lista-info">
          <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
          <ul class="modal-admin__lista-adicional">
            <li>Pepsi</li>
            <li>Francesa</li>
          </ul>
          <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
          <p class="modal-admin__lista-mensaje">
            Enviar salsa de tomate y mayonesa, no incluir la cebolla
          </p>
          <div class="modal-admin__lista-precio">
            $32.300
          </div>
        </div>

      </div>

      <!-- item -->
      <div class="modal-admin__lista-item">
        <!-- numero producto en la listaa -->
        <div class="modal-admin__lista-num">
          3
        </div>
        <!-- informacion del producto -->
        <div class="modal-admin__lista-info">
          <p class="modal-admin__lista-titulo">Todo terreno en combo</p>
          <ul class="modal-admin__lista-adicional">
            <li>Pepsi</li>
            <li>Francesa</li>
          </ul>
          <h5 class="modal-admin__lista-comentario">Comentarios:</h5>
          <p class="modal-admin__lista-mensaje">
            Enviar salsa de tomate y mayonesa, no incluir la cebolla
          </p>
          <div class="modal-admin__lista-precio">
            $32.300
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
      <p class="modal-admin__row">
        <strong>Domicilio</strong>
        $0
      </p>
      <div class="modal-admin__total">
        TOTAL COP $54.400
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
    toggleModal: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    eventToggleModal () {
      this.$emit('event-toggle-modal')
    }
  }
}
</script>
