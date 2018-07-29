<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-add">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content xmedium">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        @submit.prevent="createRestaurant"
        class="modal-add__conten">
        <div class="ceu-container2">
          <div class="ceu-item ceu-container2 s-50">
            <div class="ceu-item s-100">
              <h3>Datos del Restaurante</h3>
            </div>
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Nombre del restaurante"
                autocomplete="name"
                v-model="form.nameRestaurant"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                autocomplete="email"
                placeholder="Correo de contacto"
                v-model="form.email"
                required
                type="email">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                autocomplete="name"
                placeholder="Nombre de contacto"
                v-model="form.nameContact"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                autocomplete="tel"
                placeholder="Número de contacto"
                v-model="form.phone"
                required
                type="tel">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                autocomplete="tel"
                placeholder="Número 2"
                v-model="form.phone2"
                type="tel">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="NIT"
                v-model="form.nit"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-100">
              <input
                autocomplete="street-address"
                placeholder="Dirección del local"
                v-model="form.direccion"
                required
                type="text">
            </div>
            <!-- Servicios -->
            <div class="modal-add__servicios cross-center ceu-item s-100">
              <h3>Servicios de interés</h3>
              <div class="modal-add__servicios-check">
                <div class="ceu-checkbox">
                  <input
                    id="add-restaurant__domicilios"
                    v-model="form.domicilio"
                    type="checkbox">
                  <label for="add-restaurant__domicilios">
                    <span />
                    Domicilios
                  </label>
                </div>
                <div class="ceu-checkbox">
                  <input
                    id="add-restaurant__takeout"
                    v-model="form.takeout"
                    type="checkbox">
                  <label for="add-restaurant__takeout">
                    <span />
                    Take-out
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="ceu-item s-50 ceu-container2 cross-start">
            <div class="ceu-item s-100">
              <h3>Datos del Administrador</h3>
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Nombre"
                v-model="form.nameAdmin"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Apellido"
                v-model="form.lastNameAdmin"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Email"
                v-model="form.emailAdmin"
                required
                type="email">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Celular"
                v-model="form.phoneAdmin"
                required
                type="text">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Constraseña"
                v-model="form.passAdmin"
                required
                type="password">
            </div>
            <!-- campo -->
            <div class="ceu-campo__text-round2 ceu-item s-50">
              <input
                placeholder="Repetir Contraseña"
                v-model="form.passRepeatAdmin"
                required
                type="password">
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
      </form>
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
  data () {
    return {
      form: {
        nameRestaurant: '',
        email: '',
        nameContact: '',
        phone: '',
        phone2: '',
        nit: '',
        direccion: '',
        domicilio: false,
        takeout: false,
        nameAdmin: '',
        lastNameAdmin: '',
        emailAdmin: '',
        phoneAdmin: '',
        passAdmin: '',
        passRepeatAdmin: ''
      }
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-add')
    },
    createRestaurant () {
      this.$emit('create-restaurant', this.form)
    }
  }
}
</script>
