<template>
  <div class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div class="employer_create-mainForm">
      <img src="../assets/images/vitrinas-icons/photo.png" class="loans_item-info-photo">
      <div class="main-info">
        <div class="main-info-items">
          <img src="../assets/images/loans/green.png" alt="">
          <span id="main-info-span">{{ getLoan(this.$route.params.id).amount }}</span>
        </div>
        <div class="main-info-items">
          <div class="loans_item-rate">
            <span>Tasa de interes</span>
            <span>{{ getLoan(this.$route.params.id).interest_rate }}%</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Valor cuota</span>
            <span>{{ getLoan(this.$route.params.id).fee_value }}</span>
          </div>
          <div class="loans_item-grey-text" id="period">
            <span>Periodicidad</span>
            <span>{{ getLoan(this.$route.params.id).period_type }}</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Total abonado</span>
            <span>{{ getLoan(this.$route.params.id).capital_total }}</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Total restante</span>
            <span>{{ getLoan(this.$route.params.id).remaining_payment }}</span>
          </div>
        </div>
        <div class="main-loan-info">
          <table class="main_loan-table">
            <thead>
              <th>
                
              </th>
              <th>
                Cuota
              </th>
              <th>
                Intereses
              </th>
              <th>
                Capital
              </th>
              <th>
                Saldo
              </th>
            </thead>
            <tbody>
              <tr :key="fee.id" v-for="fee in fees">
                <td class="dedito">
                  <img  v-if="fee.status == 'payed'" src="../assets/images/loans/dedito.png" id="dedito">
                </td>
                <td>
                  {{ fee.value }}
                </td>
                <td>
                  {{ fee.interest_amount }}
                </td>
                <td>
                  {{ fee.capital_payment }}
                </td>
                <td>
                  {{ fee.balance }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import configService from '../settings/api-url'
import employerHeader from '../components/humanManagment/header'
export default {
  data () {
    return {
      fees: null
    }
  },
  computed: mapGetters(['getLoan']),
  components: {
    employerHeader
  },
  async created () {
    const { data } = await configService('admin/loans/' + this.$route.params.id + '/fees')
    this.fees = data
  },
}
</script>