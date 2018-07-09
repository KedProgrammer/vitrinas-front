<template>
  <section
    :class="{ 'modal-ceu__show': showModal }"
    class="modal-ceu modal-add">
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
        @submit.prevent="buscar"
        class="modal-add__content">
        <!-- campo principal -->
        <div class="modal-add__name-retaurant">
          <input
            placeholder="Número usuario"
            autocomplete="tel"
            v-model="form.numUser"
            required
            type="text">
        </div>
        <!-- submit -->
        <div class="modal-add__footer main-center">
          <button
            class="ceu-btn1"
            type="submit">
            Buscar
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
    buscar () {
      configService(`/central_admin/universities/${this.university.id}/normal_users/search?cellphone=${this.form.numUser}`)
        .then(res => {
          console.log(res)
          const data = res.data
          if (data !== null) {
            this.$swal({
              title: 'Confirmar',
              html: `Encontramos al usuario <strong>${data.first_name} ${data.last_name}!</strong> con el correo <strong>${data.email}</strong>. ¿Quieres agregarlo como domiciliario ?`,
              type: 'success',
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonColor: '#9013fe',
              cancelButtonColor: '#ff6767',
              confirmButtonText: 'Agregar!'
            }).then((result) => {
              if (result.value) {
                configService(`/central_admin/universities/${this.university.id}/normal_users/${data.id}/hire`)
                  .then(resChild => {
                    this.toggleShow()
                    this.$emit('reload-table')
                  })
              }
            })
          } else {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'No encontramos nada..'
            })
          }
        })
    },
    agregarDomiciliario () {
      this.$emit('reload-table')
    }
  }
}
</script>
