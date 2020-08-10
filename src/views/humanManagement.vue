<template>
<div class="employes">
  <employer-header />
  <router-view />
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

<style>

</style>