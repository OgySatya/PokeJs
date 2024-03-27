<script setup>
import { ref, reactive, computed } from 'vue'
const old = ref(-1)
const newa = ref(-1)
const picked1 = ref(null)
const picked2 = ref(null)
const pokemonCard = reactive({
  list: Array(8).fill(null) 
})
const cards = reactive ({})

playGame()
function playGame() {
  pokemonList()
  let clone = pokemonCard.list
  let xyz = JSON.parse(JSON.stringify(clone.concat(clone)))
  let abc = fisherYatesShuffle(xyz)
  function fisherYatesShuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
  cards.value = abc
}

async function fetchPokemon(pokemonId) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
}
function pokemonList() {
  pokemonCard.list.forEach(async (pokemon, index) => {
    const id = Math.floor(Math.random() * 251);
    const response = await fetchPokemon(id);
    const data = await response.json();
    pokemonCard.list[index] = data;
  })

}

function pick(id,index) {
  !picked1.value ? picked1.value = id : picked2.value = id;
  old.value==-1 ? old.value = index : newa.value = index;
  cards.value[index].is_default = false;
  if(picked2.value){
    matchingCard ()
  }
  
}
function matchingCard (){
  if( picked1.value == picked2.value) {
    picked1.value = null
    picked2.value = null
    old.value = -1
    newa.value = -1
  }else {
    setTimeout(() => {
    picked1.value = null
    picked2.value = null
    cards.value[newa.value].is_default = true
    cards.value[old.value].is_default = true
    old.value = -1
    newa.value = -1
  }, 1500)
  }
}

</script>

<template>
    <div class="mx-auto p-4 grid w-1/2 h-3/4 bg">
        <div class="mx-auto grid grid-cols-4 gap-2 " >
        <template v-for="(pokemon, index) in cards.value" :key="index">
            <button v-if="pokemon" class="w-32 h-36" @click="pick(pokemon.id,index)" >
              <div v-if="pokemon.is_default" class=" rounded-lg w-32 h-36 card"></div>
               <div v-else :class="pokemon.types[0].type.name" class="w-32 h-36 opacity-75 border-8 rounded-lg border-double border-zinc-700 mx-auto">
                <img class=" mx-auto w-28 h-28 front-face p-2 -mt-1" :src="pokemon.sprites.other.dream_world.front_default"/>
                <p class="uppercase font-bold">{{ pokemon.name }}</p>
             </div>
            </button>
        </template>
        </div>
        <button @click="playGame()" class="mt-5 mx-auto p-1 rounded-xl bg-gradient-to-br from-teal-300 to-lime-300  hover:scale-110 transition duration-500 ease-in-out">
            <span class="text-xl mx-auto px-4  text-orange-500 uppercase font-semibold bg-sky-100 rounded-lg active:text-yellow-400">Play Game</span>
        </button>
    <p>{{ picked1 }} and {{ picked2 }}</p>
    </div>
    
