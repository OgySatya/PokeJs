<script setup>
import { computed } from "vue";
import Navbar from './components/Navbar.vue'

// const isLoggedIn = computed(() => {
//   return !!JSON.parse(localStorage.getItem("auth"));
// })

</script>

<template>
  <Navbar class="theme-controller" />
  <RouterView class="theme-controller" />
</template>

<style></style>
