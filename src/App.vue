<script setup>
import { computed } from "vue";
import Navbar from './components/Navbar.vue'

const isLoggedIn = computed(() => {
  return !!JSON.parse(localStorage.getItem("auth"));
})

</script>

<template>
  <Navbar v-if="isLoggedIn" />
  <RouterView />
</template>

<style scoped></style>