</template>
<style scoped>
.bg{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='35.584' height='30.585' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(168, 0%, 90%, 1)'/><path d='M36.908 9.243c-5.014 0-7.266 3.575-7.266 7.117 0 3.376 2.45 5.726 5.959 5.726 1.307 0 2.45-.463 3.244-1.307.744-.811 1.125-1.903 1.042-3.095-.066-.811-.546-1.655-1.274-2.185-.596-.447-1.639-.894-3.162-.546-.48.1-.778.58-.662 1.06.1.48.58.777 1.06.661.695-.149 1.274-.066 1.705.249.364.265.546.645.562.893.05.679-.165 1.308-.579 1.755-.446.48-1.125.744-1.936.744-2.55 0-4.188-1.538-4.188-3.938 0-2.466 1.44-5.347 5.495-5.347 2.897 0 6.008 1.888 6.388 6.058.166 1.804.067 5.147-2.598 7.034a.868.868 0 00-.142.122c-1.311.783-2.87 1.301-4.972 1.301-4.088 0-6.123-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.517-4.518-4.094 0-6.439 1.676-8.479 3.545.227-1.102.289-2.307.17-3.596-.496-5.263-4.567-7.662-8.159-7.662-5.015 0-7.265 3.574-7.265 7.116 0 3.377 2.45 5.727 5.958 5.727 1.307 0 2.449-.463 3.243-1.308.745-.81 1.126-1.903 1.043-3.095-.066-.81-.546-1.654-1.274-2.184-.596-.447-1.639-.894-3.161-.546-.48.1-.778.58-.662 1.06.099.48.579.777 1.059.66.695-.148 1.275-.065 1.705.25.364.264.546.645.563.893.05.679-.166 1.307-.58 1.754-.447.48-1.125.745-1.936.745-2.549 0-4.188-1.539-4.188-3.939 0-2.466 1.44-5.345 5.495-5.345 2.897 0 6.008 1.87 6.389 6.057.163 1.781.064 5.06-2.504 6.96-1.36.864-2.978 1.447-5.209 1.447-4.088 0-6.124-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.516-4.518v1.787c4.088 0 6.123 1.953 8.275 4.022 2.317 2.218 4.7 4.518 9.516 4.518 4.8 0 7.2-2.3 9.517-4.518 2.151-2.069 4.187-4.022 8.275-4.022s6.124 1.953 8.275 4.022c2.318 2.218 4.701 4.518 9.517 4.518 4.8 0 7.2-2.3 9.516-4.518 2.152-2.069 4.188-4.022 8.276-4.022s6.123 1.953 8.275 4.022c2.317 2.218 4.7 4.518 9.517 4.518v-1.788c-4.088 0-6.124-1.952-8.275-4.021-2.318-2.218-4.701-4.518-9.517-4.518-4.103 0-6.45 1.683-8.492 3.556.237-1.118.304-2.343.184-3.656-.497-5.263-4.568-7.663-8.16-7.663z'  stroke-width='1' stroke='none' fill='hsla(46, 7%, 74%, 1)'/><path d='M23.42 41.086a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.38-4.187-3.492-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.265 1.936-.745.414-.447.63-1.076.58-1.755-.017-.248-.2-.629-.547-.893-.43-.315-1.026-.398-1.704-.249a.868.868 0 01-1.06-.662.868.868 0 01.662-1.059c1.523-.348 2.566.1 3.161.546.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm0-30.585a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.381-4.187-3.493-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.266 1.936-.746.414-.446.629-1.075.58-1.754-.017-.248-.2-.629-.547-.894-.43-.314-1.026-.397-1.705-.248A.868.868 0 0117.014.77a.868.868 0 01.662-1.06c1.523-.347 2.566.1 3.161.547.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm29.956 1.572c-4.8 0-7.2-2.3-9.517-4.518-2.151-2.069-4.187-4.022-8.275-4.022S29.46 5.486 27.31 7.555c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518C6.124 5.486 4.088 3.533 0 3.533s-6.124 1.953-8.275 4.022c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518-2.152-2.069-4.188-4.022-8.276-4.022V1.746c4.8 0 7.2 2.3 9.517 4.518 2.152 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.276-4.022C-7.2 4.046-4.816 1.746 0 1.746c4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.318-2.218 4.7-4.518 9.517-4.518 4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.317-2.218 4.7-4.518 9.517-4.518v1.787c-4.088 0-6.124 1.953-8.275 4.022-2.317 2.234-4.717 4.518-9.517 4.518z'  stroke-width='1' stroke='none' fill='hsla(5, 9%, 62%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,-0.34)' fill='url(%23a)'/></svg>")
}
.card{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(19, 57%, 76%, 1)'/><path d='M0-10C-.011-4.49-4.485.03-10 .03-4.485.03-.011 4.49 0 10 .011 4.498 4.493.001 10-.01 4.493-.02.012-4.498 0-10zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01C4.493 19.98.012 15.502 0 10zm20-20C19.989-4.49 15.515.03 10 .03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99z'  stroke-width='1' stroke='hsla(18, 100%, 88%, 1)' fill='none'/><path d='M10 0C9.989 5.51 5.515 10.03 0 10.03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.998 10-10.01-5.507-.01-9.988-4.488-10-9.99z'  stroke-width='1' stroke='hsla(22, 50%, 55%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
}


</style>