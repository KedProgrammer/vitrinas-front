<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-category medium">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <form
        @submit.prevent="sendCoupon"
        class="menu-restaurant__content ceu-container2">
        <div class="admin-resumen__calendario ceu-item s-40">
          <v-date-picker
            required
            mode='range'
            is-inline
            :show-caps="true"
            :theme-styles='themeStyles'
            v-model='myRange'
            :show-popove='false'
            tint-color="#9013fe"
            :attributes='attrs' />
        </div>
        <div class="ceu-item s-60">
          <div class="ads-banner__dateLimit ceu-container2">
            <div class="ads-banner__dateLimit-item s-50">
              <p>Grupo</p>
              <v-select
                required
                class="search-select"
                v-model="groupOption"
                :options="groups"/>
            </div>
            <div class="ads-banner__dateLimit-item s-50">
              <p>Tipo</p>
              <v-select
                required
                class="custom-select2"
                :options="types"
                v-model="type"
              />
            </div>
          </div>
          <div class="menu-restaurant__add-title ceu-container2">
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Valor</p>
              <input
                required
                v-model="value"
                type="number">
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Codigo</p>
              <input
                required
                v-model="code">
            </div>
            <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Cantidad de usos</p>
              <input
                required
                v-model="amount"
                type="number">
            </div>
            <!-- <div class="ceu-campo__text-round3 ceu-item s-50">
              <p>Veces por usuario</p>
              <input
                required
                v-model="timesPerUser"
                type="number">
            </div> -->
            <div class="ceu-campo__text-round3 ceu-item s-100">
              <p>Restaurantes</p>
              <multiselect
                required
                class="custom-select3"
                v-model="commercesOptions"
                :options="commerces"
                :searchable="false"
                :close-on-select="false"
                :show-labels="false"
                :multiple="true"
                label="label"
                track-by="value"
                placeholder="Multi Selección" />
            </div>
          </div>
        </div>
        <div class="menu-restaurant__add-title ceu-container2">
          <div class="ceu-campo__text-round2 ceu-item s-50">
            <p>Valor</p>
            <input
              v-if="isPercentage"
              required
              v-model="value"
              min="1"
              max="100"
              placeholder="1-100"
              type="number">
            <input
              v-else
              required
              v-model="value"
              type="number">
          </div>
          <div class="ceu-campo__text-round2 ceu-item s-50">
            <p>Codigo</p>
            <input
              required
              v-model="code">
          </div>
          <div class="ceu-campo__text-round2 ceu-item s-50">
            <p>Cantidad de usos</p>
            <input
              required
              v-model="amount"
              type="number">
          </div>
          <!-- <div class="ceu-campo__text-round2 ceu-item s-50">
            <p>Veces por usuario</p>
            <input
              required
              v-model="timesPerUser"
              type="number">
          </div> -->
          <div class="ads-banner__dateLimit-item">
            <p>Restaurantes</p>
            <multiselect
              required
              class="custom-select3"
              v-model="commercesOptions"
              :options="commerces"
              :searchable="false"
              :close-on-select="false"
              :show-labels="false"
              :multiple="true"
              label="label"
              track-by="value"
              placeholder="Multi Selección" />
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
            Crear Cupon
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import configService from '../../settings/api-url'
export default {
  data () {
    return {
      isPercentage: false,
      commercesOptions: [],
      groupOption: '',
      groups: [],
      types: ['monetary_discount', 'percentage_discount'],
      type: '',
      value: '',
      commerces: [],
      commerce: '',
      timesPerUser: '',
      code: '',
      amount: '',
      myRange: {
        start: new Date(),
        end: new Date()
      },
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080'
          },
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date(2018, 0, 1)
        }
      ],
      themeStyles: {
        wrapper: {
          backgroundColor: '#fff',
          borderRadius: '6px',
          border: '1px solid #e5edef'
        },
        weekdayHorizontalDivider: {
          borderBottom: 'solid #000 1px'
        },
        weekdaysHorizontalDivider: {
          borderBottom: 'solid #9013fe 1px',
          width: '90%'
        },
        weekdays: {
          padding: `8px`,
          color: '#9013fe'
        },
        dayContent: {
          borderRadio: '50%'
        }
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    type (event, old) {
      if (event === 'percentage_discount') {
        console.log('hola percentaje')
        this.isPercentage = true
      } else if (event === 'monetary_discount') {
        console.log('hola otro')
        this.isPercentage = false
        console.log(this.isPercentage)
      }
    }
  },
  methods: {
    sendCoupon () {
      if (this.isPercentage) {
        this.value = this.value / 100
      }
      const data = {
        coupon: {
          code: this.code,
          coupon_type: this.type,
          discount: this.value,
          start_date: this.myRange.start,
          end_date: this.myRange.end,
          commerce_ids: this.commercesOptions.map(element => element.value),
          group_id: this.groupOption.value,
          amount_of_uses: this.amount
        }
      }
      console.log(data)
      configService.post(`/central_admin/universities/${this.$store.state.university.id}/coupons`, data)
        .then(response => {
          this.$swal({
            position: 'top-end',
            type: 'success',
            title: 'El cupon  ha sido creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response.data)
          this.code = ''
          this.type = ''
          this.value = ''
          this.myRange.start = new Date()
          this.myRange.end = new Date()
          this.commercesOptions = []
          this.groupOption = ''
          this.amount = ''
          this.$emit('toggle-add')
          this.$emit('new-coupon', response.data)
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        })
    },
    toggleShow () {
      this.$emit('toggle-add')
    }
  },
  created () {
    configService(`/central_admin/universities/${this.$store.state.university.id}/commerces`)
      .then(response => {
        this.commerces = response.data.map(element => ({value: element.id, label: element.commercial_name}))
      })
    configService(`/central_admin/universities/${this.$store.state.university.id}/groups`)
      .then(response => {
        this.groups = response.data.map(element => ({value: element.id, label: element.name}))
      })
  }
}
</script>

<style>

</style>
