<template>
  <section
    :class="{ 'modal-ceu__show': showModalModifier }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-modifier xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant__modifier-title">
          <div class="ceu-campo__text-round2">
            <p>Nombre</p>
            <input type="text">
          </div>
          <div class="ceu-campo__text-round2">
            <p>Descripción</p>
            <textarea />
          </div>
        </div>
        <div class="ceu-container2">
          <div class="ceu-item s-100 menu-restaurant__modifier-multiselect">
            <p>Multiple Selección ?</p>
            <div class="admin-tabla__turno-checkbox">
              <input
                type="checkbox"
                id="restaurant__modifier-checked">
              <label
                for="restaurant__modifier-checked"
                data-si="Si"
                data-no="No"/>
            </div>
          </div>
          <div class="ceu-item s-50">
            <div class="ceu-campo__text-round2">
              <p>Minimo</p>
              <input type="text">
            </div>
          </div>
          <div class="ceu-item s-50">
            <div class="ceu-campo__text-round2">
              <p>Mamximo</p>
              <input type="text">
            </div>
          </div>
        </div>
        <div class="restaurant-menu__modifier-addons">
          <h3>Asignar Addons</h3>
          <div class="restaurant-menu__modifier-addons-add">
            <div class="ceu-item s-50">
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
            <div class="ceu-item s-50">
              <div class="ceu-campo__text-round2">
                <input
                  placeholder="Precio"
                  type="text">
              </div>
            </div>
            <div class="ceu-item s-100">
              <div class="ceu-btn1">
                Añadir
              </div>
            </div>
          </div>
          <h4>Lista Addons</h4>
          <div class="restaurant-menu__modifier-addons-list">
            <div class="restaurant-menu__modifier-addons-item">
              <div class="ceu-item s-50 restaurant-menu__modifier-addon-name">
                Salsa
              </div>
              <div class="ceu-item s-50">
                <div class="ceu-campo__text-round2">
                  <input
                    placeholder="Precio"
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-100 restaurant-menu__modifier-item-footer">
                Guardar
              </div>
            </div>
            <div class="restaurant-menu__modifier-addons-item">
              <div class="ceu-item s-50 restaurant-menu__modifier-addon-name">
                Salsa
              </div>
              <div class="ceu-item s-50">
                <div class="ceu-campo__text-round2">
                  <input
                    placeholder="Precio"
                    type="text">
                </div>
              </div>
              <div class="ceu-item s-100 restaurant-menu__modifier-item-footer">
                Guardar
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
  name: 'Modifier',
  props: {
    showModalModifier: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addons: [
        {value: 0, label: 'Domingo'},
        {value: 1, label: 'Lunes'},
        {value: 2, label: 'Martes'},
        {value: 3, label: 'Miercoles'},
        {value: 4, label: 'Jueves'},
        {value: 5, label: 'Viernes'},
        {value: 6, label: 'Sabado'}
      ],
      addon: ''
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-modifier')
    }
  }
}
</script>
