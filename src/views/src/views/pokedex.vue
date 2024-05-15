<script setup>
import detailed from './detailed.vue';
import axios from 'axios';
import { ref, computed, onMounted, reactive } from 'vue'

const pokeType = reactive({
fighting : "amber-700",
flying : "slate-500",
poison : '#c026d3',
ground : '#451a03',
rock : '#57534e',
// bug :
// ghost :
// steel :
fire : 'red-500',
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
async function allPokemons(url) {
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
}

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
  return Math.ceil(pokemonAll.value.length / 30)
})
const paginatedPoke = computed(() => {
  const startIndex = (currentPage.value - 1) * 30;
  const endIndex = startIndex + 30;
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
  <div class="mx-auto w-full ">
    <div class="relative flex mb-4 rounded w-max mx-auto">
      <input type="search" v-model="input"
        class="input input-bordered w-full max-w-xs mt-8 border-4 dark:bg-slate-600 dark:text-slate-200"
        placeholder="Search">
    </div>
    <div>
      <ul class="grid grid-cols-2 gap-4 mt-6 w-max mx-auto lg:grid-cols-6">
        <li v-for="pokemon in paginatedPoke" :key="pokemon.name"
          class="outline-double outline-2 outline-offset-2 outline-slate-500 dark:outline-slate-200 rounded-lg p-0.5 ">
          <div :class="pokemon.type" class="shadow-lg rounded-md">
            <img class="hover:scale-110 hover:-translate-y-3 duration-300 mx-auto " :src="pokemon.sprite" />
            <div class="text-center p-1">
              <button class="font-medium text-sm uppercase hover:text-orange-400 " :href="pokemon.url"
                @click.prevent="openDetail(pokemon.url)">
                {{ pokemon.order.toString().padStart(3, '0') }} - {{ pokemon.name }}</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="join my-10 w-fit mx-auto flex">
        <button @click="previousPage()" class="join-item btn">Previous</button>
        <div v-for="page in pageRange" class="hidden lg:block">
          <button :class="{ 'btn-active': currentPage === page }" @click="toPage(page)" class="join-item btn">{{ page
            }}</button>
        </div>
        <button @click="nextPage()" class="join-item btn">Next</button>
      </div>
        <Teleport to="body">
      <Transition>
        <detailed v-if="showModal" :pokek="fullData"  @back="(i) => showModal = i"/>
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
}</style>