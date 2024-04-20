<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';


const props = defineProps({
  cardData: String
})

</script>
<template>
  <div v-if="cardData" class="flex">
    <img :src="cardData.images.large" class="w-80">
    <div class="mx-5 w-72">
      <div class="my-2 mx-auto">
        <img class=" h-12 mx-auto" :src="cardData.set.images.logo">
        <p class="text-center font-mono font-bold">{{ cardData.set.name }}</p>
      </div>
      <p>Name : {{ cardData.name }}</p>
      <div v-if="cardData.evolvesTo" class="flex"><span> Evolves To : </span> <span v-for="types in cardData.evolvesTo">
          {{ types }} </span></div>
      <p v-if="cardData.evolvesFrom">Evolves From : {{ cardData.evolvesFrom }}</p>
      <p>Super Type : {{ cardData.supertype }}</p>
      <div class="flex">
        <p> Type : </p> <span v-for="types in cardData.types"> {{ types }} - </span>
      </div>
      <div class="flex">
        <p> Sub Type : </p> <span v-for="types in cardData.subtypes"> {{ types }} - </span>
      </div>
      <p>Release Date : {{ cardData.set.releaseDate }}</p>
      <p>Rarity : {{ cardData.rarity }}</p>
    </div>
  </div>
</template>