<template>
  <main class="admin-hoy__main">
    <Menu />
    <div class="view-variables__contenedor">
      <div class="ceu-container">
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
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Menu from '../components/layout/Menu'
import configService from '../settings/api-url'
export default {
  name: 'Variables',
  computed: {
    ...mapState(['university', 'commerces', 'commerce'])
  },
  components: {
    Menu
  },
  mounted () {
    this.$nextTick(function () {
      this.getVariables()
    })
  },
  data () {
    return {
      formRate: []
    }
  },
  watch: {
    university () {
      this.getVariables()
    }
  },
  methods: {
    getVariables () {
      configService(`/central_admin/universities/${this.university.id}/university_variables`)
        .then(res => {
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
            console.log(res.data)
            this.$swal({
              type: 'success',
              title: 'Cambios Aplicados!',
              timer: 2000,
              showConfirmButton: false
            })
          })
      })
    }
  }
}
</script>
