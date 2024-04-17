
<script setup>
import { ref, computed , onMounted} from 'vue';
import axios from 'axios';
import Loader from './Loader.vue';
import cardinfo from './pokemonTCG/cardinfo.vue';

const cards = ref([])
const loading = ref(true)
const pageSize = ref(20)
const pageQuary = ref(1)
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
    let url = `https://api.pokemontcg.io/v2/cards?q=name:${inputName.value}*&page=${pageQuary.value}&pageSize=${pageSize.value}`
    if(selectedSet.value){
      url = url + '&q=set.id:' + selectedSet.value
    }
    if(selectedType.value){
      url = url + '&q=types:' + selectedType.value
    }
    if(selectedRarity.value){
      url = url + '&q=rarity:' + selectedRarity.value
    }
    if(sort.value){
      url = url + '&orderBy=' +sort.value
    }
    const response = await axios.get(url)
    cards.value = response.data;
    loading.value = false
    console.log(url)
}
function newSearch () {
  pageQuary.value = 1;
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
  ++pageQuary.value;
    loading.value = true;
    searchCards(); 
    }
    
async function prevPage() {
  --pageQuary.value;
    loading.value = true;
    searchCards(); 
    }
async function openDetail(cardId) {
  const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`);
 selectedCard.value = response.data.data;
}
</script>
<template>
<div class="mx-auto p-4">
    <div v-if="loading" class="text-center font-bold text-2xl">
    <Loader /> 
     <p class="animate-pulse">Loading....</p></div>
     <div v-else>
      <div class="flex w-64 items-center mx-auto">   
        <input v-model="inputName" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <button  @click="newSearch()" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </button> 
      </div>
      <div class="flex mt-2 justify-between px-3">
        <div class=" inline-flex border-4 ">
          <P class="px-2">Card Set : </P>
        <select v-model="selectedSet" class=" capitalize">
        <option  v-for="set in cardSets" :key="set.id" :value="set.id" class="hover:scale-110 duration-300">{{ set.name }}</option>
        </select>
       </div>  
       <div class=" inline-flex border-4 ">
          <P class="px-2">Card Type : </P>
           <select v-model="selectedType" class=" capitalize">
            <option  v-for="type in cardTypes" :key="type.id" class="hover:scale-110 duration-300">{{ type }}</option>
          
          </select>
        </div> 
      <div class=" inline-flex border-4 ">
          <P class="px-2">Card Rarity : </P>
           <select v-model="selectedRarity" class=" capitalize">
          <option  v-for="rare in cardRarity" :key="rare.id" class="hover:scale-110 duration-300">{{ rare }}</option>
         </select>
      </div>
        <div class=" inline-flex border-4 px2 ">
          <P class="px-2">Sort by Name : </P>
           <select v-model="sort" class=" capitalize">
            <option value="name" >Asc</option>
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
  <button class="w-20 flex items-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900" @click="prevPage()" v-if="pageQuary > 1">
        <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Prev
    </button>
    <p class="flex items-center text-center justify-center rounded px-3 h-8 w-5 text-sm font-medium text-white bg-gray-800 mx-auto">{{ pageQuary }}</p>
    <button class="w-20 flex items-center justify-end origin-left px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900" @click="nextPage()"v-if="cards.count = pageSize">
        Next
        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>
    </div>
    <div class="mx auto mt-5 w-max">
    <cardinfo 
    :cardData="selectedCard"/></div>
  </div>
</template>
