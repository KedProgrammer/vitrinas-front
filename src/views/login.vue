<template>
  <main class="container">
    <div class="vitrinas-logo">
      <img
        src="../assets/images/login/oficialLogo.jpg"
        alt="oficial">
    </div>
    <div class="form-container">
      <login-form />
    </div>
  </main>
</template>

<script>
import loginForm from '../components/login/form'
export default {
  components: {
    loginForm
  }
}
</script>

<style>

</style>
