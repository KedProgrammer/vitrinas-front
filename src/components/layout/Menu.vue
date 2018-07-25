<template>
  <aside class="admin__menu">
    <!-- agregar clase 'activo' para indicar la ruta actual -->
    <router-link
      class="admin__menu-item"
      :to="{ name: 'today'}">
      Hoy
    </router-link>
    <!-- <a
      href=""
      class="admin__menu-item">Resumen</a> -->
    <router-link
      class="admin__menu-item"
      :to="{ name: 'record'}">
      Historial
    </router-link>
    <!-- <a
      href=""
      class="admin__menu-item">Dashboard</a>
    <a
      href=""
      class="admin__menu-item">KPI</a> -->
    <router-link
      class="admin__menu-item"
      :to="{ name: 'team'}">
      Team
    </router-link>
    <!-- <a
      href=""
      class="admin__menu-item">PROMO</a> -->
    <router-link
      class="admin__menu-item"
      :to="{ name: 'variables'}">
      Variables
    </router-link>
    <router-link
      class="admin__menu-item"
      :to="{ name: 'ads' }">
      ADS
    </router-link>
    <router-link
      class="admin__menu-item"
      :to="{ name: 'restaurant'}">
      Restaurant.
    </router-link>
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
  </aside>
</template>
