<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-add modal-addAddons">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        @submit.prevent="addAddons"
        class="modal-add__content">
        <!-- campo principal -->
        <div class="ceu-container2">
          <div class="ceu-item s-100">
            <div class="ceu-campo__text-round2">
              <p>Nombre</p>
              <input
                v-model="form.name"
                type="text">
            </div>
          </div>
          <div class="ceu-item s-100">
            <p>Disponibilidad</p>
            <div class="admin-tabla__turno-checkbox">
              <input
                v-model="form.is_available"
                type="checkbox"
                id="restaurant-addon-avialable">
              <label
                for="restaurant-addon-avialable"
                data-si="On"
                data-no="Off"/>
            </div>
          </div>
        </div>
        <!-- submit -->
        <div class="modal-add__footer main-center">
          <button
            class="ceu-btn1"
            type="submit">
            {{ isNaN(currentAddon) ? 'Agregar' : 'Editar' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import configService from '../../settings/api-url'
export default {
  name: 'ModalAdd',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    currentCommerce: {
      type: Number,
      default: NaN
    },
    currentAddon: {
      type: Number,
      default: NaN
    }
  },
  watch: {
    showModal (valNew, valOld) {
      if (valNew && !isNaN(this.currentAddon)) {
        this.fillForm()
      } else {
        this.emptyForm()
      }
    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  data () {
    return {
      form: {
        name: '',
        is_available: false
      }
    }
  },
  methods: {
    fillForm () {
      configService(`/central_admin/commerces/${this.currentCommerce}/add_ons/${this.currentAddon}`)
        .then(res => {
          this.form.name = res.data.name
          this.form.is_available = res.data.is_available
        })
    },
    emptyForm () {
      this.form.name = ''
      this.form.is_available = false
    },
    toggleShow () {
      this.$emit('toggle-add', NaN)
    },
    addAddons () {
      if (isNaN(this.currentAddon)) {
        configService(`/central_admin/commerces/${this.currentCommerce}/add_ons`, {
          method: 'POST',
          data: {
            'add_on': this.form
          }
        })
          .then(res => {
            this.toggleShow()
            this.reloadTable()
            this.form.name = ''
            this.form.is_available = false
            this.$swal({
              type: 'success',
              title: 'Addon Creado!',
              showConfirmButton: false,
              timer: 2500
            })
          })
          .catch(error => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Vuelve a Intentarlo'
            })
            console.log(error.response.data)
          })
      } else {
        configService(`/central_admin/commerces/${this.currentCommerce}/add_ons/${this.currentAddon}`, {
          method: 'PUT',
          data: {
            'add_on': this.form
          }
        })
          .then(res => {
            this.toggleShow()
            this.reloadTable()
            this.form.name = ''
            this.form.is_available = false
            this.$swal({
              type: 'success',
              title: 'Addon Editado!',
              showConfirmButton: false,
              timer: 2500
            })
          })
          .catch(error => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Vuelve a Intentarlo'
            })
            console.log(error.response.data)
          })
      }
    },
    reloadTable () {
      this.$emit('reload-table')
    }
  }
}
</script>
