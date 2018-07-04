<template>
  <!-- modal datos pedido -->
  <div class="modal-admin">
    <button class="modal-admin__cerrar modal-admin__cerrar-small">
      X
    </button>
    <div class="modal-admin__header">
      <h3>Descripción</h3>
      <h5>ID <span>56721</span></h5>
      <p class="modal-admin__hora">
        Para la 1:15pm
      </p>
      <!-- colocar la clase "activo" para indicar que fue aceptado el pedido -->
      <h4 class="modal-admin__estado-pedido">En proceso</h4>
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
          <div class="modal-admin-resumen__lista-precio">
            COP $32.300
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
          <div class="modal-admin-resumen__lista-precio">
            COP $32.300
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
          <div class="modal-admin-resumen__lista-precio">
            COP $32.300
          </div>
        </div>

      </div>

    </div>
    <!-- precio total -->
    <div class="modal-admin__costos">
      <div class="modal-admin__total">
        TOTAL COP $54.400
      </div>
    </div>
    <!-- informacion base -->
    <div class="modal-admin__info">
      <p>
        <strong>Cliente:</strong> Carlos Alvarez Avila
        <span><i class="ceu-icon-phone-call-1"/> 3006304982</span>
      </p>
      <p>
        <strong>Runner: </strong>Pepito perez
        <span><i class="ceu-icon-phone-call-1"/> 3006304982</span>
      </p>
      <p>
        <strong>Central: </strong> Katherine Ibarguen
        <span><i class="ceu-icon-phone-call-1"/> 3006304982</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDetails'
}
</script>
