<template>
  <main class="login">

    <header class="login__contenedor">
      <div class="login-header__contenido">
        <img
          src="../assets/images/logo_blanco.svg"
          alt="logo blanco ceu">
        <p>Transformado el ecosistema universitario</p>
      </div>
      <div class="login__form-contenedor">
        <form @submit.prevent="enviarLogin">
          <div class="form-campo">
            <input
              v-model="log_email"
              placeholder="Email"
              autocomplete="email"
              type="email">
          </div>
          <div class="form-campo">
            <input
              v-model="log_password"
              placeholder="Contraseña"
              autocomplete="new-password"
              minlength="6"
              type="password">
          </div>
          <div
            :class="{'activo': msg_Login !== '' }"
            class="msg__registro">
            {{ msg_Login }}
          </div>
          <button
            class="btn-registro "
            type="submit">
            Entrar
          </button>
        </form>
      </div>
    </header>
    <!-- [Error] codigo de verificación incorrecto -->
    <section
      v-show="is_errMesagge"
      class="verificar-codigo__error">
      <h3>Oops!</h3>
      <p>{{ errMessage }}</p>
      <button
        @click="closeErrMessage()"
        class="verificar-codigo__error-btn">
        Aceptar
      </button>
    </section>
  </main>
</template>

<script>
import configService from '../settings/api-url.js'
export default {
  name: 'Login',
  data () {
    return {
      is_errMesagge: false,
      errMessage: '',
      msg_Login: '',
      log_email: '',
      log_password: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    // vefiricar si el usuario ya esta loguado
    if (localStorage.getItem('yek') !== null) {
      next({ path: '/' })
    } else {
      next()
    }
  },
  methods: {
    enviarLogin () {
      const dataLog = {
        'login_type': 'email',
        'email': this.log_email,
        'password': this.log_password
      }
      console.log(dataLog)
      configService('/auth/central_login.json', {
        method: 'post',
        data: dataLog
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('yek', res.data.auth_token)
          location.reload()
        })
        .catch(error => {
          // mostramos los errores que nos muestra el servidor
          this.msg_Login = error.response.data.message
        })
    }
  }
}
</script>
