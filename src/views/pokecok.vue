<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import Loader from './Loader.vue'
import ConfettiExplosion from "vue-confetti-explosion";

const pickCount = 6;
const saved = localStorage.getItem("save") || 100000
const pokemonPicks = reactive({
  data: new Array(pickCount).fill(null)
})
const disabled = ref(true)
const shake = ref(false)
const dadu1 = ref('')
const dadu2 = ref('')
const dadu3 = ref('')
const riwayat = ref([])
const list = ref([])
const play = ref('')
const pickedIndex = ref(-1)
const bet = ref(1000)
const History = ref([])
const money = ref(JSON.parse(saved))

async function fetchPokemon(pokemonId) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
}
function pokemonList() {
  pokemonPicks.data.forEach(async (pokemon, index) => {
    const id = Math.floor(Math.random() * 251);
    const response = await fetchPokemon(id);
    const data = await response.json();
    pokemonPicks.data[index] = data;
  })
  console.log(pokemonPicks.data)
}

const pickedPokemon = computed(() => {
  return pokemonPicks.data[pickedIndex.value];
})

const sprite = computed(() => {
  return !pickedPokemon.value ? "" : pickedPokemon.value.sprites.other.home.front_default;
})
const types = computed(() => {
  return !pickedPokemon.value ? [] : pickedPokemon.value.types;
})
const abilities = computed(() => {
  return !pickedPokemon.value ? [] : pickedPokemon.value.abilities;
})
const winRate = computed(() => {
  const winCount = History.value.filter(state => !!state);
  const loseCount = History.value.filter(state => !state);
  return {
    winCount: winCount.length,
    loseCount: loseCount.length,
    rate: Math.round((winCount.length / History.value.length) * 100) || 0
  }
})

function pick(pokemonIndex) {
  pickedIndex.value = pokemonIndex;
}

async function mejudi() {
  const hasil1 = pokemonPicks.data[Math.floor(Math.random() * pokemonPicks.data.length)];
  const hasil2 = pokemonPicks.data[Math.floor(Math.random() * pokemonPicks.data.length)];
  const hasil3 = pokemonPicks.data[Math.floor(Math.random() * pokemonPicks.data.length)];

  let uang = 0;
  let saldo = 0;
  const pick = pokemonPicks.data[pickedIndex.value].id;

  if (hasil1.id === pick) {
    ++uang ;
  }
  if (hasil2.id === pick) {
    ++uang ;
  }
  if (hasil3.id === pick) {
    ++uang ;
  }

  if(uang === 0) {
    saldo = saldo - bet.value;
    list.value.unshift('Lose -'+ bet.value); 
    setTimeout(() => {
      History.value.push(false);
    }, 1500)
  }else {
    saldo = saldo + (uang * bet.value);
    list.value.unshift('Win  +'+ uang * bet.value); 
    setTimeout(() => {
      explode ()
      History.value.push(true);
    }, 1500)
  }
  localStorage.setItem("save", money.value)
  setTimeout(() => {
    play.value = 'You ' + list.value[0];
    money.value = money.value + saldo;
  }, 1800)
  riwayat.value.unshift(list.value[1])

  setTimeout( () => {dadu1.value= hasil1.sprites.other.dream_world.front_default;
                     }, 1100)
  setTimeout( () => {dadu2.value= hasil2.sprites.other.dream_world.front_default;
                     }, 1300)
  setTimeout( () => {dadu3.value= hasil3.sprites.other.dream_world.front_default;
                     }, 1500)

  if(money.value <= 0) {
    alert( 'Mulih malu Jon!!!')
  }
  if(riwayat.value.length > 10) {
    riwayat.value.pop();
  }
}

function reset () {
  localStorage.clear()
  riwayat.value = []
  money.value = 100000
}

