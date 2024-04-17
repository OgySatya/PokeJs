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
  await getPokemons('https://pokeapi.co/api/v2/pokemon?limit=32');
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

<template>
<div class="flex mt-2 mx-auto w-max">
  <div class="mx-2">
  <div class="flex justify-center">
  <div class=" ">
    <div class="input-group relative flex mb-4 rounded">
      <input type="search" v-model="input" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 bg-white bg-clip-padding border-2 border-solid border-violet-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search">
      </div>
    </div>
  </div>

  <div class="flex gap-2 place-content-evenly" >
		<button class=" border-2 border-solid border-emerald-500 rounded-md px-2 " type="button" v-if="previousLink" @click.prevent="getPokemons(previousLink)">Previous</button>
    <button class=" border-2 border-solid border-emerald-500 rounded-md px-2 " type="button" v-if="nextLink" @click.prevent="getPokemons(nextLink)">Next</button>
	</div>
    <div>
    <ul class="grid grid-cols-4 gap-3 my-4">
      <li v-for="pokemon in filteredPoke" :key="pokemon.name">
          <div :class="pokemon.type" class="mx-1 justify-center rounded-lg shadow-lg outline-double outline-4 outline-offset-2 outline-slate-300">
              <img  class="w-36 hover:scale-110 hover:-translate-y-3 duration-300 " :src="pokemon.sprite" />
              <div class="text-center my-2">
                <a class="font-medium uppercase hover:text-orange-400 " :href="pokemon.url" @click.prevent="openDetail(pokemon.url)">
                {{ pokemon.order.toString().padStart(3, '0') }} - {{ pokemon.name }}</a>
             </div> 
          </div>
      </li>
    </ul> 
  </div>
    <div class="flex gap-2 place-content-evenly mb-10" >
		<button class=" border-2 border-solid border-orange-500 rounded-md px-2 " type="button" v-if="previousLink" @click.prevent="getPokemons(previousLink)">Previous</button>
    <button class=" border-2 border-solid border-orange-500 rounded-md px-2 " type="button" v-if="nextLink" @click.prevent="getPokemons(nextLink)">Next</button>
	</div>
  	</div>
   <detailed class="mt-16" :pokek="fullData" />
  </div>
</template>

<style>

</style>