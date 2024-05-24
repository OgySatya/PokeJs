<script setup>
import detailed from './detailed.vue';
import Loader from './Loader.vue';
import axios from 'axios';
import { ref, computed, onMounted, reactive } from 'vue'

const pokeType = reactive({
  fighting: "amber-700",
  flying: "slate-500",
  poison: '#c026d3',
  ground: '#451a03',
  rock: '#57534e',
  // bug :
  // ghost :
  // steel :
  fire: 'red-500',
  // water :
  // grass :
  // electric :
  // psychic :
  // ice :
  // dragon :
  // dark :
  // fairy :
  // stellar :
})

const pokemons = ref([])
const pokemonAll = ref([])
let input = ref('')
const previousLink = ref('')
const nextLink = ref('')
const fullData = ref('');
const currentPage = ref(1)

onMounted(async () => {

  await allPokemons('https://pokeapi.co/api/v2/pokemon?limit=649');
})

// async function getPokemons(url) {
//   const response = await axios.get(url);
//   previousLink.value = response.data.previous
// nextLink.value = response.data.next;
// pokemons.value = await Promise.all(response.data.results.map(async (pokemon) => {
//   const response = await axios.get(pokemon.url);
//   return {
//     ...pokemon,
//     sprite: response.data.sprites.other.home.front_default,
//     order: response.data.id,
//     type: response.data.types[0].type.name,
//   }
// }));
// }
// const filteredPoke = computed(() => {
//   return pokemons.value.filter((poke) => {
//     return poke.name ?
//       poke.name.toLowerCase().
//         includes(input.value.toLowerCase()) : false
//   })
// })
const loading = ref(true)
async function allPokemons(url) {
  loading.value = true;
  const response = await axios.get(url);
  pokemonAll.value = await Promise.all(response.data.results.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    return {
      ...pokemon,
      sprite: response.data.sprites.front_default,
      order: response.data.id,
      type: response.data.types[0].type.name,
    }
  }));
  loading.value = false;
}
const pageSize = ref(30)
const showModal = ref(false);

async function openDetail(detailUrl) {
  const response = await axios.get(detailUrl);
  fullData.value = response.data;
  showModal.value = true
}

const filteredPokemon = computed(() => {
  return pokemonAll.value.filter(pokemon => pokemon.name.toLowerCase().includes(input.value.toLowerCase()))
})
const totalPages = computed(() => {
  return Math.ceil(pokemonAll.value.length / pageSize.value)
})
const paginatedPoke = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredPokemon.value.slice(startIndex, endIndex);
})
const pageRange = computed(() => {
  let page = [];
  let range = 3
  if (currentPage.value > range) {
    page.push(1)
    for (let i = currentPage.value + 1 - range; i < currentPage.value; i++) {
      page.push(i)
    }
  } else if (currentPage.value <= range && currentPage.value > 1) {
    for (let i = 1; i < currentPage.value; i++) {
      page.push(i)
    }
  }

  if (currentPage.value <= totalPages.value - range) {
    for (let i = currentPage.value; i < currentPage.value + range; i++) {
      page.push(i)
    }
    page.push(totalPages.value)
  } else if (currentPage.value > totalPages.value - range) {
    for (let i = currentPage.value; i < totalPages.value + 1; i++) {
      page.push(i)
    }
  }
  return page;
})
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
function toPage(id) {
  currentPage.value = id
}

</script>

<template>
  <div v-if="loading" class="text-center font-bold text-2xl">
    <Loader />
    <div class=" inline-flex items-center animate-pulse">
      <p>Loading</p><span class="loading loading-dots loading-md"></span>
    </div>


  </div>
  <div v-else class="mx-auto w-full ">
    <div class="relative flex mb-4 rounded w-max mx-auto">
      <input type="search" v-model="input" class="input input-bordered w-full max-w-xs mt-8 border-2 input-primary"
        placeholder="Search">
    </div>
    <div>
      <ul class="grid grid-cols-2 gap-2 mt-6 w-max mx-auto lg:grid-cols-5">
        <li v-for="pokemon in paginatedPoke" :key="pokemon.name"
          class="hover:-translate-y-2 duration-300 rounded-xl border-4 border-double border-primary hover:border-warning hover:text-warning p-0.5">
          <div :class="pokemon.type" class="rounded-lg glass">
            <img class="hover:scale-125 duration-300 mx-auto " :src="pokemon.sprite" />
            <button class="font-bold text-sm uppercase " :href="pokemon.url" @click.prevent="openDetail(pokemon.url)">
              <p>{{ pokemon.order.toString().padStart(3, '0') }}</p>
              <p class="h-10 w-40"> {{ pokemon.name }}</p>
            </button>
          </div>
        </li>
      </ul>
      <div class="join my-10 w-fit mx-auto flex">
        <button @click="previousPage()" class="join-item btn btn-sm btn-outline btn-primary">Previous</button>
        <div v-for="page in pageRange" class="hidden lg:block">
          <button :class="{ 'btn-active': currentPage === page }" @click="toPage(page)"
            class="join-item btn btn-outline btn-sm  btn-primary">{{ page
            }}</button>
        </div>
        <button @click="nextPage()" class="join-item btn btn-outline btn-sm  btn-primary">Next</button>
      </div>
      <Teleport to="body">
        <Transition>
          <detailed class="mt-10" v-if="showModal" :pokek="fullData" @back="(i) => showModal = i" />
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>