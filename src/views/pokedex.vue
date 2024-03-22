<script setup>
import pokecard from './pokecard.vue';
import axios from 'axios';
import { ref, computed , onMounted} from 'vue'


const pokemons = ref([])
let input = ref('')
const previousLink = ref('')
const nextLink = ref('')
const fullData = ref('');


onMounted(async () => {
  await getPokemons('https://pokeapi.co/api/v2/pokemon?limit=30');
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
<div class="flex mt-2 mx-auto">
  <div class="w-1/2 mx-2">
  <div class="flex justify-center">
  <div class="mb-3 w-72 ">
    <div class="input-group relative flex mb-4 rounded">
      <input type="search" v-model="input" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 bg-white bg-clip-padding border-2 border-solid border-violet-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search">
      </div>
    </div>
  </div>

  <div class="flex gap-2 place-content-evenly" >
		<button class=" border-2 border-solid border-emerald-500 rounded-md px-2 " type="button" v-if="previousLink" @click.prevent="getPokemons(previousLink)">Previous</button>
    <button class=" border-2 border-solid border-emerald-500 rounded-md px-2 " type="button" v-if="nextLink" @click.prevent="getPokemons(nextLink)">Next</button>
	</div>

    <ul class="grid grid-cols-3 gap-1 my-2 ml-1">
      <li class="my-2" v-for="pokemon in filteredPoke" :key="pokemon.name">
          <div :class="pokemon.type" class=" w-48 justify-center rounded-lg shadow-lg p-4 outline-double outline-4 outline-offset-2 outline-slate-300">
              <img  class="w-36 hover:scale-110 hover:-translate-y-3 duration-300 " :src="pokemon.sprite" />
              <div class="text-center my-2">
                <a class="font-medium uppercase hover:text-orange-400 " :href="pokemon.url" @click.prevent="openDetail(pokemon.url)">
                {{ pokemon.order.toString().padStart(3, '0') }} - {{ pokemon.name }}</a>
             </div> 
          </div>
      </li>
    </ul> 
    <div class="flex gap-2 place-content-evenly mb-10" >
		<button class=" border-2 border-solid border-orange-500 rounded-md px-2 " type="button" v-if="previousLink" @click.prevent="getPokemons(previousLink)">Previous</button>
    <button class=" border-2 border-solid border-orange-500 rounded-md px-2 " type="button" v-if="nextLink" @click.prevent="getPokemons(nextLink)">Next</button>
	</div>
  	</div>
   <pokecard class="mt-16" :pokek="fullData" />
  </div>
</template>

<style>
.ground {
  background-color: rgb(192, 157, 127);
  color: white;
}
.rock {
  background-color: rgb(167, 140, 140);
  color: white;
}
.ghost {
  background-color: rgb(247, 247, 247);
}
.electric {
  background-color: rgb(255, 255, 161);
}
.bug {
  background-color: #F6D6A7;
}
.poison {
  background-color: #e0a7f6;
  color: white;
}
.normal {
  background-color: #e9e1e1;
}
.fairy {
  background-color: rgba(255, 192, 203, 0.863);
}
.fire {
  background-color: #ff654a;
  color: white;
}
.grass {
  background-color:#b2f8b0;
}
.water {
  background-color:#46bdf5;
  color: white;
}
.fighting {
  background-color:#fdc817c7;
  color: white;
}
.psychic {
  background-color:#b067b9c7;
  color: white;
}
.ice {
  background-color:#b3d5fdf8;
}
.dragon {
  background-color:#ca8b14f8;
  color: white;
}
.dark {
  background-color:#5a5141f8;
  color: white;
}
.steel {
  background-color:#dbdbdbf8;
}
.flying {
  background-color:#f6fff1f8;
}

</style>