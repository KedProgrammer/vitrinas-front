<template>
  <form class="employer_create-mainForm" @submit.prevent="sendLoan">
    <div class="employer_create-mainForm-input">
      <div class="employer_create-mainForm-input-item">
        <div class="employer_create-mainForm-input-item-input">
          <span class='spanInput'>Monto</span> <input required v-model="amount" type="number">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class='spanInput'>Tasa de interes mensual </span> <input  required v-model="interestRate" type="number">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class='spanInput'>numero de meses: </span> <input type="number"  required v-model="months">
        </div>
         <div class="employer_create-mainForm-input-item-input">
          <button type="submit">Crear prestamo</button>
        </div>
      </div>
      <div class="employer_create-mainForm-input-item">
        <div v-if="employers" class="employer_create-mainForm-input-item-input">
          <v-select
            required
            v-model="employerName"
            :options="getEmployersNames"/>
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class='spanInput'>Cuota de prestamo: </span> <input disabled required type="text"  v-model="feeFormatedValue">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <button @click="getFeeValue">Calcular cuota</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import configService from '../settings/api-url'
export default {
  data () {
    return {
      amount: null,
      interestRate: null,
      months: null,
      employerName: '',
      feeValue: null,
      feeFormatedValue: null
    }
  },
  computed: {
    ...mapState(['employers']),
    ...mapGetters(['getEmployersNames'])
  },
  methods: {
    ...mapMutations(['setEmployers', 'setLoan']),
    async getFeeValue (event) {
      event.preventDefault();
      if (this.amount && this.interestRate && this.months) {
        const { data } = await configService('/admin/fees/value?amount=' + this.amount + 
        '&interest_rate=' + this.interestRate + '&months=' + this.months)
        this.feeFormatedValue = data.formated_number
        this.feeValue = data.value
      }
    },
    async sendLoan () {
      const info = {
        amount: parseInt(this.amount),
        interest_rate: parseInt(this.interestRate),
        period_type: 0,
        period_number: parseInt(this.months)
      }

      try {
        const { data } = await configService.post(`admin/employers/${this.employerName.value}/loans`, info)
        this.$swal({
          position: 'center',
          type: 'success',
          title: 'Prestamo creado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.setLoan(data)
        this.$router.push({ name: 'loan-show', params: {id: data.id}})
      } catch (error) {
        this.$swal({
          position: 'center',
          type: 'error',
          title: 'Hubo un error al crear el prestamo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  },
  async created () {
    if (!this.employers) {
      const { data }  = await configService.get('admin/employers')
      this.setEmployers(data)
    }
  }
}
</script>