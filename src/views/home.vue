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
  <div
  class="rounded-lg bg-cover bg-no-repeat p-12 text-center h-screen m-5"
  style="background-image: url(https://images.alphacoders.com/603/603479.png)">

    <div class="py-5 justify-center text-white bg-slate-900 bg-opacity-70 rounded-xl w-3/4 mx-auto">
        <p class=" font-mono font-extrabold text-6xl text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-300">POKESINO</p>
        <p class="font-semibold text-center w-1/2 mx-auto my-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur animi nihil possimus ab aliquam, aut vel voluptatibus modi voluptas! Totam quaerat necessitatibus assumenda expedita nisi ipsa voluptatem earum cumque vitae.</p>
     </div>
    </div>

  <!-- <div class="flex m-10 ">
    <div class="h-44 w-80 bg-red-500 p-5">
        <div class="">
          <img class="w-72 blur-0" src="https://images.pokemontcg.io/xy5/logo.png" alt="" />
        </div>
    </div>
  </div> -->

<!--    
  <div class="">
  <div class="grid gap-x-6 md:grid-cols-3">
  <div  v-for="set in cardSets" :key="set.id" :value="set.id" class="hover:scale-110 duration-300">
    <img :src="set.images.logo"class="h-10" />
  </div>
  </div>
  </div> -->


</template>
<style>

</style>