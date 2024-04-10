
<script setup>
import { ref, computed , onMounted} from 'vue';
import axios from 'axios';
import Loader from './Loader.vue'

const cards = ref([])
const loading = ref(true)
const pageSize = ref(20)
const pageQuary = ref(1)
const input = ref('')
const sortItem = ref('Name')
const sort = ref('Acs')

onMounted(() => {
    searchCards()
})
async function searchCards() {
    loading.value = true;
    let url = `https://api.pokemontcg.io/v2/cards?q=name:${input.value}*&page=${pageQuary.value}&pageSize=${pageSize.value}`
    const response = await axios.get(url);
    cards.value = response.data.data;
    loading.value = false
}
function newSearch () {
  pageQuary.value = 1;
  searchCards()
}
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
    
</script>
<template>
<div class="mx-auto w-max">
    <div v-if="loading" class="text-center font-bold text-2xl">
    <Loader /> 
     <p class="animate-pulse">Loading....</p></div>
     <div v-else>
    <div class="flex w-64 items-center mx-auto">   
        <input v-model="input" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <button  @click="newSearch()" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </button> 
      </div>
      <div class="flex mt-2">
        <p class="px-2 border-4">Sort By</p>
      <select v-model="sortItem" class=" capitalize border-y-4">
        <option>name</option>
        <option>set</option>
        <option>rarety</option>
        <option>type</option>
      </select>
      <select v-model="sort" class=" capitalize border-4 ">
        <option>Acs</option>
        <option>Desc</option>
      </select>
     </div>

    <ul class="grid grid-cols-5 gap-3 text-xs mt-4">
        <li v-for="card in cards" :key="card.id" class="hover:scale-110 duration-300 ">
        <p class="font-medium text-center">{{ card.name }}</p>
        <img class="w-28" :src="card.images.small" />
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
    <button class="w-20 flex items-center justify-end origin-left px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900" @click="nextPage()"v-if="cards.length = pageSize">
        Next
        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>
    
   
 
    </div>
  </div>
</template>
