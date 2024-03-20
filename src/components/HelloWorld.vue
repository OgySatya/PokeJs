<script setup>
import { ref, reactive, computed } from 'vue'
import Loader from './Loader.vue'

const pickCount = 6;
const saved = localStorage.getItem("save") || 100000
const pokemonPicks = reactive({
  data: new Array(pickCount).fill(null)
})
const disabled = ref(true)
const shake = ref(false)
const dadu1 = reactive({
  img : '',
  type : '',
})
const dadu2 = reactive({
  img : '',
  type : '',
})
const dadu3 = reactive({
  img : '',
  type : '',
})
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
    }, 2000)
  }else {
    saldo = saldo + (uang * bet.value);
    list.value.unshift('Win  +'+ uang * bet.value); 
    setTimeout(() => {
      History.value.push(true);
    }, 2000)
  }
  localStorage.setItem("save", money.value)
  setTimeout(() => {
    play.value = 'You ' + list.value[0];
    money.value = money.value + saldo;
  }, 1800)
  riwayat.value.unshift(list.value[1])

  setTimeout( () => {dadu1.img = hasil1.sprites.other.dream_world.front_default;
                      dadu1.type = hasil1.types[0].type.name  }, 1100)
  setTimeout( () => {dadu2.img = hasil2.sprites.other.dream_world.front_default;
                      dadu2.type = hasil2.types[0].type.name  }, 1300)
  setTimeout( () => {dadu3.img = hasil3.sprites.other.dream_world.front_default;
                      dadu3.type = hasil3.types[0].type.name  }, 1500)

  if(money.value <= 0) {
    alert( 'Mulih malu Jon!!!')
  }
  if(riwayat.value.length > 10) {
    riwayat.value.pop();
  }
  console.log(log.rate)
  console.log(log.win, log.lose)
  console.log(winRate.winCount.value)
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
</script>

<template>
  <div class="mx-auto bg-sky-100 rounded-lg mt-5 p-4 flex">
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
  </div>

  <div v-if="pickedPokemon" class="rounded-lg container m-5 w-max grid grid-cols-2 gap-4 mx-auto">
      <div class="p-2 border-8 border-double border-zinc-700 rounded-2xl mx-auto">
        <img :class="types[0].type.name" class="rounded-lg w-96" :src="sprite"/>
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

        <div class="w-36"> 
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
            <p class="mt-5 text-center p-2 text-4xl font-bold border-4 rounded-full border-fuchsia-300">{{ pickedPokemon.id }}</p>
         </div>
      </section>
      </div>
      <section class="mt-4 mx-auto">
      
          <span  class="grid grid-cols-3 gap-4">
            <div :class="dadu1.type,{shake: shake}" class="rounded-xl p-2 ">
              <img  class="w-32 h-32 bg-white p-2 rounded-lg" :src="dadu1.img" />
            </div>
            <div :class="dadu2.type,{shake: shake}" class="rounded-xl p-2 ">
              <img  class="w-32 h-32 bg-white p-2 rounded-lg" :src="dadu2.img" />
            </div>
            <div :class="dadu2.type,{shake: shake}" class="rounded-xl p-2 ">
              <img  class="w-32 h-32 bg-white p-2 rounded-lg" :src="dadu2.img" />
            </div>
            <button class="mx-auto col-start-2 w-24 mt-2.5 p-1 px-4 font-bold text-xl rounded-xl text-gray-800 outline-double outline-3 outline-offset-2 border-2 border-indigo-400 hover:text-orange-700"
             @click="goyang(), mejudi()">KocoK</button>
          </span>
            <div class="h-10 -mb-3 mt-4">
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
</template>

<style scoped>
  .ground {
  background-color:#945400;
  color: white;
}
.rock {
  background-color:#d4cfc6;
  color: white;
}
.ghost {
  background-color:#dbd9d5;
}
.electric {
  background-color: #fffc45}
.bug {
  background-color: #508b2d;
}
.poison {
  background-color: #ca7de9;
  color: white;
}
.normal {
  background-color:#e0eff0;
}
.fairy {
  background-color: #F6D6A7}
.fire {
  background-color: #ff5436;
  color: white;
}
.grass {
  background-color:#b2f8b0;
}
.water {
  background-color:#46bdf5;
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
  background-color:#b3d5fdf8;
}
.dragon {
  background-color:#ca8b14f8;
  color: white;
}
.dark {
  background-color:#2b2a2af8;
  color: white;
}
.steel {
  background-color:#dbdbdbf8;
}
.flying {
  background-color:#879c7bf8;
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
