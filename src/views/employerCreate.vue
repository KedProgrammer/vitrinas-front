<template>
  <form class="employer_create-mainForm" @submit.prevent="sendEmployer">
    <img src="../assets/images/vitrinas-icons/photo.png" alt="">
    <div class="employer_create-mainForm-input">
      <div class="employer_create-mainForm-input-item">
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Nombres</span> <input   v-model="name" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">CC: </span> <input  v-model="identification" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Correo Electronico: </span> <input type="email"  v-model="email">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Fecha de ingreso: </span> <input  v-model="initialDate" type="text">
        </div>
        <div v-if="employerId !== 0" class="employer_create-mainForm-input-item-input">
          <button @click="goToLoans" class="createEmployer">Ver pagos</button>
        </div>
      </div>
      <div class="employer_create-mainForm-input-item">
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Apellidos</span> <input  v-model="lastName" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Celular 1:</span> <input  v-model="cellphone" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Edad: </span> <input  v-model="age" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <span class="spanInput">Cargo: </span> <input  v-model="jobPosition" type="text">
        </div>
        <div class="employer_create-mainForm-input-item-input">
          <button type="submit" class="createEmployer">{{ buttonName }}</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import configService from '../settings/api-url'
import employerHeader from '../components/humanManagment/header'
export default {
  data () {
    return {
      name: null,
      lastName: null,
      cellphone: null,
      initialDate: null,
      email: null,
      age: null,
      identification: null,
      jobPosition: null
    }
  },
  computed: {
    buttonName () {
      return this.employerId ? 'Editar' : 'Crear'
    },
    edited () {
      return this.employerId ? 'Usuario Editado!' : 'Usuario Creado!'
    },
    ...mapGetters(['getEmployer']),
    ...mapState(['employerId'])
  },
  components: {
    employerHeader
  },
  methods: {
    ...mapMutations(['setFilterByEmployer', 'addEmployer', 'updateEmployer']),
    goToLoans (event) {
      event.preventDefault();
      this.setFilterByEmployer(true);
      this.$router.push({name: 'loans'});
    },
    fillData () {
      const employer = this.getEmployer
      this.name = employer.name
      this.lastName = employer.lastName
      this.age = employer.age
      this.identification = employer.identification 
      this.jobPosition = employer.job_position
      this.cellphone = employer.cellphone
      this.initialDate = employer.initial_date
      this.email = employer.email
    },
    async sendEmployer () {
      const info = {
        employer: {
          name: this.name,
          last_name: this.lastName,
          age: this.age, 
          identification: this.identification, 
          job_position: this.jobPosition,
          cellphone: this.cellphone, 
          initial_date: this.initialDate,
          email: this.email
        }
      }

      try {
         if (this.employerId !== 0) {
           const { data } = await configService.put(`admin/employers/${this.employerId}`, info)
           this.updateEmployer(data)
        } else {
          const { data } = await configService.post(`admin/employers`, info)
          this.addEmployer(data)
        }

        this.$swal({
          position: 'center',
          type: 'success',
          title: this.edited,
          showConfirmButton: false,
          timer: 1500
        })

        this.$router.push({name: 'employer-index'})
      } catch (error) {
        this.$swal({
          position: 'center',
          type: 'error',
          title: 'No se pudo crear el usuario!',
          showConfirmButton: false,
          timer: 1500
        }) 
      }
    }
  },
  created () {
    if (this.employerId !== 0) {
      this.fillData()
    }
  }
}
</script>