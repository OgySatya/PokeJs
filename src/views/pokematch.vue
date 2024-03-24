<script setup>
import { ref, reactive, computed } from 'vue'

const pickedIndex = ref()
const pokemonCard = reactive({
  list: Array(8).fill(null)
})
const pair = reactive({})
const myObject = {}
pokemonList()

function playGame() {
  pokemonList();
  let indexedObject = {};
  Object.keys(pair.value).forEach((key, index) => {
    indexedObject[key] = {
      value: pair.value[key],
      index: index
    };
  });
  myObject.value = indexedObject
 console.log(myObject.value)
}

async function fetchPokemon(pokemonId) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
}
function pokemonList() {
  pokemonCard.list.forEach(async (pokemon, index) => {
    const id = Math.floor(Math.random() * 251);
    const response = await fetchPokemon(id);
    const data = await response.json();
    pokemonCard.list[index] = data;
  })
  pair.value = pokemonCard.list.concat(pokemonCard.list);
}
function pick(id) {
  pickedIndex.value = id;
}


</script>

<template>
    <div class="mx-aut p-4 flex">
        <div class="mx-auto grid grid-cols-4 gap-1 " >
        <template v-for="pokemon in pair.value">
            <button v-if="pokemon" class="w-32 h-36 rounded-lg font-semibold border-2 border-orange-800 uppercase" @click="pick(pokemon.id)" :class="pokemon.types[0].type.name">
            <img class=" mx-auto w-28 h-28 p-1 pb-0" :src="pokemon.sprites.other.dream_world.front_default"/>
            {{ pokemon.name }}</button>
        </template>
        <button @click="playGame()" class=" mx-auto p-1.5 rounded-xl bg-gradient-to-br from-teal-300 to-lime-300  hover:scale-110 transition duration-500 ease-in-out">
            <span class="text-4xl mx-auto px-4 text-orange-500 uppercase font-semibold bg-sky-100 rounded-lg active:text-yellow-400">x</span>
        </button>
        </div> 
    </div>
    <p>{{ pickedIndex }} </p>
</template>