<template>
  <main class="admin-hoy__main">
    <Menu />
    <div class="view-variables__contenedor">
      <div class="ceu-container">
        <div class="ceu-item s-50">
          <form
            @submit.prevent="sendRate"
            class="view-variables__item">
            <h2>Tarifas</h2>
            <div class="view-variables__table">
              <table>
                <tr>
                  <td>
                    Domicilio  primer plato Cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate.first_dish_delivery"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Domicilio platos adicionales cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate.second_dish_delivery"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out primer plato cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate.first_dish_take_out"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato adicional cliente
                  </td>
                  <td>
                    <input
                      v-model="formRate.second_dish_take_out"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Domicilio primer plato Cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate.second_dish_take_out_prime"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Platos adicionales cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate.first_dish_take_out_prime"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato 1 cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate.first_dish_delivery_prime"
                      type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    Take out plato adicional cliente prime
                  </td>
                  <td>
                    <input
                      v-model="formRate.second_dish_delivery_prime"
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
      formRate: {
        'first_dish_delivery': '',
        'second_dish_delivery': '',
        'first_dish_take_out': '',
        'second_dish_take_out': '',
        'second_dish_take_out_prime': '',
        'first_dish_take_out_prime': '',
        'first_dish_delivery_prime': '',
        'second_dish_delivery_prime': ''
      }
    }
  },
  methods: {
    getVariables () {
      configService(`/central_admin/universities/${this.university.id}/university_variables`)
        .then(res => {
          const data = res.data
          this.formRate.first_dish_delivery = data[0].value
          this.formRate.second_dish_delivery = data[1].value
          this.formRate.first_dish_take_out = data[2].value
          this.formRate.second_dish_take_out = data[3].value
          this.formRate.second_dish_take_out_prime = data[4].value
          this.formRate.first_dish_take_out_prime = data[5].value
          this.formRate.first_dish_delivery_prime = data[6].value
          this.formRate.second_dish_delivery_prime = data[7].value
        })
    },
    sendRate () {
      for (let index = 1; index < 9; index++) {
        configService(`/central_admin/universities/${this.university.id}/university_variables/${index}`, {
          method: 'PUT'
        })
          .then(res => {
            console.log(res)
          })
      }
    }
  }
}
</script>
