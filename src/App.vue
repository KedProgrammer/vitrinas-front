<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Header from './components/layout/Header'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    ...mapMutations(['setUser'])
  },
  created () {
    this.setUser(JSON.parse(localStorage.getItem('user')))
  }
}
</script>

<style lang="scss">
  @import url('./scss/style.scss');
</style>
