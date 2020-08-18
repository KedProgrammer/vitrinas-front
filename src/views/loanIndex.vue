<template>
  <div class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div @click="$router.push({name: 'loan-create'})" class="filters">
      <img src="../assets/images/vitrinas-icons/create.png" alt="" class="employe_filters-item">
    </div>
    <div class="loans">
      <loan :key="loan.id" v-for="loan in loans"
        :interestRate="loan.interest_rate"
        :amount="loan.amount"
        :feevalue="loan.fee_value"
        :remainingPayment="loan.remaining_payment"
        :periodType="loan.perdiod_type"
        :name="loan.employee.name"
        :lastName="loan.employee.last_name"
        :cellphone="loan.employee.cellphone"
        :identification="loan.employee.identification"
        :id="loan.id"
        :capitalTotal="loan.capital_total"
      />
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import configService from '../settings/api-url'
import employerHeader from '../components/humanManagment/header'
import  createButton from '../components/humanManagment/createButton'
import loan from '../components/loans/loan'
export default {
  computed: mapState(['loans']),
  components: {
    createButton,
    employerHeader,
    loan
  },
  methods: {
    ...mapMutations(['setLoans'])
  },
  async created () {
    if (!this.loans) {
      const { data } = await configService(`admin/loans`)
      this.setLoans(data)
    }
  }
}
</script>