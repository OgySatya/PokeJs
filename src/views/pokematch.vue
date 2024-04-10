<script setup>
import { ref, reactive, nextTick, watch} from 'vue'
import ConfettiExplosion from "vue-confetti-explosion";

const picked = ref(10)
const index1 = ref(-1)
const index2 = ref(-1)
const picked1 = ref(null)
const picked2 = ref(null)
const disable = ref(false)
const isMatch = ref([])
const attempt = ref(0)
let waktu = ref(true)
const time = ref()
const pokemonCard = reactive({
  list: Array(picked.value).fill(null) 
})
const cards = reactive ({})
const options = [
  {
    label: "5X2",
    value: 5,
  },
  {
    label: "5X4",
    value: 10,
  },
  {
    label: "5X6",
    value: 15,
  },
];

watch(picked, (value, oldValue) => {
  if (!!value && value > 0) {
    pokemonCard.list = Array(value).fill(null);
    playGame();
  }
})

function onSelectOption(option) {
  picked.value = option.value;
}

function playGame() {
  pokemonList()
  isMatch.value = []
  attempt.value = 0
  time.value = 0
  let clone = pokemonCard.list
  let xyz = JSON.parse(JSON.stringify(clone.concat(clone)))

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

  cards.value = fisherYatesShuffle(xyz)
}

async function fetchPokemon(pokemonId) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
}
function pokemonList() {
  pokemonCard.list.forEach(async (pokemon, index) => {
    const id = Math.floor(Math.random() * 251);
    const response = await fetchPokemon(id);
    const data = await response.json();

    data.flipped = true;
    pokemonCard.list[index] = data;

    // pokemonCard.list[index] = {
      // flipped: true,
      // ...data,
    // }
  })

}

function pick(id,index) {
  timer()
  if(!isMatch.value.includes(index)){
    if(disable.value == false){
      cards.value[index].flipped = false;
      if(!picked1.value){
        picked1.value = id
      } else if(index1.value !== index && picked1.value) {
        picked2.value = id
      };

      if(index1.value < 0) {
        index1.value = index
      } else if(index1.value !== index && index1.value > -1) {
        index2.value = index
      };
      if(picked2.value){
        cards.value[index1.value].held_items.is_default = false;
        cards.value[index2.value].held_items.is_default = false;
        matchingCard ();
        attempt.value += 1
        disable.value = true
      }
    }
  } 
}
function matchingCard (){
  if( picked1.value == picked2.value) {
    cards.value[index1.value].held_items.is_default = true;
    cards.value[index2.value].held_items.is_default = true;
    picked1.value = null;
    picked2.value = null;
    isMatch.value.push(index1.value)
    isMatch.value.push(index2.value)
    setTimeout(() => {
    index1.value = -1;
    index2.value = -1;
    disable.value = false
    if(isMatch.value.length == cards.value.length){
      explode()
      clearInterval(waktuId)
      waktu.value = true
      setTimeout(() => {alert('SELAMAT !!! Anda Menang dengan : '+attempt.value+' langkah dan waktu ' + time.value+'s') },500)
    }
    },700)
  }else {
    setTimeout(() => {
      picked1.value = null
      picked2.value = null
      cards.value[index2.value].flipped = true
      cards.value[index1.value].flipped = true
      index1.value = -1
      index2.value = -1
      disable.value = false
    }, 700)
  }
}
let waktuId;
function timer() {
  if (!!waktu.value) {
    waktuId = setInterval(() => {
      time.value += 1
    }, 1000);
    waktu.value = false
  } 
}
const visible = ref(false);

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
};
</script>

<template>
    <ConfettiExplosion class="mx-auto h-full" v-if="visible" :particleSize="10" :duration="3500"/>
    <div class="flex gap-2 items-center">
     
    </div>
    <div class="mx-auto p-4 grid bg w-max rounded-2xl">
        <div class="mx-auto grid grid-cols-5 gap-2 m-2 font-semibold text-xl " >
          <span class="my-3 col-start-1 col-end-1">Attempt : {{ attempt }}</span>
          <div v-for="(option, index) in options" :key="index" class="flex gap-1 items-center px-2 py-1">
        <label>
          <input type="radio" name="option" :value="option.value" @input="onSelectOption(option)" />
          {{ option.label }}
        </label>
      </div>
          <span class="my-3 col-start-5 col-end-5">Time : {{ time }}s</span>
        <template v-for="(pokemon, index) in cards.value" :key="index">
          <button v-if="pokemon" class="w-32 h-36" @click="pick(pokemon.id,index)" :key="index">
            <div v-if="pokemon.flipped" :class="{flip:pokemon.flipped}"  class=" w-32 h-36 card1 card rounded-lg hover:border-red-500"></div>
            <div v-else :class="pokemon.types[0].type.name , {shake: pokemon.held_items.is_default },{flip:!pokemon.flipped}"class="w-32 h-36 border-8 rounded-lg border-double border-yellow-400 mx-auto">
                <img class=" mx-auto w-28 h-28 front-face p-2 -mt-1" :src="pokemon.sprites.other.dream_world.front_default"/>
                <p class="uppercase font-bold">{{ pokemon.name }}</p>
             </div>
          </button>
            <div v-else class=" w-32 h-36 animate-pulse border-8 rounded-lg border-double border-zinc-700"></div>
        </template>
        </div>
        <button @click="playGame()" class="mt-5 mx-auto p-1 rounded-xl bg-gradient-to-br from-teal-300 to-lime-300  hover:scale-110 transition duration-500 ease-in-out">
            <span class="text-xl mx-auto px-4  text-orange-500 uppercase font-semibold bg-sky-100 rounded-lg active:text-yellow-400">Play Game</span>
        </button>
    </div>
    <div>  
      <div>
     
  </div>
  </div>
