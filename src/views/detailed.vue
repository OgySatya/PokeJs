<script setup>
const props = defineProps({
  pokek: String
})
</script>

<template>
  <div v-if="pokek" class=" w-max">
    <div class="p-1 m-5 border-8 border-double rounded-xl">
      <div :class="pokek.types[0].type.name" class="p-3 rounded-md">  
        <p class="text-5xl bg-clip-text text-center font-extrabold font-mono text-transparent bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ">Pokemon Data</p>
      <div v-if="pokek.types[1]"  :class="pokek.types[1].type.name" class=" bg-slate-50 rounded-full mx-auto w-96 p-4"> 
        <img class="mx-auto w-72 h-72" :src="pokek.sprites.other.dream_world.front_default"/> 
        <h1 class=" w-72 mx-auto text-center text-2xl font-bold uppercase bg-zinc-400 p-2 rounded-lg text-orange-600 shadow-md bg-opacity-70">
         #{{ pokek.id }} - {{ pokek.name }}</h1> </div>
      <div v-else class="mx-auto w-96 p-4"> 
        <img class="mx-auto w-72 h-72" :src="pokek.sprites.other.dream_world.front_default"/> 
        <h1 class=" w-72 mx-auto text-center text-2xl font-bold uppercase bg-zinc-300 p-2 rounded-lg text-orange-600 shadow-md bg-opacity-70">
         #{{ pokek.id }} - {{ pokek.name }}</h1> </div>
       <div class="flex border-4 mt-3 p-2 bg-amber-100 rounded-lg text-red-800 font-mono">
          <div class="grid w-40 ml-4">
            <div> <p class="font-bold ">Height</p> {{ pokek.height }}</div> 
            <div> <p class="font-bold ">Weight</p> {{ pokek.weight }}</div> 
            <div> <p class="font-bold">Ability</p>
              <p class="capitalize mx-auto">{{ pokek.abilities[0].ability.name }} 
              <div v-if="pokek.abilities[1]">{{ pokek.abilities[1].ability.name }}</div></p></div>
              <div class="mt-1"><p class="font-bold">Pokemon Type</p> 
                <p class="flex capitalize mt-1">
                <span :class="pokek.types[0].type.name" class=" p-1 px-2 rounded">{{ pokek.types[0].type.name}}</span>
                <span v-if="pokek.types[1]" :class="pokek.types[1].type.name" class="p-1 px-2 rounded ml-3">{{ pokek.types[1].type.name}}</span>
                </p></div>
           </div>
          <section class="ml-5">
            <div  v-for="(stat, index) in pokek.stats" :key="index">
              <div class="capitalize font-bold">{{ stat.stat.name }}</div>
                <div class=" w-64">
                    <div class="bg-slate-600 text-xs rounded-lg pl-2 text-white reverse max-w-60" :style="{width: `${stat.base_stat}%`}">{{ stat.base_stat }}</div>
                </div>
            </div>
          </section>
            
        </div> 
     </div>
   </div>
  </div>
  
 
</template>

