<template>
  <div class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div class="filters">
      <img src="../assets/images/vitrinas-icons/create.png" alt="" class="employe_filters-item">
    </div>
    <div class="loans">
      <div class="loans_item">
        
      </div>
    </div>
  </div>
</template>


<script>
import employerHeader from '../components/humanManagment/header'
import  createButton from '../components/humanManagment/createButton'
export default {
  components: {
    createButton,
    employerHeader
  }
}
</script>