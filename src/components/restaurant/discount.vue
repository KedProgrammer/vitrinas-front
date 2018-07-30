<template>
  <section
    :class="{ 'modal-ceu__show': showModalDiscount }"
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
        @submit.prevent="sendDiscount"
        class="menu-restaurant__content">
        <div class="ads-banner__dateLimit ceu-item s-55">
          <div class="ads-banner__dateLimit-item">
            <p>Fecha Inicial</p>
            <datetime
              required
              type="datetime"
              v-model="form.formatDateStart" />
          </div>
          <div class="ads-banner__dateLimit-item">
            <p>Fecha Final</p>
            <datetime
              required
              type="datetime"
              v-model="form.formatDateEnd" />
          </div>
        </div>
        <div class="menu-restaurant__add-title">
          <div class="cantidad">
            <p>Cantidad de usos</p>
            <input
              required
              v-model="form.cantidad"
              type="number">
          </div>
          <div class="cantidad">
            <p>Descuento</p>
            <input
              required
              v-model="form.promo_amount"
              type="number">
          </div>
          <div class="cantidad">
            <p>Tipo de Promocion</p>
            <v-select
              required
              :options="form.options"
              v-model="form.promo_type"
            />
          </div>
          <div class="cantidad">
            <p>Promocion activa</p>
            <div class="lista-checkbox2">
              <input
                v-model="form.active"
                type="checkbox"
                id="checkout-takeout-ucoins">
              <label
                for="checkout-takeout-ucoins"
                data-checkedsi="Si"
                data-checkedno="No"/>
            </div>
          </div>

          <div class="ceu-campo__text-round2">
            <p>Quien asume el descuento</p>
            <div class="lista-radio2">
              <input
                required
                type="radio"
                name="metodo-pago"
                id="metodo-pago-efectivo"
                v-model="form.asumme"
                value="comidaenlau"
              >
              <label for="metodo-pago-efectivo"> Comida en la U </label>
            </div>
            <!-- input radio -->
            <div class="lista-radio2">
              <input
                required
                type="radio"
                name="metodo-pago"
                id="metodo-pago-tarjeta-credito"
                value="universidad"
                v-model="form.asumme"
              >
              <label for="metodo-pago-tarjeta-credito"> Universidad </label>
            </div>
          </div>
          <div class="restaurant-edit__upload-file-promo">
            <p class="p-promo">Banner de promo</p>
            <div
              :style="{backgroundImage: 'url(' + form.image + ')'}"
              class="restaurant-edit__upload-image" />
            <label :for="'restaurant-edit__banner-input' + index">
              Upload
            </label>
            <input
              required
              @change="fileImage($event.target.files)"
              :id="'restaurant-edit__banner-input' + index"
              accept="image/*"
              type="file">
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
            {{ (idPlate === 0) ? 'Agregar Promo' : 'Editar Promo' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import configService from '../../settings/api-url'
import { mapState } from 'vuex'
export default {
  name: 'Discount',
  props: {
    showModalDiscount: {
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
    }
  },
  watch: {
    // showModalDiscount (valNew) {
    //   if (valNew) {
    //     this.getMofier()
    //   }
    //   if (valNew && this.idCategory !== 0) {
    //     this.fillForm()
    //   } else {
    //     this.emptyForm()
    //   }
    // }
  },
  data () {
    return {
      form: {
        options: ['porcentaje', 'amount'],
        formatDateStart: '',
        formatDateEnd: '',
        cantidad: '',
        asumme: '',
        image: '',
        promo_type: '',
        promo_amount: '',
        active: false
      }
    }
  },
  computed: {
    ...mapState(['university'])
  },
  methods: {
    fileImage (file) {
      console.log(file)
      const reader = new FileReader()
      const self = this
      reader.addEventListener('load', function () {
        console.log(reader.result)
        self.form.image = reader.result
      })
      if (file[0]) {
        reader.readAsDataURL(file[0])
      }
    },
    toggleShow () {
      this.$emit('close-modal')
    },
    fillForm () {
      configService(`/central_admin/products/${this.idPlate}`)
        .then(res => {
          const data = res.data
          this.form = {
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
      this.form = {
        name: '',
        tweet: '',
        description: '',
        price: '',
        prime_price: ''
      }
    },
    sendDiscount () {
      const data = {
        start_date: this.form.formatDateStart,
        end_date: this.form.formatDateEnd,
        product_id: this.idPlate,
        is_active: this.form.active,
        is_ceu: this.form.asumme,
        quantity: this.form.cantidad,
        promo_type: this.form.promo_type,
        promo_amount: this.form.promo_amount,
        banner: this.form.image
      }
      if (this.form.asumme === 'universidad') {
        data.is_ceu = true
      } else if (this.form.asumme === 'comidaenlau') {
        data.is_ceu = false
      }
      configService.post(`central_admin/universities/${this.university.id}/promos`, data)
        .then(response => {
          this.$swal({
            position: 'top-end',
            type: 'success',
            title: 'Promocion creada satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response.data)
          this.$emit('close-modal')
        })
        .catch(error => {
          console.log(error)
        })
      console.log(data)
    },
    addPlate () {
      // this.$emit('create-discount')
    },
    editPlate () {
      // this.$emit('create-discount')
    }
  }
}
</script>

<style scoped >
  .p-promo {
    color: #9013fe;
    font-weight: 500;
    margin-right: 20px;
    font-family: $font1;
    font-size: 15px;
    text-align: center;
  }
</style>
