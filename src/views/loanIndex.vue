<template>
  <div class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div class="filters">
      <img @click="$router.push({name: 'loan-create'})" src="../assets/images/vitrinas-icons/create.png">
      <img @click="payFees" src="../assets/images/vitrinas-icons/pagar cuota.png" >
    </div>
    <div class="loans">
      <loan :key="loan.id" v-for="loan in getLoans"
        :interestRate="loan.interest_rate"
        :amount="loan.amount"
        :feeValue="loan.fee_value"
        :remainingPayment="loan.remaining_payment"
        :periodType="loan.period_type"
        :name="loan.employee.name"
        :lastName="loan.employee.last_name"
        :cellphone="loan.employee.cellphone"
        :identification="loan.employee.identification"
        :id="loan.id"
        :capitalTotal="loan.total_payed"
      />
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import configService from '../settings/api-url'
import employerHeader from '../components/humanManagment/header'
import  createButton from '../components/humanManagment/createButton'
import loan from '../components/loans/loan'
export default {
  computed: {
    ...mapState(['loans']),
    ...mapGetters(['getLoans'])
  },
  components: {
    createButton,
    employerHeader,
    loan
  },
  methods: {
    ...mapMutations(['setLoans', 'setFilterByEmployer']),
    async payFees () {
      this.$swal({
        title: "Estas seguro??",
        text: "Se generara el pago de una cuota a todos los prestamos",
        showCancelButton: true
      })
      .then((willDelete) => {
        if (willDelete.value) {
          const { data } = configService.post('admin/fees/pay_fees')
          .then(response => {
            this.setLoans(response.data)

            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Cuotas pagadas!',
              showConfirmButton: false,
              timer: 1500
            })
          })
        } else {
          
        }
      });
    }
  },
  async created () {
    if (this.loans.length === 0) {
      const { data } = await configService(`admin/loans`)
      this.setLoans(data)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setFilterByEmployer(false)
    next()
  }
}
</script>