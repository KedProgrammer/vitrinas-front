<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-associate">
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
        <div class="restaurant-menu__modifier-addons">
          <h3>Asignar Adicionales </h3>
          <div class="restaurant-menu__modifier-addons-add">
            <div class="ceu-item s-70">
              <multiselect
                class="custom-select5"
                v-model="addon"
                :options="addons"
                :searchable="true"
                :show-labels="false"
                label="label"
                track-by="value"
                placeholder="Buscar Addon" />
            </div>
            <div class="ceu-item s-30">
              <div class="ceu-campo__text-round2">
                <input
                  v-model="addonPrice"
                  placeholder="Precio"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-100">
              <div
                @click="sentAssociate"
                class="ceu-btn1">
                Añadir
              </div>
            </div>
          </div>
          <h4>Lista de Adicionales</h4>
          <div class="restaurant-menu__modifier-addons-list">
            <div
              v-for="(item, index) in listAddos"
              :key="index"
              class="restaurant-menu__modifier-addons-item">
              <div class="ceu-item s-70 restaurant-menu__modifier-addon-name">
                <div
                  @click="deleteAddonAssociate(item.id, item.name)"
                  class="restaurant-menu__modifier-addons-delete">
                  <i class="ceu-icon-garbage" />
                </div>
                {{ item.name }}
              </div>
              <div class="ceu-item s-30">
                <div class="ceu-campo__text-round2">
                  <input
                    v-model="modelPrice[index]"
                    placeholder="Precio"
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-100 restaurant-menu__modifier-item-footer">
                <span @click="editAddonAssociate(item.id, index)" >
                  Editar
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import configService from '../../settings/api-url'
import { mixins } from '../../mixins.js'
export default {
  name: 'Associate',
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
        this.getAddons()
        this.getAssociateAddons()
      } else {
        this.emptyForm()
      }
    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  mixins: [mixins],
  data () {
    return {
      idAddonCurrent: '',
      addonPrice: '',
      addons: [],
      addon: '',
      listAddos: [],
      modelPrice: []
    }
  },
  methods: {
    getAddons () {
      configService(`/central_admin/commerces/${this.currentCommerce}/add_ons`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            if (dataPosition.is_available) {
              this.addons.push({ value: dataPosition.id, label: dataPosition.name })
            }
          }
        })
    },
    getAssociateAddons () {
      this.listAddos = []
      this.modelPrice = []
      configService(`/central_admin/product_options/${this.currentModifier}/add_on_price_options`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            this.listAddos.push(dataPosition)
            this.modelPrice.push(Math.floor(parseFloat(dataPosition.price.replace(/[^\d\.\-]/g, ""))))
          }
        })
    },
    toggleShow () {
      this.$emit('toggle-add', NaN)
    },
    emptyForm () {
      this.addonPrice = ''
      this.addons = []
    },
    sentAssociate () {
      configService(`/central_admin/product_options/${this.currentModifier}/add_on_price_options`, {
        method: 'POST',
        data: {
          'add_on_price_option': {
            'add_on_id': this.addon.value,
            'price': this.addonPrice
          }
        }
      })
        .then(res => {
          this.getAssociateAddons()
          this.$swal({
            type: 'success',
            title: 'Asociado!',
            showConfirmButton: false,
            timer: 2000
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
    editAddonAssociate (id, position) {
      configService(`/central_admin/add_on_price_options/${id}`, {
        method: 'PUT',
        data: {
          'add_on_price_option': {
            'price': this.modelPrice[position]
          }
        }
      })
        .then(res => {
          this.getAssociateAddons()
          this.$swal({
            type: 'success',
            title: 'Editado!',
            showConfirmButton: false,
            timer: 2000
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
    deleteAddonAssociate (id, name) {
      this.$swal({
        type: 'question',
        title: 'Confimar',
        html: `Quieres eliminar <strong>${name}</strong> de este Grupo modificador ?`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Si'
      })
        .then((result) => {
          if (result.value === true) {
            configService(`/central_admin/add_on_price_options/${id}`, {
              method: 'DELETE'
            })
              .then(res => {
                this.getAssociateAddons()
                this.$swal({
                  type: 'success',
                  title: 'Eliminado!',
                  showConfirmButton: false,
                  timer: 2000
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
        })
    }
  }
}
</script>
