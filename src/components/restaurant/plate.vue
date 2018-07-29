<template>
  <section
    :class="{ 'modal-ceu__show': showModalPlate }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-category xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        @submit.prevent="sendPlate"
        class="menu-restaurant__content">
        <div class="ceu-container2">
          <div class="ceu-campo__text-round2 ceu-item s-100">
            <p>Titulo</p>
            <input
              required
              v-model="formPlate.name"
              type="text">
          </div>
          <div class="ceu-campo__text-round2 ceu-item s-100">
            <p>Resumen</p>
            <textarea
              required
              v-model="formPlate.tweet"
              maxlength="120" />
          </div>
          <div class="ceu-campo__text-round2 ceu-item s-100">
            <p>Descrpción</p>
            <textarea
              required
              v-model="formPlate.description" />
          </div>
        </div>
        <div class="ceu-container2">
          <div class="cue-item padding s-50">
            <div class="ceu-campo__text-round2">
              Precio
              <input
                required
                v-model="formPlate.price"
                type="number">
            </div>
          </div>
          <div class="cue-item padding s-50">
            <div class="ceu-campo__text-round2">
              Precio prime
              <input
                required
                v-model="formPlate.prime_price"
                type="number">
            </div>
          </div>
        </div>
        <div class="ceu-container2">
          <div class="ceu-item s-100 menu-restaurant__descuento-group-modifier">
            <p>Grupo modificador</p>
            <multiselect
              class="custom-select3"
              v-model="selectModificador"
              :options="selectModificadores"
              :searchable="true"
              :close-on-select="false"
              :show-labels="false"
              :multiple="true"
              label="label"
              track-by="value"
              placeholder="Multi Selección" />
          </div>
        </div>
        <div class="menu-restaurant__descuento">
          <p
            @click="toggleShowDiscount"
            class="add">Agregar descuento</p>
          <p>Descuento Actual</p>
          <div class="menu-restaurant__descuento-info">
            <table class="menu-restaurant__descuento-table">
              <tr>
                <th>
                  Inicio
                </th>
                <th>Fin</th>
                <th>
                  Precio
                </th>
                <th />
              </tr>
              <tr>
                <td>
                  30 Enero
                </td>
                <td>30 Febrero</td>
                <td>
                  2000
                </td>
                <td class="edit">Editar</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="menu-restaurant__add-footer">
          <div
            @click="toggleShow"
            class="ceu-btn2 black">
            Cancelar
          </div>
          <button
            type="submit"
            class="ceu-btn1">
            {{ (idPlate === 0) ? 'Agregar Plato' : 'Editar Plato' }}
          </button>
        </div>
      </form>
    </div>

    <Discount
      @toggle-show-discount="toggleShowDiscount"
      :id-commerce="idCommerce"
      :id-plate="idPlate"
      :show-modal-plate="showModalPlate" />
  </section>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import configService from '../../settings/api-url'
import Discount from './discount'
export default {
  name: 'Plate',
  props: {
    showModalPlate: {
      type: Boolean,
      default: false
    },
    idCommerce: {
      type: Number,
      default: 0
    },
    idPlate: {
      type: Number,
      default: 0
    },
    idCategory: {
      type: Number,
      default: 0
    }
  },
  components: {
    VueTimepicker,
    Discount
  },
  watch: {
    showModalPlate (valNew) {
      if (valNew) {
        this.getMofier()
      }
      if (valNew && this.idCategory !== 0) {
        this.fillForm()
      } else {
        this.emptyForm()
      }
    }
  },
  data () {
    return {
      formPlate: {
        name: '',
        tweet: '',
        description: '',
        price: '',
        prime_price: ''
      },
      selectModificadores: [],
      selectModificador: [],
      showModalDiscount: false
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-plate')
    },
    toggleShowDiscount (id) {
      this.showModalDiscount = !this.showModalDiscount
      console.log(this.showModalDiscount)
    },
    showDiscount (id) {
      // configService(`central_admin/categories/${id}/products.json`)
      //   .then(res => {
      //   })
      //   .catch(error => {
      //     console.log(error.response.data)
      //   })
    },
    fillForm () {
      configService(`/central_admin/products/${this.idPlate}`)
        .then(res => {
          const data = res.data
          this.formPlate = {
            name: data.name,
            tweet: data.tweet,
            description: data.description,
            price: data.price,
            prime_price: data.prime_price
          }
          for (let index = 0; index < data.product_options.length; index++) {
            let dataPosition = data.product_options[index]
            console.log(dataPosition)
            this.selectModificador.push({ value: dataPosition.id, label: dataPosition.title })
          }
        })
    },
    emptyForm () {
      this.formPlate = {
        name: '',
        tweet: '',
        description: '',
        price: '',
        prime_price: ''
      }
      this.selectModificador = []
    },
    getMofier () {
      this.selectModificadores = []
      configService(`central_admin/commerces/${this.idCommerce}/product_options`)
        .then(res => {
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            const dataPosition = data[index]
            this.selectModificadores.push({ value: dataPosition.id, label: dataPosition.title })
          }
        })
    },
    sendPlate () {
      if (this.idPlate === 0) {
        this.addPlate()
      } else {
        this.editPlate()
      }
    },
    addPlate () {
      const idsModificadores = []
      for (let index = 0; index < this.selectModificador.length; index++) {
        let dataPosition = this.selectModificador[index]
        idsModificadores.push(dataPosition.value)
      }
      const data = {
        'product': {
          'name': this.formPlate.name,
          'tweet': this.formPlate.tweet,
          'description': this.formPlate.description,
          'ordinal': '99999',
          'price': this.formPlate.price,
          'prime_price': this.formPlate.prime_price,
          'product_option_ids': idsModificadores
        }
      }
      configService(`/central_admin/categories/${this.idCategory}/products.json`, {
        method: 'POST',
        data
      })
        .then(res => {
          this.toggleShow()
          this.$emit('create-product')
          this.$swal({
            type: 'success',
            title: 'Plato Creado!',
            showConfirmButton: false,
            timer: 2500
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: error.response.data
          })
          console.log(error.response.data)
        })
    },
    editPlate () {
      const idsModificadores = []
      for (let index = 0; index < this.selectModificador.length; index++) {
        let dataPosition = this.selectModificador[index]
        idsModificadores.push(dataPosition.value)
      }
      console.log(idsModificadores)
      const data = {
        'product': {
          'name': this.formPlate.name,
          'tweet': this.formPlate.tweet,
          'description': this.formPlate.description,
          'ordinal': '99999',
          'price': this.formPlate.price,
          'prime_price': this.formPlate.prime_price,
          'product_option_ids': idsModificadores
        }
      }
      configService(`/central_admin/products/${this.idPlate}`, {
        method: 'PUT',
        data
      })
        .then(res => {
          console.log(res)
          this.toggleShow()
          this.$emit('create-product')
          this.$swal({
            type: 'success',
            title: 'Plato Editado!',
            showConfirmButton: false,
            timer: 2500
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: error.response.data
          })
          console.log(error.response.data)
        })
    }
  }
}
</script>
