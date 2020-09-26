<template>
  <div v-if="loans.length !== 0" class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div class="employer_create-mainForm">
      <div class="employer_create-mainForm-assetContainer">
        <img src="../assets/images/vitrinas-icons/photo.png" class="loans_item-info-photo">
        <strong>{{ `${getLoan(this.$route.params.id).employee.name} ${getLoan(this.$route.params.id).employee.last_name}` }}</strong>
      </div>
      <div class="main-info">
        <div class="main-info-items">
          <img src="../assets/images/loans/green.png" alt="">
          <span id="main-info-span">{{ getLoan(this.$route.params.id).amount }}</span>
          <span @click="deleteLoan" id="main-info-span"> Eliminar Prestamo </span>
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
          <!-- <div class="loans_item-grey-text" id="period">
            <span>Periodicidad</span>
            <span>{{ getLoan(this.$route.params.id).period_type }}</span>
          </div> -->
          <div class="loans_item-grey-text">
            <span>Total abonado</span>
            <span>{{ getLoan(this.$route.params.id).total_payed }}</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Total restante</span>
            <span>{{ getLoan(this.$route.params.id).remaining_payment }}</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Numero cuotas</span>
            <span>{{ this.fees.length }}</span>
          </div>
          <div class="loans_item-grey-text">
            <span>Cuotas pagadas</span>
            <span>{{ payedFees }}</span>
          </div>
          <img class="showPay" @click="payFee" src="../assets/images/vitrinas-icons/pagar cuota.png" >
          <img class="showPay" @click="rollbackPayment" src="../assets/images/vitrinas-icons/eliminar cuota.png" >
          
        </div>
        <div class="main-loan-info">
          <table class="main_loan-table">
            <thead>
              <th>
                Estatus
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
              <th>
                Fecha de pago
              </th>
            </thead>
            <tbody>
              <tr :key="fee.id" v-for="fee in fees">
                <!-- <td class="dedito">
                  <img  v-if="fee.status == 'payed'" src="../assets/images/loans/dedito.png" id="dedito">
                </td> -->
                 <td :class="{red: fee.status === 'Pagado'}">
                  {{ fee.status }}
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
                <td>
                  {{ fee.payment_date }}
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import configService from '../settings/api-url'
import employerHeader from '../components/humanManagment/header'
export default {
  data () {
    return {
      fees: null
    }
  },
  computed: {
    ...mapGetters(['getLoan']),
    ...mapState(['loans']),
    payedFees () {
      return this.fees.filter(fee => fee.status == 'Pagado').length
    }
  },
  components: {
    employerHeader
  },
  methods: {
    ...mapMutations(['setLoans', 'updateLoan', 'destroyLoan']),
    payFee () {
      this.$swal({
        title: "Estas seguro??",
        text: "Se pagara una cuota del prestamo",
        showCancelButton: true
      })
      .then((willDelete) => {
        if (willDelete.value) {
          configService.post('admin/loans/' + this.$route.params.id + '/fees/pay_fee')
          .then(response => {
            this.fees = [...response.data.fees]
            this.updateLoan(response.data)
            this.$swal({
            position: 'center',
            type: 'success',
            title: 'Cuota pagada!',
            showConfirmButton: false,
            timer: 1500
            })
          })
          .catch(error => {
            this.$swal({
            position: 'center',
            type: 'error',
            title: 'Error al paga la cuota!',
            showConfirmButton: false,
            timer: 1500
            })
          })
        }
      });
    },
    rollbackPayment () {
      this.$swal({
        title: "Estas seguro??",
        text: "Se devolvera una cuota del prestamo",
        showCancelButton: true
      })
      .then((willDelete) => {
        if (willDelete.value) {
          configService.post('admin/loans/' + this.$route.params.id + '/fees/rollback_fee')
          .then(response => {
            this.fees = [...response.data.fees]
            this.updateLoan(response.data)
            this.$swal({
            position: 'center',
            type: 'success',
            title: 'Se ha devolvido una cuota del prestamo!',
            showConfirmButton: false,
            timer: 1500
            })
          })
          .catch(error => {
            this.$swal({
            position: 'center',
            type: 'error',
            title: 'Error al devolver la cuota!',
            showConfirmButton: false,
            timer: 1500
            })
          })
        }
      });
    },
    deleteLoan () {
      this.$swal({
        title: "Estas seguro??",
        text: "Se borrara el prestamo",
        showCancelButton: true
      })
      .then((willDelete) => {
        if (willDelete.value) {
          configService.delete('admin/loans/' + this.$route.params.id)
          .then(response => {
            this.destroyLoan(this.$route.params.id)
            this.$swal({
            position: 'center',
            type: 'success',
            title: 'Se ha eliminado el prestamo!',
            showConfirmButton: false,
            timer: 1500
            })

            this.$router.push({ name: 'loans'})
          })
          .catch(error => {
            this.$swal({
            position: 'center',
            type: 'error',
            title: 'Error al eliminar el prestamo!',
            showConfirmButton: false,
            timer: 1500
            })
          })
        }
      });
    }
  },
  async created () {
    let { data } = await configService('admin/loans/' + this.$route.params.id + '/fees')
    this.fees = data

    if (this.loans.length === 0) {
      let { data } = await configService(`admin/loans`)
      this.setLoans(data)
    }
  },
}
</script>