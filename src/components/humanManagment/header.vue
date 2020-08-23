<template>
  <div class="employe_header-container">
    <img src='../../assets/images/vitrinas-icons/employer.png' alt="" class='employe-image'>
    <slot></slot>
    <hr class="redline ">
    <div class="employersCounter">{{ employersCount }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['employersCount'])
}
</script>