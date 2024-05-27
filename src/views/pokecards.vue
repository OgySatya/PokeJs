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
})
async function searchCards() {
  loading.value = true;
  selectedCard.value = ''
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
      <aside class="flex">
        <div class="drawer grid lg:hidden">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <label for="my-drawer" class="btn btn-secondary btn-xs drawer-button"><svg class="w-6 h-6 text-accent"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </label>
          </div>
          <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-fit h-full bg-base-300 text-base-content text-xs">
              <span class="font-bold text-neutral">Filter</span>
              <li class="">
                <P>Card Set : </P>
                <select v-model="selectedSet" @change="newSearch" class="w-32">
                  <option v-for="set in cardSets" :key="set.id" :value="set.id" class="capitalize text-xs">{{
      set.name }}</option>
                </select>
              </li>
              <li class=" ">
                <P>Card Type : </P>
                <select v-model="selectedType" class="w-32" @change="newSearch">
                  <option v-for="cardType in cardTypes" :key="cardType.id" class="capitalize text-xs">{{
      cardType
    }}
                  </option>
                </select>
              </li>
              <li class=" ">
                <P>Card Rarity : </P>
                <select v-model="selectedRarity" class="w-32" @change="newSearch">
                  <option v-for="rare in cardRarity" :key="rare.id" class="capitalize text-xs">{{ rare }}
                  </option>
                </select>
              </li>
              <li class=" ">
                <P>Sort by Name : </P>
                <select v-model="sort" class="w-32" @change="newSearch">
                  <option value="name">Asc</option>
                  <option value="-name">Dsc</option>
                </select>
              </li>
              <p class="font-bold text-neutral mt-5">Total Card : {{ cards.totalCount }}</p>
            </ul>
          </div>
        </div>
        <form class="flex items-center mx-auto" @submit.prevent="newSearch">
          <input v-model="inputName" type="text"
            class="input input-bordered w-full h-6 lg:h-8 max-w-md border-secondary" />
          <button type="submit" class="btn btn-xs lg:btn-sm btn-secondary mx-2">
            <svg class="text-accent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </form>
      </aside>
      <aside class="mt-2 justify-between px-3 hidden lg:flex items-center">
        <label class="w-fit grid label">
          <span class="label-text ml-2">Card Set</span>
          <select v-model="selectedSet"
            class="capitalize select-accent select select-bordered w-fit select-sm border-secondary"
            @change="newSearch">
            <option disabled>Card Set</option>
            <option v-for="set in cardSets" :key="set.id" :value="set.id">{{
      set.name }}</option>
          </select>
        </label>
        <label class="w-fit grid label">
          <span class="label-text ml-2">Card Type</span>
          <select v-model="selectedType"
            class="capitalize select-accent select select-bordered w-fit select-sm border-secondary"
            @change="newSearch">
            <option v-for="cardType in cardTypes" :key="cardType.id">{{ cardType }}
            </option>
          </select>
        </label>
        <label class="w-fit grid label">
          <span class="label-text ml-2">Card Rarity</span>
          <select v-model="selectedRarity"
            class="capitalize select-accent select select-bordered w-fit select-sm border-secondary"
            @change="newSearch">
            <option v-for="rare in cardRarity" :key="rare.id">{{ rare }}</option>
          </select>
        </label>
        <label class="w-fit grid label">
          <span class="label-text ml-2">Sort</span>
          <select v-model="sort"
            class="capitalize select-accent select select-bordered w-fit select-sm border-secondary"
            @change="newSearch">
            <option value="name">Asc</option>
            <option value="-name">Dsc</option>
          </select>
        </label>
        <p class="rounded-btn border-2 p-2 border-secondary">Total Card : {{ cards.totalCount
          }}</p>
      </aside>

      <ul class="grid grid-cols-4 gap-1 text-xs mt-4 lg:grid-cols-10 lg:gap-3">
        <li v-for="card in cards.data" :key="card.id" class="hover:scale-110 duration-300 ">
          <button @click="openDetail(card.id)" onclick="my_modal_3.showModal()">
            <p class="font-medium text-center text-xs lg:text-md">{{ card.name }}</p>
            <img class="lg:w-36 w-20" :src="card.images.small" />
          </button>
        </li>
      </ul>
      <div class="flex justify-between mt-4 w-1/2 mx-auto">
        <button class="btn btn-sm btn-secondary" @click="prevPage()" v-if="currentPage > 1">
          <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Prev
        </button>
        <nav aria-label="Page navigation example" class="mx-auto">
          <ul class="join hidden lg:flex">
            <li v-for="page in pages" :key="page">
              <button @click="gotoPage(page)" class="join-item btn btn-sm btn-secondary"
                :class="{ 'btn-accent': currentPage === page }">{{
      page }}</button>
            </li>
          </ul>
        </nav>
        <button class="btn btn-sm btn-secondary" @click="nextPage()" v-if="totalPage > currentPage">
          Next
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>

    </div>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box bg-white bg-transparent">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div v-if="selectedCard">
          <img :src="selectedCard.images.large">
        </div>
      </div>
    </dialog>
  </div>
</template>
