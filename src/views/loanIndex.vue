<template>
  <div class="employes">
    <employer-header> <h4>Prestamos</h4></employer-header>
    <div class="filters">
      <img src="../assets/images/vitrinas-icons/create.png" alt="" class="employe_filters-item">
    </div>
    <div class="loans">
      <div class="loans_item">
        <img src="../assets/images/loans/green.png" alt="">
        <div class="loans_item-price">
          500.000
        </div>
        <div class="loans_item-rate">
          <span>Tasa de interes</span>
          <span>4%</span>
        </div>
        <div class="loans_item-grey-text">
          <span>Valor cuota</span>
          <span>500.000</span>
        </div>
        <div class="loans_item-grey-text" id="period">
          <span>Periodicidad</span>
          <span>SEM</span>
        </div>
        <div class="loans_item-grey-text">
          <span>Total abonado</span>
          <span>500.000</span>
        </div>
        <img src="../assets/images/vitrinas-icons/photo.png" class="loans_item-info-photo">
        <div class="loans_item-employer-info">
          <span>Daniel Tobon</span>
           <span>C.C 1152439887</span>
           <span><img src="../assets/images/vitrinas-icons/celu.png" class="employers_index-item-celu">3146792462</span>
        </div>
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