<template>
  <header class="restaurante-user__header">
    <div class="admin__route-logo">
      <img
        src="../../assets/images/logo_v3-morado.svg"
        class="restaurante-user__logo"
        alt="logo morado v3 comida en la u">

      <div class="admin__route-current">
        Pedidos de hoy
      </div>
    </div>

    <div class="restaurante-user__header-titulo">
      <p>Conexión a internet</p>
      <!-- Estilos de estado conexion
          clase 'activo' para indicar activo
          dejar remover clase activo para indicar desconexion
      -->
      <span class="admin__estado-conexion activo">
        Conectado
      </span>
    </div>

    <div class="restaurante-user__avatar">
      <img
        src="../../assets/images/perfil/perfil-mini.jpg"
        alt="">
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
