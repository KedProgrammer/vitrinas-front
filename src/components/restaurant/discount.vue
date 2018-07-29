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
              type="datetime"
              v-model="form.formatDateStart" />
          </div>
          <div class="ads-banner__dateLimit-item">
            <p>Fecha Final</p>
            <datetime
              type="datetime"
              v-model="form.formatDateEnd" />
          </div>
        </div>
        <div class="menu-restaurant__add-title">
          <div class="ceu-campo__text-round2">
            <p>Titulo</p>
            <input
              required
              v-model="form.name"
              type="text">
          </div>
          <div class="ceu-campo__text-round2">
            <p>Resumen</p>
            <textarea
              required
              v-model="form.tweet"
              maxlength="120" />
          </div>
          <div class="ceu-campo__text-round2">
            <p>Descrpción</p>
            <textarea
              required
              v-model="form.description" />
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
        name: '',
        formatDateStart: '',
        formatDateEnd: ''
      }
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-discount')
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
      if (this.idPlate === 0) {
        this.addPlate()
      } else {
        this.editPlate()
      }
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
