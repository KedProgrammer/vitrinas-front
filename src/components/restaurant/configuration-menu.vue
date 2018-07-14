<template>
  <div class="admin-restaurant__config">
    <h3>Configuración</h3>
    <div class="admin-restaurant__config-menu">
      <router-link
        class="admin-restaurant__config-item"
        :to="{ name: 'addons'}">
        Adicionales
      </router-link>
      <router-link
        class="admin-restaurant__config-item"
        :to="{ name: 'modifier-group'}">
        Grupo Modificador
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationMenu'
}
</script>
