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
              <input type="text">
            </div>
          </div>
          <div class="ceu-item s-100">
            <p>Disponibilidad</p>
            <div class="admin-tabla__turno-checkbox">
              <input
                type="checkbox"
                id="restaurant-status__c">
              <label
                for="restaurant-status__c"
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
            Agregar
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

    }
  },
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  data () {
    return {
      form: {
        numUser: ''
      },
      dataUser: {}
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-add')
    },
    addAddons () {
    },
    agregarDomiciliario () {
      this.$emit('reload-table')
    }
  }
}
</script>