</template>
<style scoped>
.bg{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='35.584' height='30.585' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(168, 0%, 90%, 1)'/><path d='M36.908 9.243c-5.014 0-7.266 3.575-7.266 7.117 0 3.376 2.45 5.726 5.959 5.726 1.307 0 2.45-.463 3.244-1.307.744-.811 1.125-1.903 1.042-3.095-.066-.811-.546-1.655-1.274-2.185-.596-.447-1.639-.894-3.162-.546-.48.1-.778.58-.662 1.06.1.48.58.777 1.06.661.695-.149 1.274-.066 1.705.249.364.265.546.645.562.893.05.679-.165 1.308-.579 1.755-.446.48-1.125.744-1.936.744-2.55 0-4.188-1.538-4.188-3.938 0-2.466 1.44-5.347 5.495-5.347 2.897 0 6.008 1.888 6.388 6.058.166 1.804.067 5.147-2.598 7.034a.868.868 0 00-.142.122c-1.311.783-2.87 1.301-4.972 1.301-4.088 0-6.123-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.517-4.518-4.094 0-6.439 1.676-8.479 3.545.227-1.102.289-2.307.17-3.596-.496-5.263-4.567-7.662-8.159-7.662-5.015 0-7.265 3.574-7.265 7.116 0 3.377 2.45 5.727 5.958 5.727 1.307 0 2.449-.463 3.243-1.308.745-.81 1.126-1.903 1.043-3.095-.066-.81-.546-1.654-1.274-2.184-.596-.447-1.639-.894-3.161-.546-.48.1-.778.58-.662 1.06.099.48.579.777 1.059.66.695-.148 1.275-.065 1.705.25.364.264.546.645.563.893.05.679-.166 1.307-.58 1.754-.447.48-1.125.745-1.936.745-2.549 0-4.188-1.539-4.188-3.939 0-2.466 1.44-5.345 5.495-5.345 2.897 0 6.008 1.87 6.389 6.057.163 1.781.064 5.06-2.504 6.96-1.36.864-2.978 1.447-5.209 1.447-4.088 0-6.124-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.516-4.518v1.787c4.088 0 6.123 1.953 8.275 4.022 2.317 2.218 4.7 4.518 9.516 4.518 4.8 0 7.2-2.3 9.517-4.518 2.151-2.069 4.187-4.022 8.275-4.022s6.124 1.953 8.275 4.022c2.318 2.218 4.701 4.518 9.517 4.518 4.8 0 7.2-2.3 9.516-4.518 2.152-2.069 4.188-4.022 8.276-4.022s6.123 1.953 8.275 4.022c2.317 2.218 4.7 4.518 9.517 4.518v-1.788c-4.088 0-6.124-1.952-8.275-4.021-2.318-2.218-4.701-4.518-9.517-4.518-4.103 0-6.45 1.683-8.492 3.556.237-1.118.304-2.343.184-3.656-.497-5.263-4.568-7.663-8.16-7.663z'  stroke-width='1' stroke='none' fill='hsla(46, 7%, 74%, 1)'/><path d='M23.42 41.086a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.38-4.187-3.492-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.265 1.936-.745.414-.447.63-1.076.58-1.755-.017-.248-.2-.629-.547-.893-.43-.315-1.026-.398-1.704-.249a.868.868 0 01-1.06-.662.868.868 0 01.662-1.059c1.523-.348 2.566.1 3.161.546.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm0-30.585a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.381-4.187-3.493-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.266 1.936-.746.414-.446.629-1.075.58-1.754-.017-.248-.2-.629-.547-.894-.43-.314-1.026-.397-1.705-.248A.868.868 0 0117.014.77a.868.868 0 01.662-1.06c1.523-.347 2.566.1 3.161.547.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm29.956 1.572c-4.8 0-7.2-2.3-9.517-4.518-2.151-2.069-4.187-4.022-8.275-4.022S29.46 5.486 27.31 7.555c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518C6.124 5.486 4.088 3.533 0 3.533s-6.124 1.953-8.275 4.022c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518-2.152-2.069-4.188-4.022-8.276-4.022V1.746c4.8 0 7.2 2.3 9.517 4.518 2.152 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.276-4.022C-7.2 4.046-4.816 1.746 0 1.746c4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.318-2.218 4.7-4.518 9.517-4.518 4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.317-2.218 4.7-4.518 9.517-4.518v1.787c-4.088 0-6.124 1.953-8.275 4.022-2.317 2.234-4.717 4.518-9.517 4.518z'  stroke-width='1' stroke='none' fill='hsla(5, 9%, 62%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,-0.34)' fill='url(%23a)'/></svg>")
}
.card1{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(19, 57%, 76%, 1)'/><path d='M0-10C-.011-4.49-4.485.03-10 .03-4.485.03-.011 4.49 0 10 .011 4.498 4.493.001 10-.01 4.493-.02.012-4.498 0-10zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01C4.493 19.98.012 15.502 0 10zm20-20C19.989-4.49 15.515.03 10 .03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99z'  stroke-width='1' stroke='hsla(18, 100%, 88%, 1)' fill='none'/><path d='M10 0C9.989 5.51 5.515 10.03 0 10.03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.998 10-10.01-5.507-.01-9.988-4.488-10-9.99z'  stroke-width='1' stroke='hsla(22, 50%, 55%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
}
.flip {
  animation: flip 0.5s;
}

@keyframes flip {
  0%{
    transform: rotateY(180deg);
  }
}
.shake {
  animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}


</style>