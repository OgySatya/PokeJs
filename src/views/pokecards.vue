<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Loader from './Loader.vue';
import cardinfo from './pokemonTCG/cardinfo.vue';

const cards = ref([])
const loading = ref(true)
const pageSize = ref(20)
const currentPage = ref(1)
const inputName = ref('')
const cardSets = ref()
const cardTypes = ref([])
const cardRarity = ref([
  "Amazing",
  "Common",
  "LEGEND",
  "Promo",
  "Rare",
  "ACE",
  "BREAK",
  "Holo",
  "EX",
  "GX",
  "LV.X",
  "Star",
  "V",
  "VMAX",
  "Prime",
  "Prism Star",
  "Rainbow",
  "Secret",
  "Shining",
  "Shiny",
  "GX",
  "Ultra",
  "Uncommon"
])
const selectedSet = ref('')
const selectedType = ref('')
const selectedRarity = ref('')
const selectedCard = ref()
const sort = ref('')

onMounted(() => {
  searchCards()
  getSets()
  getTypes()
  // getRarity()
})
async function searchCards() {
  loading.value = true;
  selectedCard.value = ''
  // let url = `https://api.pokemontcg.io/v2/cards?q=name:${inputName.value}*&page=${currentPage.value}&pageSize=${pageSize.value}`
  let url = "https://api.pokemontcg.io/v2/cards"
  let searchQuery = "";
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
  };

  if (inputName.value) {
    searchQuery += `name:${inputName.value}*`;
  }
  if (selectedSet.value) {
    searchQuery += ` set.id:${selectedSet.value}`;
  }
  if (selectedType.value) {
    searchQuery += ` types:${selectedType.value}`;
  }
  if (selectedRarity.value) {
    searchQuery += ` rarity:${selectedRarity.value}`;
  }
  if (sort.value) {
    params.orderBy = sort.value;
  }
  if (searchQuery) {
    params.q = searchQuery;
  }

  const response = await axios.get(url, {
    params: params
  })

  cards.value = response.data;
  loading.value = false
  console.log(url)
}
function newSearch() {
  currentPage.value = 1;
  searchCards()
}
async function getSets() {
  const response = await axios.get('https://api.pokemontcg.io/v2/sets');
  cardSets.value = response.data.data;
}
async function getTypes() {
  const response = await axios.get('https://api.pokemontcg.io/v2/types');
  cardTypes.value = response.data.data;
}
// async function getRarity() {
//     const response = await axios.get('https://api.pokemontcg.io/v2/rarities');
//     cardRarity.value = response.data.data;
// }
async function nextPage() {
  ++currentPage.value;
  searchCards();
}

async function prevPage() {
  --currentPage.value;
  searchCards();
}
async function openDetail(cardId) {
  const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`);
  selectedCard.value = response.data.data;
}
const totalPage = computed(() => {
  return Math.ceil(cards.value.totalCount / pageSize.value);
})

const pages = computed(() => {
  const rawPages = [];

  const sideCount = 5;
  let leftHandSideCount = 0;
  let rightHandSideCount = 0;

  if (currentPage.value - sideCount > 0) {
    leftHandSideCount = currentPage.value - sideCount;
  } else {
    leftHandSideCount = currentPage.value - (currentPage.value - 1);
  }
  if (currentPage.value + sideCount < totalPage.value) {
    rightHandSideCount = currentPage.value + sideCount;
  }

  rawPages.push(1);
  for (let i = leftHandSideCount + 1; i < currentPage.value; i++) {
    rawPages.push(i);
  }
  if (currentPage.value > 1) {
    rawPages.push(currentPage.value);
  }
  for (let i = currentPage.value + 1; i < rightHandSideCount; i++) {
    rawPages.push(i);
  }

  if (currentPage.value < totalPage.value) {
    rawPages.push(totalPage.value);
  }

  return rawPages;
})
function gotoPage(value) {
  currentPage.value = value
  searchCards();
}
</script>
<template>
  <div class="mx-auto p-4">
    <div v-if="loading" class="text-center font-bold text-2xl">
      <Loader />
      <p class="animate-pulse">Loading....</p>
    </div>
    <div v-else>
      <form class="flex w-64 items-center mx-auto" @submit.prevent="newSearch">
        <input v-model="inputName" type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <button type="submit"
          class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </form>
      <div class="flex mt-2 justify-between px-3">
        <div class=" inline-flex border-4 ">
          <P class="px-2">Card Set : </P>
          <select v-model="selectedSet" class="capitalize" @change="newSearch">
            <option v-for="set in cardSets" :key="set.id" :value="set.id" class="hover:scale-110 duration-300">{{
      set.name }}</option>
          </select>
        </div>
        <div class=" inline-flex border-4 ">
          <P class="px-2">Card Type : </P>
          <select v-model="selectedType" class="capitalize" @change="newSearch">
            <option v-for="cardType in cardTypes" :key="cardType.id" class="hover:scale-110 duration-300">{{ cardType }}
            </option>
          </select>
        </div>
        <div class=" inline-flex border-4 ">
          <P class="px-2">Card Rarity : </P>
          <select v-model="selectedRarity" class="capitalize" @change="newSearch">
            <option v-for="rare in cardRarity" :key="rare.id" class="hover:scale-110 duration-300">{{ rare }}</option>
          </select>
        </div>
        <div class=" inline-flex border-4 px2 ">
          <P class="px-2">Sort by Name : </P>
          <select v-model="sort" class="capitalize" @change="newSearch">
            <option value="name">Asc</option>
            <option value="-name">Dsc</option>
          </select>
        </div>


        <p class="font-bold">Total Card : {{ cards.totalCount }}</p>
      </div>

      <ul class="grid grid-cols-10 gap-3 text-xs mt-4">
        <li v-for="card in cards.data" :key="card.id" class="hover:scale-110 duration-300 ">
          <button @click="openDetail(card.id)">
            <p class="font-medium text-center">{{ card.name }}</p>
            <img class="w-28" :src="card.images.small" />
          </button>
        </li>
      </ul>
      <div class="flex justify-between mt-4 px-5">
        <button
          class="w-20 flex items-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
          @click="prevPage()" v-if="currentPage > 1">
          <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Prev
        </button>
        <nav aria-label="Page navigation example" class="mx-auto">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li v-for="page in pages" :key="page">
              <button @click="gotoPage(page)" :class="[
      'flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100',
      { 'bg-neutral-500 text-neutral-100': currentPage === page }
    ]">{{
      page }}</button>
            </li>

          </ul>
        </nav>
        <button
          class="w-20 flex items-center justify-end origin-left px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900"
          @click="nextPage()" v-if="totalPage > currentPage">
          Next
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>

    </div>
    <div class="mx auto mt-5 w-max">
      <cardinfo :cardData="selectedCard" />
    </div>
  </div>
</template>