function goyang() {
  shake.value = true
  disabled.value = false
  setTimeout(() => {
    shake.value = false
    disabled.value = true
  }, 1600)
}
function allIn () {
  bet.value = money.value
}
function halfMoney () {
  bet.value = money.value / 2 ;
}
function quarter () {
  bet.value = money.value / 4 ;
}
const visible = ref(false);

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
};
</script>

<template>
  <div class="mx-auto cokBg rounded-lx p-4 grid w-max">
    <div class="mx-auto grid grid-cols-3 gap-5 p-4 " >
      <template v-for="(pokemon, index) in pokemonPicks.data">
        <button v-if="pokemon" class="card" @click="pick(index)" :class="pokemon.types[0].type.name">
        <img class="jpg" :src="pokemon.sprites.other.dream_world.front_default"/>
        {{ pokemon.name }}</button>
        <Loader v-else /> 
      </template>
      <button @click="pokemonList()" class="col-start-2 inline-flex p-1.5 rounded-xl group bg-gradient-to-br from-teal-300 to-lime-300  hover:scale-110 transition duration-500 ease-in-out">
        <span class="text-4xl mx-auto px-4 text-orange-500 uppercase font-semibold bg-sky-100 rounded-lg active:text-yellow-400">Let's Go !!!</span>
      </button>
    </div>
  
  <div v-if="pickedPokemon" class="rounded-lg grid grid-cols-2 gap-4 mx-auto">
      <div class="p-2 border-8 border-double border-zinc-700 rounded-2xl mx-auto">
      <div v-if="types[1]":class="types[0].type.name" class="h-80 w-80 rounded-xl">
        <div :class="types[1].type.name" style="border-radius: 50%;" > 
        <img :src="sprite"/>
        </div>
     </div>
     <div v-else :class="types[0].type.name" class="h-80 w-80 rounded-xl" >
        <img :src="sprite"/>
     </div>
     <p class="text-2xl text-center uppercase font-bold">{{ pickedPokemon.name }}</p>
      <section class="grid grid-cols-2">
        <div>
        <div  v-for="(stat, index) in pickedPokemon.stats" :key="index">
          <div class="mb-0.5 capitalize font-bold">{{ stat.stat.name }}</div>
            <div class="w-36 ">
                <div class="bg-violet-500 text-sm rounded-lg pl-2 p-0.5 max-w-40 text-white font-bold reverse" :style="{width: `${stat.base_stat}%`}">{{ stat.base_stat }}</div>
            </div>
        </div>
      </div>

        <div class="m-2"> 
            <p class="font-bold text-xl">Ability</p>
              <div class="gap-2 items-center mt-1">
                <div v-for="ability in abilities" :key="ability">{{ ability.ability.name }}</div>
              </div>

              <div class="mt-1">
                <p class="font-bold text-xl">Pokemon Type</p> 
                <div class="flex gap-2 capitalize mt-1">
                <div v-for="element in types" :key="element" :class="element.type.name" class="p-1 px-2 rounded-xl border border-slate-800">{{ element.type.name }}</div>
              </div>
            </div> 
            <p class="mt-5 w-28 text-2xl font-bold text-center p-2 border-8 border-double border-zinc-700 rounded-2xl mx-auto">{{ pickedPokemon.id }}</p>
         </div>
      </section>
      </div>
      <section class="mt-4 mx-auto">
        <ConfettiExplosion class="mx-auto h-full" v-if="visible" :particleSize="10" :duration="3000"/>
          <span  class="grid grid-cols-3 gap-2">
              <img :class="{shake: shake}" class="p-2 border-4 border-orange-200 ring-4 ring-offset-2 ring-lime-300 rounded-lg w-32 h-32" :src="dadu1" />
              <img :class="{shake: shake}" class="p-2 border-4 border-orange-200 ring-4 ring-offset-2 ring-lime-300 rounded-lg w-32 h-32" :src="dadu2" />
              <img :class="{shake: shake}" class="p-2 border-4 border-orange-200 ring-4 ring-offset-2 ring-lime-300 rounded-lg w-32 h-32" :src="dadu3" />
            <button class="mx-auto col-start-2 w-24 mt-2.5 p-1 px-4 font-bold text-xl rounded-xl text-gray-800 outline-double outline-3 outline-offset-2 border-2 border-indigo-400 hover:text-orange-700"
             @click="goyang(), mejudi()">KocoK</button>
          </span>
            <div class="h-10 -mb-4 mt-6">
              <p v-if="disabled" class="text-center font-extrabold text-2xl text-emerald-800 animate-bounce">{{ play }}</p>
            </div>
            
          <div class="grid grid-cols-2 gap-1">
            <div class="p-3">
            <p class="font-bold text-xl">Place your Bet</p>
            <input type="number" class="border-2 my-3 px-2 w-40 ring-offset-2 ring-4 border-teal-400 rounded-md" v-model="bet"> <br>
            <button class="rounded-xl border-2 mr-1 p-1 px-2 border-violet-500 focus:ring-2 focus:ring-amber-600" @click="allIn()"> All In </button> 
            <button class="rounded-xl border-2 m-1 p-1 px-2 border-violet-500 focus:ring-2 focus:ring-amber-600" @click="halfMoney()"> Half </button> 
            <button class="rounded-xl border-2 m-1 p-1 px-2 border-violet-500 focus:ring-2 focus:ring-amber-600" @click="quarter()"> Quarter </button> 
            <p class="font-bold text-xl">Your Uang </p>
            <span class="font-bold text-2xl text-violet-800">Rp. {{ money }}</span>
           </div>
          
           <div class="p-3 my-3">
            <p>Win: {{ winRate.winCount }} || Lose: {{ winRate.loseCount }} </p>
            <p class="font-bold">Rate: {{ winRate.rate }}%</p>
            <ul class="border-2 border-dashed border-red-700 p-3 pt-1 h-64 rounded-lg background-image: linear-gradient(to right, red , yellow);" v-if="list">
            <li v-for="item of riwayat">{{ item }}</li>
           </ul>
           <button class="mt-4 text-red-700 font-bold hover:text-white border border-red-700 hover:bg-red-800 ring-4  ring-red-300 rounded-lg px-3 py-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" 
              @click="reset()">Reset</button>
          </div>
        </div>
      </section>
          
    </div>
    
  </div>
