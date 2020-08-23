<template>
  <div id="app">
    <div class='main__app'>
      <Menu v-if="logued()" />
      <div class="mainInfo">
        <router-view />
      </div>
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
    ...mapMutations(['setUser']),
    logued () {
      return localStorage.getItem('user') !== null
    }
  },
  created () {
    this.setUser(JSON.parse(localStorage.getItem('user')))
  }
}
</script>

<style lang="scss">
  @import url('./scss/style.scss');
</style>
