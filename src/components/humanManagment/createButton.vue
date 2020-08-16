<template>
  <div @click="goToCreate" class="employe_filters">
    <img src="../../assets/images/vitrinas-icons/create.png" alt="" class="employe_filters-item">
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['removeEmployer']),
    goToCreate () {
      this.removeEmployer()
      this.$router.push({name: 'employer-create'})
    }
  }
}
</script>