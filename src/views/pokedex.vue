<script setup>
import detailed from './detailed.vue';
import axios from 'axios';
import { ref, computed , onMounted} from 'vue'


const pokemons = ref([])
// const pokemonAll = ref([])
let input = ref('')
const previousLink = ref('')
const nextLink = ref('')
const fullData = ref('');

onMounted(async () => {
  await getPokemons('https://pokeapi.co/api/v2/pokemon?limit=28');
  // await allPokemons('https://pokeapi.co/api/v2/pokemon?limit=1000');
})

async function getPokemons(url) {
  const response = await axios.get(url);
  previousLink.value = response.data.previous;
  nextLink.value = response.data.next;
  pokemons.value = await Promise.all(response.data.results.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    return {
      ...pokemon,
      sprite: response.data.sprites.other.home.front_default,
      order: response.data.id,
      type : response.data.types[0].type.name,
    }
  }));
}
// async function allPokemons(url) {
//   const response = await axios.get(url);
//   pokemonAll.value = await Promise.all(response.data.results.map(async (pokemon) => {
//     const response = await axios.get(pokemon.url);
//     return {
//       ...pokemon,
//       sprite: response.data.sprites.other.home.front_default,
//       order: response.data.id,
//       type : response.data.types[0].type.name,
//     }
//   }));
// }

const filteredPoke = computed (() => { 
	return pokemons.value.filter((poke) =>{ 
		return poke.name? 
		poke.name.toLowerCase().
	includes(input.value.toLowerCase()) : false
	}) })

async function openDetail(detailUrl) {
  const response = await axios.get(detailUrl);
   window.scrollTo(0,50);
 fullData.value = response.data;
}

</script>

<template >
<div class="inline-grid mx-auto w-full ">
    <div class="relative flex mb-4 rounded w-max mx-auto">
      <input type="search" v-model="input" class="input input-bordered w-full max-w-xs mt-8 dark:bg-slate-600 dark:text-slate-200" placeholder="Search">
      </div>
    <div>
    <ul class="grid grid-cols-2 gap-4 mt-6 w-max mx-auto lg:grid-cols-4 lg:gap-8">
      <li v-for="pokemon in filteredPoke" :key="pokemon.name" class="outline-double outline-4 outline-offset-2 outline-slate-800 dark:outline-slate-200 rounded-lg p-1 ">
          <div :class="pokemon.type" class="pb-5 justify-center shadow-lg rounded-md">
              <img  class="w-32 lg:w-64 hover:scale-110 hover:-translate-y-3 duration-300 " :src="pokemon.sprite" />
              <div class="text-center">
                <a class="font-medium uppercase hover:text-orange-400 " :href="pokemon.url" @click.prevent="openDetail(pokemon.url)">
                {{ pokemon.order.toString().padStart(3, '0') }} - {{ pokemon.name }}</a>
             </div> 
          </div>
           
      </li>
    </ul> 
  </div>
  <div class="join grid grid-cols-2 my-8 w-max mx-auto">
  <button @click.prevent="getPokemons(previousLink)" class="join-item btn btn-outline">Previous</button>
  <button @click.prevent="getPokemons(nextLink)" class="join-item btn btn-outline">Next</button>
</div>

   <detailed class="mt-16" :pokek="fullData" />
  </div>
</template>

<style>

</style>