<template>
  <main class="admin-hoy__main">
    <Menu />
    <div class="view-variables__contenedor">
      <div class="ceu-container2">
        <div class="ceu-item s-50">
          <form
            @submit.prevent="sendRate"
            class="view-variables__item">
            <h2>Variables</h2>
            <div
              v-if="formRate.length !== 0"
              class="view-variables__table">
              <table>
                <tr>
                  <td>
                    Domicilio  primer plato Cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate[0].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Domicilio platos adicionales cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate[1].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out primer plato cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate[2].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato adicional cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate[3].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Domicilio primer plato Cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate[4].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Platos adicionales cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate[5].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato 1 cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate[6].value"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato adicional cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate[7].value"
                      type="text">
                  </td>
                </tr>
              </table>
            </div>
            <div class="view-variables__item-footer">
              <button
                class="ceu-btn1"
                type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
        <div class="ceu-item s-50">
          <form
            @submit.prevent="sendClosePlatform"
            class="view-variables__item">
            <h2>Mensajes visibles/inapp</h2>
            <div class="view__variables__msg-inapp">
              <div class="ceu-item s-60">
                <div class="view__variables__check">
                  <p>Plataforma</p>
                  <div
                    class="admin-tabla__turno-checkbox">
                    <input
                      type="checkbox"
                      v-model="openPlatform"
                      id="openPlatform">
                    <label
                      for="openPlatform"
                      data-si="On"
                      data-no="Off"/>
                  </div>
                </div>
              </div>
              <!--. item -->
              <div class="ceu-item s-60">
                <div class="ceu-campo__text4">
                  <p>Mensaje plataforma cerrada</p>
                  <textarea
                    required
                    v-model="messagePlatform"/>
                </div>
              </div>
              <!--. item -->
              <div class="ceu-item s-40">
                <div class="ceu-campo__text4">
                  <p>Hora Reapertura</p>
                  <vue-timepicker
                    hide-clear-button
                    v-model="timeHourPlatform"
                    :format="formatTime"/>
                </div>
              </div>
              <!--. item -->
              <div class="ceu-item s-100">
                <button
                  class="ceu-btn1"
                  type="submit">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Menu from '../components/layout/Menu'
import VueTimepicker from 'vue2-timepicker'
import configService from '../settings/api-url'
export default {
  name: 'Variables',
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  components: {
    Menu,
    VueTimepicker
  },
  mounted () {
    this.$nextTick(function () {
      this.getVariables()
      if (this.commerce === '') {
        this.updateCommerceAsync(this.university.id)
          .then(res => {
            this.openPlatform = res.data.is_open
          })
      }
    })
  },
  data () {
    return {
      formRate: [],
      timeHourPlatform: {HH: '00', mm: '00'},
      formatTime: 'HH:mm',
      messagePlatform: '',
      openPlatform: false
    }
  },
  watch: {
    university () {
      this.getVariables()
    }
  },
  methods: {
    ...mapActions(['updateCommerceAsync']),
    getVariables () {
      configService(`/central_admin/universities/${this.university.id}/university_variables`)
        .then(res => {
          console.log(res)
          const data = res.data
          for (let index = 0; index < data.length; index++) {
            this.formRate.push(data[index])
          }
        })
    },
    sendRate () {
      this.formRate.forEach((element, index) => {
        console.log(element)
        configService(`/central_admin/universities/${this.university.id}/university_variables/${element.name}`, {
          method: 'PUT',
          data: {
            value: element.value
          }
        })
          .then(res => {
            this.$swal({
              type: 'success',
              title: 'Cambios Aplicados!',
              timer: 2000,
              showConfirmButton: false
            })
          })
      })
    },
    sendClosePlatform () {
      const hour = `${this.timeHourPlatform.HH}:${this.timeHourPlatform.mm}`
      configService(`/central_admin/universities/${this.university.id}`, {
        method: 'PUT',
        data: {
          reopens_at: hour,
          is_open: this.openPlatform,
          welcome_message: this.messagePlatform
        }
      })
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Cambios Aplicados!',
            timer: 2000,
            showConfirmButton: false
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
