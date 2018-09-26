<template>
  <form
    class= "login-form"
    @submit.prevent="loginUser">
    <input
      required
      v-model="email"
      placeholder="correo"
      type="email">
    <input
      required
      type="password"
      placeholder="contraseña"
      v-model="password">
    <input
      required
      type="password"
      placeholder="confirmar contraseña"
      v-model="confirmPassword">
    <button
      class="login-button"
      type="submit">Ingresar</button>
  </form>
</template>

<script>
import configService from '../../settings/api-url'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    loginUser () {
      if (this.password !== this.confirmPassword) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no coinciden'
        })
      } else {
        const data = {
          email: this.email,
          password: this.password
        }
        configService.post('auth/login', data)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.auth_token)
            console.log(localStorage)
            this.$router.push({name: 'orders'})
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
