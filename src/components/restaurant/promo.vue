<template>
  <section
    :class="{ 'modal-ceu__show': showModalPromo }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content modal-ceu__menu-promo xsmall">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      <div class="menu-restaurant__content">
        <div class="menu-restaurant__promo-title">
          <div class="ceu-campo__text-round2">
            <p>Promo</p>
            <input
              type="text"
              value=""
              class="ceu-campo__round">
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

    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-show-promo')
    }
  }
}
</script>
