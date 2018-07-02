<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-add">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="modal-add__content">
        <!-- campo principal -->
        <div class="modal-add__name-retaurant">
          <input
            placeholder="Nombre del restaurante"
            autocomplete="name"
            type="text">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            autocomplete="email"
            placeholder="Correo de contacto"
            type="text">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            autocomplete="name"
            placeholder="Nombre de contacto"
            type="text">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            autocomplete="tel"
            placeholder="Número de contacto"
            type="tel">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            autocomplete="tel"
            placeholder="Número de contacto 2"
            type="tel">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            placeholder="NIT"
            type="text">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            placeholder="Universidad"
            type="text">
        </div>
        <!-- campo -->
        <div class="ceu-campo__text-round">
          <input
            autocomplete="street-address"
            placeholder="Dirección del local"
            type="text">
        </div>
        <!-- Servicios -->
        <div class="modal-add__servicios cross-center">
          <h3>Servicios de interés</h3>
          <div class="modal-add__servicios-check">
            <div class="ceu-checkbox">
              <input
                id="add-restaurant__domicilios"
                type="checkbox">
              <label for="add-restaurant__domicilios">
                <span />
                Domicilios
              </label>
            </div>
            <div class="ceu-checkbox">
              <input
                id="add-restaurant__takeout"
                type="checkbox">
              <label for="add-restaurant__takeout">
                <span />
                Take-out
              </label>
            </div>
          </div>
        </div>
        <!-- submit -->
        <div class="modal-add__footer main-center">
          <button
            class="ceu-btn1"
            type="submit">
            Crear restaurate
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModalAdd',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-add')
    }
  }
}
</script>
