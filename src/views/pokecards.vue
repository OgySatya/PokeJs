<script setup>
import { ref, computed , onMounted} from 'vue';
import axios from 'axios';

const cards = ref([])

onMounted(() => {
    pokeCards()
})
async function pokeCards() {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        cards.value = response.data.data;
        console.log(response)
}
</script>
<template>
<div>
    <h1>Pokémon TCG Cards</h1>
    <ul class="grid grid-cols-5 gap-1">
        <li v-for="card in cards" :key="card.id">
        <p>{{ card.name }}</p>
        <div v-for="type in card.types" class="flex">
        <span>{{ type }}</span>
        </div>
        <img  class="w-28 hover:scale-110 hover:-translate-y-3 duration-300 " :src="card.images.small" />
      </li>
    </ul>
  </div>
</template>