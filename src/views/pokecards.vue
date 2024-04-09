<script setup>
import { ref, computed , onMounted} from 'vue';
import axios from 'axios';
import Loader from './Loader.vue'

const cards = ref([])
const loading = ref(true)
const startPage = ref(1)
const pageSize = ref(20)

onMounted(() => {
    pokeCards()
})
async function pokeCards() {
    const response = await axios.get('https://api.pokemontcg.io/v2/cards');
    cards.value = response.data.data;
    loading.value = false
    console.log(allPages.value)
}

const allPages = computed( () => {
  return Math.ceil( cards.value.length / pageSize.value)
})

const pageCards = computed( () => {
    const first = (startPage.value - 1) * pageSize.value;
      const last = first + pageSize.value;
      return cards.value.slice(first, last);
    })
function nextPage() {
      if (startPage.value < allPages.value) {
        ++startPage.value
      }
    }
function prevPage() {
      if (startPage.value > 1) {
        --startPage.value
      }
    }

</script>
<template>
<div class="mx-auto w-max">
    <div v-if="loading" class="text-center font-bold text-2xl">
    <Loader /> 
     Loading....</div>
     <div v-else>
    <ul  class="grid grid-cols-5 gap-1">
        <li v-for="card in pageCards" :key="card.id">
        <p>{{ card.name }}</p>
        <div v-for="type in card.types">
        <span>{{ type }}</span>
        </div>
        <img class="w-28 hover:scale-110 hover:-translate-y-3 duration-300 " :src="card.images.small" />
      </li>
    </ul>
    <div class="mx-auto flex text-center font-bold text-xl my-3">
      <button class="mx-5 border-4 rounded-xl p-2 border-teal-600" @click="prevPage()" v-if="startPage >= 2">Previous</button>
      <span>{{ startPage }} / {{ allPages }}</span>
      <button class=" mx-5 border-4 rounded-xl p-2 border-teal-600" @click="nextPage()" v-if="startPage !== allPages">Next</button>
    </div>
    </div>
  </div>
</template>