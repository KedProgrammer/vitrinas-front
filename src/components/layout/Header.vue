<template>
  <header class="restaurante-user__header">
    <div class="admin__route-logo">
      <img
        src="../../assets/images/logo_v3-morado.svg"
        class="restaurante-user__logo"
        alt="logo morado v3 comida en la u">
    </div>

    <div class="restaurante-user__header-titulo">
      <p>Conexión a internet</p>
      <span
        :class="{'activo': OnlineOnly}"
        class="admin__estado-conexion">
        {{ OnlineOnly ? 'Conectado' : 'Desconectado' }}
      </span>
    </div>

    <div class="header__block-righ">
      <div class="header__select-university">
        <multiselect
          class="custom-select1"
          :value="university"
          :options="universitys"
          :searchable="false"
          :show-labels="false"
          label="name"
          @select="updateUniversityAsync"
          placeholder="Multi Selección" />
      </div>

      <!-- <div class="restaurante-user__avatar">
        <img
          src="../../assets/images/perfil/perfil-mini.jpg"
          alt="">
      </div> -->
      <div
        @click="logout"
        class="header__logout">
        Salir
      </div>
    </div>

  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['university', 'universities'])
  },
  data () {
    return {
      'universitys': []
      // onlineState: navigator.onLine
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUniversity()
    })
  },
  methods: {
    ...mapActions(['updateUniversitiesAsync', 'updateUniversityAsync']),
    getUniversity () {
      this.updateUniversitiesAsync()
        .then(res => {
          for (let index = 0; index < res.data.length; index++) {
            this.universitys.push({
              id: res.data[index].id,
              name: res.data[index].name
            })
          }
        })
    },
    logout () {
      localStorage.removeItem('yek')
      this.$router.push({name: 'login'})
    }
  }
}
</script>
