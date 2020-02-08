<template>
  <div id="app">
    <div class='main__app'>
      <Menu />
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from './components/layout/Menu'
import Header from './components/layout/Header'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    Menu
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
