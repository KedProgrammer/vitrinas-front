<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-edit">
    <div
      @click="toggleShow"
      class="modal-ceu__overley"/>
    <div class="modal-ceu__content xlarge">
      <div
        @click="toggleShow"
        class="modal-ceu__close">
        <i class="ceu-icon-close" />
      </div>
      Edit
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleShow () {
      this.$emit('toggle-edit')
    }
  }
}
</script>