</template>

<style>
.cokBg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='79.75' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(205, 22%, 82%, 1)'/><path d='M6.78 0 0 6.78v2.4L7.98 1.2l6.8 6.8C9.84 12.9 4.92 17.82 0 22.75v2.4l.6-.6 7.36-7.37a10.42 10.42 0 0 1-.58 14.15L.06 38.67 0 38.62v2.5l.06-.05 6.72 6.72L0 54.6V57l.6-.6 7.36-7.37a10.42 10.42 0 0 1-.58 14.16L0 70.56v2.4l6.78 6.78h2.4l-.6-.6-7.38-7.38 6.78-6.8 14.78 14.78h2.4L17.2 71.8a10.4 10.4 0 0 1 14.14.56l7.39 7.4h2.53l6.8-6.8 6.78 6.8h2.4l-.6-.6-7.36-7.37a10.4 10.4 0 0 1 14.14.58l7.4 7.38h2.4L80 72.96v-2.4l-7.98 7.98-6.8-6.78 6.8-6.8L80 56.99v-2.4l-7.96 7.96a10.42 10.42 0 0 1 .57-14.14l7.33-7.33.06.06v-2.51l-.06.05-6.73-6.73L80 25.15v-2.4c-2.64 2.67-5.3 5.32-7.96 7.97a10.42 10.42 0 0 1 .57-14.15L80 9.18v-2.4L73.2 0h-2.4c2.68 2.65 5.34 5.32 8 7.98l-6.78 6.79L57.24 0h-2.4l7.96 7.96a10.42 10.42 0 0 1-14.14-.58L41.26 0h-2.53l-6.79 6.78L25.15 0h-2.39l7.95 7.95a10.42 10.42 0 0 1-14.14-.56L9.18 0ZM40 1.14l6.78 6.79-14.74 14.74a10.42 10.42 0 0 1 .57-14.14ZM16 9.15a12.15 12.15 0 0 0 12.87 1.94 12.15 12.15 0 0 0 1.98 12.77L24 30.72a12.1 12.1 0 0 0-12.87-1.94A12.15 12.15 0 0 0 9.15 16Zm48 0L70.85 16a12.15 12.15 0 0 0-1.99 12.78A12.1 12.1 0 0 0 56 30.7l-6.85-6.85a12.15 12.15 0 0 0 1.98-12.77c4.3 1.9 9.32 1.15 12.87-1.94zm-16.05 0a10.42 10.42 0 0 1-.56 14.15L32.02 38.67l-6.8-6.78L47.95 9.15Zm.03 15.95 22.73 22.72a10.42 10.42 0 0 1-14.14-.56L41.2 31.9Zm-31.94 4.32c2.67 0 5.34 1.02 7.38 3.06L38.8 47.86l-6.78 6.79L9.28 31.9a10.4 10.4 0 0 1 6.76-2.5zm47.92 0c2.67 0 5.34 1.02 7.38 3.06l7.39 7.4-6.79 6.78L57.2 31.9a10.4 10.4 0 0 1 6.76-2.5zm-55.9 3.66c4.9 4.92 9.82 9.84 14.74 14.75a10.42 10.42 0 0 1-14.14-.57l-7.4-7.39Zm31.94 0 6.78 6.8L40 46.65l-6.8-6.79Zm7.98 8 6.8 6.78-6.8 6.79-.6.59c-5.1 5.12-10.22 10.24-15.34 15.35a10.42 10.42 0 0 1 .57-14.15l15.37-15.37ZM24 49.01l6.85 6.85a12.15 12.15 0 0 0-1.99 12.79A12.1 12.1 0 0 0 16 70.59l-6.85-6.85a12.15 12.15 0 0 0 1.98-12.78c4.3 1.9 9.32 1.15 12.87-1.94zm32 0a12.15 12.15 0 0 0 12.86 1.94 12.15 12.15 0 0 0 1.99 12.78L64 70.6a12.1 12.1 0 0 0-12.87-1.94 12.15 12.15 0 0 0-1.98-12.78zm-8.05 8.05a10.42 10.42 0 0 1-.56 14.15L40 78.6l-6.8-6.8c4.93-4.9 9.84-9.82 14.75-14.74z'  stroke-width='2' stroke='none' fill='hsla(206, 9%, 69%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
}
  .ground {
  background-color:#945400c7;
  color: white;
}
.rock {
  background-color:#d4cfc6c7;
  color: white;
}
.ghost {
  background-color:#dbd9d5c7;
}
.electric {
  background-color: #fffc45c7}
.bug {
  background-color: #508b2dc7;
}
.poison {
  background-color: #ca7de9c7;
  color: white;
}
.normal {
  background-color:#e0eff0c7;
}
.fairy {
  background-color: #F6D6A7c7}
.fire {
  background-color: #ff5436c7;
  color: white;
}
.grass {
  background-color:#b2f8b0c7;
}
.water {
  background-color:#46bdf5c7;
  color: white;
}
.fighting {
  background-color:#756b49c7;
  color: white;
}
.psychic {
  background-color:#351e38c7;
  color: white;
}
.ice {
  background-color:#8eb3ddc7;
}
.dragon {
  background-color:#ca8b14c7;
  color: white;
}
.dark {
  background-color:#2b2a2ac7;
  color: white;
}
.steel {
  background-color:#dbdbdbc7;
}
.flying {
  background-color:#879c7bc7;
}
.shake {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
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