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
    <button
      class="login-button"
      type="submit">Ingresar</button>
  </form>
</template>

<script>
import configService from '../../settings/api-url'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    loginUser () {
      const data = {
        email: this.email,
        password: this.password
      }
      configService.post('auth/login', data)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data))
          this.setUser(res.data)
          this.$router.push({name: 'orders'})
        })
        .catch(error => {
          this.$swal({
            position: 'center',
            type: 'warning',
            title: 'Credenciales incorrectas',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(error)
        })
    }
  }
}
</script>
