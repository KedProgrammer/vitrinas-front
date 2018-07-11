<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit__menu">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-restaurant xlarge">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant-panels">
          <div class="menu-restaurant__panel ceu-item s-30 no-padding">
            <div class="menu-restaurant__panel-title">
              <h5>Categorías</h5>
            </div>
            <div class="menu-restaurant__panel-list">
              <!-- item -->
              <div class="menu-restaurant__panel-item">
                <div class="menu-restaurant__panel-edit-delete">
                  <div
                    @click="toggleShowCategory('id')"
                    class="menu-restaurant__panel-edit">
                    <i class="ceu-icon-settings" />
                  </div>
                </div>
                <div class="menu-restaurant__panel-item-info">
                  <div class="menu-restaurant__panel-nombre">
                    Platos
                  </div>
                  <div class="menu-restaurant__panel-active">
                    <div
                      data-id=""
                      class="admin-tabla__turno-checkbox">
                      <input
                        type="checkbox"
                        id="restaurant-status__">
                      <label
                        for="restaurant-status__"
                        data-si="On"
                        data-no="Off"/>
                    </div>
                  </div>
                  <div class="menu-restaurant__panel-arrow">
                    <i class="ceu-icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Añadir -->
            <div
              @click="toggleShowCategory"
              class="menu-restaurant__panel-btn">
              Añadir Categoría
            </div>
          </div>
          <div class="menu-restaurant__panel ceu-item s-30 no-padding">
            <div class="menu-restaurant__panel-title">
              <h5>Platos</h5>
            </div>
            <div class="menu-restaurant__panel-list">
              <!-- item -->
              <div class="menu-restaurant__panel-item">
                <div class="menu-restaurant__panel-edit-delete one">
                  <div class="menu-restaurant__panel-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                </div>
                <div class="menu-restaurant__panel-item-info active">
                  <div class="menu-restaurant__panel-nombre">
                    Platos
                  </div>
                  <div class="menu-restaurant__panel-active">
                    <div
                      data-id=""
                      class="admin-tabla__turno-checkbox">
                      <input
                        type="checkbox"
                        id="restaurant-status__c">
                      <label
                        for="restaurant-status__c"
                        data-si="On"
                        data-no="Off"/>
                    </div>
                  </div>
                  <div class="menu-restaurant__panel-arrow">
                    <i class="ceu-icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Añadir -->
            <div
              @click="toggleShowPlate"
              class="menu-restaurant__panel-btn">
              Añadir Plato
            </div>
          </div>
          <div class="menu-restaurant__panel menu-restaurant__edit ceu-item s-40 no-padding">
            <div class="menu-restaurant__panel-title">
              <h5>Editar</h5>
            </div>
            <div class="menu-restaurant__edit-title">
              <div class="ceu-campo__text-round2">
                <p>Titulo</p>
                <input
                  type="text"
                  value="Hamburguesa de queso"
                  class="ceu-campo__round">
              </div>
            </div>
            <div class="menu-restaurant__edit-description">
              <div class="ceu-campo__text-round2">
                <p>Descripción</p>
                <textarea name="" />
              </div>
            </div>
            <div class="menu-restaurant__edit-precios">
              <div class="cue-item padding s-50">
                <div class="ceu-campo__text-round2">
                  <p>Precio</p>
                  <input
                    type="text">
                </div>
              </div>
              <div class="cue-item padding s-50">
                <div class="ceu-campo__text-round2">
                  <p>Prime</p>
                  <input
                    type="text"
                    class="ceu-campo__round">
                </div>
              </div>
              <div class="cue-item padding s-50">
                <div class="ceu-campo__text-round2">
                  <p>Calorias</p>
                  <input
                    type="text"
                    class="ceu-campo__round">
                </div>
              </div>
            </div>
            <div class="menu-restaurant__todo">
              <h3>Precio promocional</h3>
              <div class="menu-restaurant__todo-search">
                <multiselect
                  class="custom-select3 s-70"
                  v-model="days"
                  :options="dayWeeks"
                  :searchable="false"
                  :show-labels="false"
                  label="label"
                  track-by="value"
                  placeholder="Selección" />
                <div class="menu-restaurant__todo-options s-30">
                  <div class="menu-restaurant__todo-add">
                    +
                  </div>
                  <div
                    @click="toggleShowPromo"
                    class="menu-restaurant__todo-edit">
                    <i class="ceu-icon-settings" />
                  </div>
                  <div class="menu-restaurant__todo-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                </div>
              </div>
              <ul class="menu-restaurant__todo-list">
                <li> <span>x</span> Dia Alitas 1</li>
                <li> <span>x</span> Dia Alitas 2</li>
                <li> <span>x</span> Dia Alitas 3</li>
                <li> <span>x</span> Dia Alitas 4</li>
              </ul>
              <div class="menu-restaurant__todo-footer">
                <span>+ Añadir promoción</span>
              </div>
            </div>
            <!--. promocional -->
            <div class="menu-restaurant__todo">
              <h3>Grupo modificador</h3>
              <div class="menu-restaurant__todo-search">
                <multiselect
                  class="custom-select3 s-70"
                  v-model="days"
                  :options="dayWeeks"
                  :searchable="false"
                  :show-labels="false"
                  label="label"
                  track-by="value"
                  placeholder="Selección" />
                <div class="menu-restaurant__todo-options s-30">
                  <div class="menu-restaurant__todo-add">
                    +
                  </div>
                  <div
                    @click="toggleShowModifier"
                    class="menu-restaurant__todo-edit">
                    <i class="ceu-icon-settings" />
                  </div>
                  <div class="menu-restaurant__todo-delete">
                    <i class="ceu-icon-garbage" />
                  </div>
                </div>
              </div>
              <ul class="menu-restaurant__todo-list">
                <li> <span>x</span> Elige tu salsa</li>
                <li> <span>x</span> Elige tu Acompañamiento</li>
                <li> <span>x</span> Dia Alitas 3</li>
                <li> <span>x</span> Elige tu Bebida</li>
              </ul>
              <div class="menu-restaurant__todo-footer">
                <span>+ Añadir grupo modificador</span>
              </div>
            </div>
            <!--. Grupo modificador -->
          </div>
        </div>
      </div>
    </div>

    <!-- promo -->
    <Promo
      @toggle-show-promo="toggleShowPromo"
      :show-modal-promo="showModalPromo" />
    <!-- modifier -->
    <Modifier
      @toggle-show-modifier="toggleShowModifier"
      :show-modal-modifier="showModalModifier" />
    <!-- category -->
    <Category
      @toggle-show-category="toggleShowCategory"
      :show-modal-category="showModalCategory" />
    <!-- Plate -->
    <Plate
      @toggle-show-plate="toggleShowPlate"
      :show-modal-plate="showModalPlate" />
  </section>
</template>

<script>
import Promo from './promo.vue'
import Modifier from './modifier-group.vue'
import Category from './category'
import Plate from './plate.vue'

export default {
  name: 'MenuRestaurant',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    idRestaurant: {
      type: Number,
      default: 0
    }
  },
  components: {
    Promo,
    Modifier,
    Category,
    Plate
  },
  data () {
    return {
      dayWeeks: [
        {value: 0, label: 'Domingo'},
        {value: 1, label: 'Lunes'},
        {value: 2, label: 'Martes'},
        {value: 3, label: 'Miercoles'},
        {value: 4, label: 'Jueves'},
        {value: 5, label: 'Viernes'},
        {value: 6, label: 'Sabado'}
      ],
      days: [],
      showModalPromo: false,
      showModalModifier: false,
      showModalCategory: false,
      showModalPlate: false
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-menu-restaurant')
    },
    toggleShowPromo () {
      this.showModalPromo = !this.showModalPromo
    },
    toggleShowPlate () {
      this.showModalPlate = !this.showModalPlate
    },
    toggleShowCategory () {
      this.showModalCategory = !this.showModalCategory
    },
    toggleShowModifier () {
      this.showModalModifier = !this.showModalModifier
    }
  }
}
</script>
