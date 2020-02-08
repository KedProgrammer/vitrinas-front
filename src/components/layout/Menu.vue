<template>
  <nav class="order__menu">
    <!-- agregar clase 'activo' para indicar la ruta actual --><router-link
      class="order__menu-item"
      :to="{ name: 'orders'}">
      Pedidos
    </router-link>
     <!-- agregar clase 'activo' para indicar la ruta actual --><router-link
      class="order__menu-item"
      :to="{ name: 'costs'}">
      Costos
    </router-link>

  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'today'}">
      Nomina
    </router-link> -->
  <!-- <a
      href=""
      class="admin__menu-item">Resumen</a> -->
  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'record'}">
      Historial
    </router-link> -->
  <!-- <a
      href=""
      class="admin__menu-item">Dashboard</a>
    <a
      href=""
      class="admin__menu-item">KPI</a> -->
  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'team'}">
      Inventario
    </router-link> -->
  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'cupons'}">
      Facturación
    </router-link> -->
  <!-- <a
      href=""
      class="admin__menu-item">PROMO</a> -->
  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'variables'}">
      Costos
    </router-link> -->
  <!-- <router-link
      class="admin__menu-item"
      :to="{ name: 'ads' }">
      Letras
    </router-link> -->
  <!-- <a
      href=""
      class="admin__menu-item">Usuarios</a>
    <a
      href=""
      class="admin__menu-item">Quality</a>
    <a
      href=""
      class="admin__menu-item">Accounting</a>
    <a
      href=""
      class="admin__menu-item">View</a> -->
  </nav>
</template>
