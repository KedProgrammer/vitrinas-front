<template>
  <div @click="goToEmployerInfo" class="employers_index-item">
    <img src="../../assets/images/vitrinas-icons/photo.png" class="employers_index-item-photo">
    <div class="employers_index-item-info">
      <span id="employer-name">{{ `${name} ${lastName}` }}</span>
      <span>CC. {{identification}}</span>
      <span><img src="../../assets/images/vitrinas-icons/celu.png" class="employers_index-item-celu">{{cellphone}} </span>
    </div>
    <img src="../../assets/images/vitrinas-icons/pesos.png" class="employers_index-item-pesos">
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setEmployer']),
    goToEmployerInfo() {
      this.setEmployer(this.id)
      this.$router.push({name: 'employer-create'})
    }
  },
  props: {
    id: {
      type: Number,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    identification: {
      type: String,
      default: ''
    },
    cellphone: {
      type: String,
      default: ''
    }
  }
}
</script>