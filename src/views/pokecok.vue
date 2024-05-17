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
  <div class="mx-auto rounded-lx p-4 inline-flex w-max">

    <div class="mx-auto grid grid-cols-2 gap-2 p-4 w-fit " >
      <template v-for="(pokemon, index) in pokemonPicks.data">
        <button v-if="pokemon" class="w-52 h-60 btn p-2" @click="pick(index)" :class="pokemon.types[0].type.name">
        <img class="h-40 mx-auto" :src="pokemon.sprites.other.dream_world.front_default"/>
        <p class="badge badge-lg badge-warning badge-outline capitalize border-2"> {{ pokemon.name }}</p></button>
        <Loader v-else /> 
      </template>
    
    </div>
    <div class="grid mx-auto p-4">
      <div v-if="pickedPokemon" class="border-8 border-double border-warning rounded-2xl mx-auto h-fit">
      <div v-if="types[1]":class="types[0].type.name" class="rounded-t-lg p-1">
        <div :class="types[1].type.name" class="rounded-full" > 
        <img class="h-80 w-80 " :src="sprite"/>
        </div>
     </div>
     <div v-else :class="types[0].type.name" class="h-80 w-80 rounded-xl" >
        <img :src="sprite"/>
     </div>
     <section class=" grid glass rounded-b-lg p-2">
        <p class="text-2xl text-center uppercase font-bold bg-neutral text-neutral-content rounded-btn mb-1">#{{ pickedPokemon.id }} - {{ pickedPokemon.name }}</p>
        <div class="flex">
            <div class="grid grid-cols-1">
            <div  v-for="(stat, index) in pickedPokemon.stats" :key="index">
              <div class="mb-0.5 capitalize font-bold">{{ stat.stat.name }}</div>
                <div class="w-48 ">
                    <div class="bg-violet-500 text-sm rounded-lg pl-2 p-0.5 max-w-44 text-white font-bold reverse" :style="{width: `${stat.base_stat}%`}">{{ stat.base_stat }}</div>
                </div>
            </div>
           </div>
            <div class="grid"> 
              <div class="h-fit">
                    <p class="font-bold text-xl">Ability</p>
                    <div v-for="ability in abilities" :key="ability">{{ ability.ability.name }}</div>
                    <p class="font-bold text-xl">Pokemon Type</p> 
                    <div class="flex gap-2 capitalize mt-1">
                    <div v-for="element in types" :key="element" :class="element.type.name" class="p-1 px-2 rounded-xl border border-slate-800">{{ element.type.name }}</div>
                    </div> 
                  </div>
            </div>
        
      </div>
      </section>
    </div>
        <button @click="pokemonList()" class="btn glass mx-auto text-2xl mt-4">
        Generate Pokemon
        </button>
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
</template>

<style>
.ground {
  background-color:#945400c7;
}
.rock {
  background-color:#d4cfc6c7;
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
}
.normal {
  background-color:#e0eff0c7;
}
.fairy {
  background-color: #F6D6A7c7}
.fire {
  background-color: #ff5436c7;
}
.grass {
  background-color:#b2f8b0c7;
}
.water {
  background-color:#46bdf5c7;
}
.fighting {
  background-color:#756b49c7;
}
.psychic {
  background-color:#351e38c7;
}
.ice {
  background-color:#8eb3ddc7;
}
.dragon {
  background-color:#ca8b14c7;
}
.dark {
  background-color:#2b2a2ac7;
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