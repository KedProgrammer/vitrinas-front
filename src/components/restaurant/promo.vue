<template>
  <section
    :class="{ 'modal-ceu__show': showModalPromo }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-promo medium">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant__promo-container">
          <div class="ceu-item s-40 no-padding">
            <v-date-picker
              mode='range'
              is-inline
              :show-caps="true"
              :theme-styles='themeStyles'
              v-model='myRange'
              :show-popove='false'
              tint-color="#9013fe"
              :attributes='attrs' />
          </div>
          <div class="ceu-item s-60 ceu-container2 no-padding">
            <div class="menu-restaurant__promo-title ceu-item s-50">
              <div class="ceu-campo__text-round2">
                <p>Nombre</p>
                <input
                  type="text"
                  placeholder="Nombre de Promoción"
                  class="ceu-campo__round">
              </div>
            </div>
            <div class="ceu-item s-50">
              <div class="menu-restaurant__promo-type">
                <p>Tipo de descuento</p>
                <multiselect
                  class="custom-select3"
                  v-model="typeSale"
                  :options="typeSales"
                  :searchable="false"
                  :show-labels="false"
                  label="label"
                  track-by="value"
                  placeholder="Selección" />
              </div>
            </div>
            <div class="ceu-item s-50">
              <div class="ceu-campo__text-round2">
                <p>Cantidad</p>
                <input
                  type="number">
              </div>
            </div>
            <div class="ceu-item s-50">
              <div class="ceu-campo__text-round2">
                <p>Valor</p>
                <input
                  type="text">
              </div>
            </div>
            <div class="menu-restaurant__payments ceu-item s-100">
              <h3>METODO DE PAGO</h3>
              <div class="menu-restaurant__payments-radio">
                <div class="lista-radio3">
                  <input
                    type="checkbox"
                    id="edit-efectivo">
                  <label for="edit-efectivo">
                    Efectivo
                  </label>
                </div>
                <div class="lista-radio3">
                  <input
                    type="checkbox"
                    id="edit-credito">
                  <label for="edit-credito">
                    Crédito
                  </label>
                </div>
                <div class="lista-radio3">
                  <input
                    type="checkbox"
                    id="edit-nequi">
                  <label for="edit-nequi">
                    NEQUI
                  </label>
                </div>
                <div class="lista-radio3">
                  <input
                    type="checkbox"
                    id="edit-datafono">
                  <label for="edit-datafono">
                    Datafono
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Promo',
  props: {
    showModalPromo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      myRange: {
        start: new Date(2018, 6, 9),
        end: new Date(2018, 6, 10)
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
      },
      typeSales: [
        {value: 0, label: 'Valor'},
        {value: 1, label: 'Porcentaje'}
      ],
      typeSale: []
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-promo')
    }
  }
}
</script>
