<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const cardSets = ref()
onMounted(() => {
  getSets()

})
async function getSets() {
  const response = await axios.get('https://api.pokemontcg.io/v2/sets');
  cardSets.value = response.data.data;
}


</script>
<template>
  <div class="bg-cover p-12 text-center h-screen m-5 mx-auto"
    style="background-image: url(https://images.alphacoders.com/603/603479.png)">

  </div>


</template>
<style></style>