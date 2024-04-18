<script setup>
import { ref, computed , onMounted} from 'vue';
import axios from 'axios';

const cardSets = ref()
onMounted(() => {
    getSets()
    
})
async function getSets() {
    const response = await axios.get('https://api.pokemontcg.io/v2/sets');
    cardSets.value = response.data.data;
}
</script>
<template>
  <div class="mt-5 p-3">
    <p class=" font-mono font-bold text-3xl text-center ">POKESINO</p>
    <p class=" font-bold text-xl text-center ">Home Page</p>
    <p class="font-semibold text-center w-1/2 mx-auto my-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur animi nihil possimus ab aliquam, aut vel voluptatibus modi voluptas! Totam quaerat necessitatibus assumenda expedita nisi ipsa voluptatem earum cumque vitae.</p>
  </div> 
  <div class="flex">
  <div class="m-4">
    <img src="https://images.alphacoders.com/603/603479.png" class="p-2">
  </div>
  <div class="grid gap-x-6 md:grid-cols-3">
  <div  v-for="set in cardSets" :key="set.id" :value="set.id" class="hover:scale-110 duration-300">
    <img :src="set.images.logo"class="h-10" />
  </div>
  </div>
  </div>


</template>
<style>
.bghome{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M15 22h10m-10-4h10M35 2h10M35 38h10m-50 0H5M-5 2H5'  stroke-linejoin='round' stroke-linecap='round' stroke-width='2.5' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none'/><path d='M18-5V5m4-10V5m16 10v10M18 35v10m4-10v10M2 15v10'  stroke-linejoin='round' stroke-linecap='round' stroke-width='2.5' stroke='hsla(339.6,82.2%,51.6%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-24,-16)' fill='url(%23a)'/></svg>")
}
</style>