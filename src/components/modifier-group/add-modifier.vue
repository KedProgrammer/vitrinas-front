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
        @submit.prevent="sendForm"
        class="modal-add__content">
        <!-- campo principal -->
        <div class="menu-restaurant__modifier-title">
          <div class="ceu-campo__text-round2">
            <p>Nombre</p>
            <input
              v-model="form.title"
              type="text">
          </div>
          <div class="ceu-campo__text-round2">
            <p>Descripción</p>
            <textarea v-model="form.description"/>
          </div>
        </div>
        <div class="ceu-container2">
          <div class="ceu-item s-100 menu-restaurant__modifier-multiselect">
            <p>Multiple Selección ?</p>
            <div class="admin-tabla__turno-checkbox">
              <input
                type="checkbox"
                v-model="form.is_multiple"
                id="restaurant__modifier-checked">
              <label
                for="restaurant__modifier-checked"
                data-si="Si"
                data-no="No"/>
            </div>
          </div>
          <div class="ceu-item s-50">
            <div class="ceu-campo__text-round2">
              <p>Mínimo</p>
              <input
                v-model="form.min_constraint"
                type="text">
            </div>
          </div>
          <div class="ceu-item s-50">
            <div class="ceu-campo__text-round2">
              <p>Máximo</p>
              <input
                v-model="form.max_constraint"
                type="text">
            </div>
          </div>
        </div>
        <!-- submit -->
        <div class="modal-add__footer main-center">
          <button
            class="ceu-btn1"
            type="submit">
            {{ isNaN(currentModifier) ? 'Agregar' : 'Editar' }}
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
    currentModifier: {
      type: Number,
      default: NaN
    }
  },
  watch: {
    showModal (valNew, valOld) {
      if (valNew && !isNaN(this.currentModifier)) {
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
        title: '',
        description: '',
        is_multiple: false,
        max_constraint: '',
        min_constraint: ''
      }
    }
  },
  methods: {
    fillForm () {
      configService(`/central_admin/product_options/${this.currentModifier}/`)
        .then(res => {
          this.form = {
            title: res.data.title,
            description: res.data.description,
            is_multiple: res.data.is_multiple,
            max_constraint: res.data.max_constraint,
            min_constraint: res.data.min_constraint
          }
        })
    },
    emptyForm () {
      this.form = {
        title: '',
        description: '',
        is_multiple: false,
        max_constraint: '',
        min_constraint: ''
      }
    },
    toggleShow () {
      this.$emit('toggle-add', NaN)
    },
    edit () {
      configService(`/central_admin/product_options/${this.currentModifier}`, {
        method: 'PUT',
        data: {
          'product_option': this.form
        }
      })
        .then(res => {
          this.toggleShow()
          this.reloadTable()
          this.form = {
            title: '',
            description: '',
            is_multiple: false,
            max_constraint: '',
            min_constraint: ''
          }
          this.$swal({
            type: 'success',
            title: 'Grupo Modificador editado!',
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
    },
    add () {
      configService(`/central_admin/commerces/${this.currentCommerce}/product_options`, {
        method: 'POST',
        data: {
          'product_option': this.form
        }
      })
        .then(res => {
          this.toggleShow()
          this.reloadTable()
          this.form.name = ''
          this.form.is_available = false
          this.$swal({
            type: 'success',
            title: 'Grupo Modificador Creado!',
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
    },
    sendForm () {
      if (isNaN(this.currentModifier)) {
        this.add()
      } else {
        this.edit()
      }
    },
    reloadTable () {
      this.$emit('reload-table')
    }
  }
}
</script>
