<template>
  <div class="employer_create-mainForm">
    <img src="../assets/images/employers/employer.png" alt="">
    <div class="employer_create-mainForm-input">
      <div class="employer_create-mainForm-input-item">
        <span>Nombres</span> <input type="text">
        <span>Apellidos</span> <input type="text">
      </div>
      <div class="employer_create-mainForm-input-item">
        <span>CC: </span> <input type="text">
        <span>Celular 1:</span> <input type="text">
      </div>
      <div class="employer_create-mainForm-input-item">
        <span>Correo Electronico: </span> <input type="text">
      </div> 
    </div>
  </div>
</template>

<script>
import employerHeader from '../components/humanManagment/header'
export default {
  components: {
    employerHeader
  }
}
</script>