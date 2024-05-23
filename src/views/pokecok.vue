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
const type1 = ref('')
const type2 = ref('')
const type3 = ref('')
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
    const id = Math.floor(Math.random() * 649);
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
    ++uang;
  }
  if (hasil2.id === pick) {
    ++uang;
  }
  if (hasil3.id === pick) {
    ++uang;
  }

  if (uang === 0) {
    saldo = saldo - bet.value;
    list.value.unshift('Lose -' + bet.value);
    setTimeout(() => {
      History.value.push(false);
    }, 1500)
  } else {
    saldo = saldo + (uang * bet.value);
    list.value.unshift('Win  +' + uang * bet.value);
    setTimeout(() => {
      explode()
      History.value.push(true);
    }, 1500)
  }
  localStorage.setItem("save", money.value)
  setTimeout(() => {
    play.value = 'You ' + list.value[0];
    money.value = money.value + saldo;
  }, 1800)
  riwayat.value.unshift(list.value[1])

  setTimeout(() => {
    dadu1.value = hasil1.sprites.other.dream_world.front_default;
    type1.value = hasil1.types[0].type.name;
  }, 1100)
  setTimeout(() => {
    dadu2.value = hasil2.sprites.other.dream_world.front_default;
    type2.value = hasil2.types[0].type.name;
  }, 1300)
  setTimeout(() => {
    dadu3.value = hasil3.sprites.other.dream_world.front_default;
    type3.value = hasil3.types[0].type.name;
  }, 1500)

  if (money.value <= 0) {
    alert('Mulih malu Jon!!!')
  }
  if (riwayat.value.length > 10) {
    riwayat.value.pop();
  }
}

function reset() {
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
function allIn() {
  bet.value = money.value
}
function halfMoney() {
  bet.value = money.value / 2;
}
function quarter() {
  bet.value = money.value / 4;
}
const visible = ref(false);

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
};
</script>

<template>
  <div class="mx-auto p-2 lg:flex lg:w-max">
    <div class="grid">
      <div class="mx-auto grid grid-cols-3 gap-3 py-4 w-full lg:grid-cols-2 ">
        <template v-for="(pokemon, index) in pokemonPicks.data">
          <button v-if="pokemon"
            class="grid text-neutral-content btn lg:ring-4 ring-accent p-2 w-28 h-36 lg:w-44 lg:h-56 hover:text-error"
            @click="pick(index)" :class="pokemon.types[0].type.name, { 'ring-4 ring-error': pickedIndex === index }">
            <img class=" mx-auto w-24 h-24 lg:w-40 lg:-40 hover:scale-125 duration-300 "
              :src="pokemon.sprites.other.dream_world.front_default" />
            <p class="bg-neutral py-0.5 rounded-btn capitalize lg:text-xl"> {{ pokemon.name }}</p>
          </button>
          <Loader class=" w-28 h-36 lg:w-44 lg:h-56 btn ring-4 ring-accent p-2" v-else />
        </template>
      </div>
      <button @click="pokemonList()" class="btn bg-gradient-to-r from-primary to-accent text-base-100 mx-auto text-2xl">
        Generate Pokemon
      </button>
    </div>
    <main class="flex lg:p-4">
      <div class=" mx-auto border-8 overflow-hidden border-double border-accent rounded-btn h-fit hidden lg:grid ">
        <div v-if="pickedPokemon" class="mx-auto ">
          <div v-if="types[1]" :class="'bg-' + types[0].type.name" class="p-1">
            <div :class="types[1].type.name" class="rounded-full">
              <img class="h-96 w-96 " :src="sprite" />
            </div>
          </div>
          <div v-else :class="types[0].type.name" class="p-1">
            <img class="h-96 w-96  " :src="sprite" />
          </div>
          <section class="glass p-2 h-auto grid">
            <p class="text-2xl text-center uppercase font-bold bg-neutral text-neutral-content rounded-btn mb-1">#{{
          pickedPokemon.id }} - {{ pickedPokemon.name }}</p>
            <div class="flex">
              <div class="grid grid-cols-1 mr-4">
                <div v-for="(stat, index) in pickedPokemon.stats" :key="index">
                  <div class="capitalize font-bold">{{ stat.stat.name }} : {{ stat.base_stat
                    }}</div>
                  <progress class="progress progress-secondary w-44" :value="stat.base_stat / 2" max="100"></progress>
                </div>
              </div>
              <div class="grid">
                <div class="h-max">
                  <p class="font-bold text-xl">Ability</p>
                  <div v-for="ability in abilities" :key="ability">{{ ability.ability.name }}</div>
                  <p class="font-bold text-xl">Pokemon Type</p>
                  <div class="flex gap-2 capitalize mt-1">
                    <div v-for="element in types" :key="element" :class="element.type.name"
                      class="p-1 px-2 rounded-xl border border-neutral">{{ element.type.name }}</div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
        <div v-else class="w-96 mx-auto">
          <div class="flex flex-col gap-4 w-max mx-auto p-5">
            <div class="skeleton h-80 w-80 "></div>
            <div class="skeleton h-8 w-80"></div>
            <div class="flex justify-between">
              <div class="skeleton h-4 w-20"></div>
              <div class="skeleton h-4 w-28"></div>
              <div class="skeleton h-4 w-20"></div>
            </div>
          </div>
        </div>
      </div>
      <section class=" mt-4 mx-auto w-full lg:w-max lg:px-4 lg:mt-0">
        <ConfettiExplosion class="mx-auto h-full absolute overflow-hidden" v-if="visible" :particleSize="10"
          :duration="3000" />
        <span class="flex justify-between mx-auto px-10 lg:p-0">
          <img :class="{ shake: shake }, type1" class="p-2 lg:ring-4 ring-accent rounded-btn w-20 h-20 lg:w-32 lg:h-32"
            :src="dadu1" />
          <img :class="{ shake: shake }, type2" class="p-2 lg:ring-4 ring-accent rounded-btn w-20 h-20 lg:w-32 lg:h-32"
            :src="dadu2" />
          <img :class="{ shake: shake }, type3" class="p-2 lg:ring-4 ring-accent rounded-btn w-20 h-20 lg:w-32 lg:h-32"
            :src="dadu3" />
        </span>
        <button class="btn bg-gradient-to-r from-primary to-accent text-base-100 mx-auto text-2xl flex mt-4"
          @click="goyang(), mejudi()">KocoK</button>
        <div class="mt-4">
          <p v-if="disabled" class="h-8 text-center font-extrabold text-2xl text-base-content animate-bounce">{{ play
            }}
          </p>
          <p v-else class="h-8"></p>
        </div>

        <div class="flex text-info border-4 border-accent rounded-btn w-full lg:p-4">
          <div class="p-2">
            <p class="text-2xl text-center font-bold bg-warning text-base-100 rounded-btn mb-1">
              ShopeePay
            </p>
            <p class=" text-center font-black text-primary text-2xl">Rp.{{ money }}</p>
            <div class=" inline-grid">
              <p class="font-bold text-xl mt-3">Place your Bet</p>
              <input v-model="bet" type="number" step="1000"
                class="my-2 h-8 text-primary font-bold input input-bordered input-info w-44 lg:w-max" />
              <div class="inline-grid px-8 lg:flex lg:justify-between lg:px-0">
                <button class="btn btn-neutral btn-outline btn-sm" @click="allIn()"> All In </button>
                <button class="btn btn-neutral btn-outline btn-sm" @click="halfMoney()"> Half </button>
                <button class="btn btn-neutral btn-outline btn-sm" @click="quarter()"> Quarter </button>
              </div>
            </div>
          </div>

          <div class="p-2 grid ">
            <p>Win: {{ winRate.winCount }} || Lose: {{ winRate.loseCount }} </p>
            <p class="font-bold">Rate: {{ winRate.rate }}%</p>
            <ul class="bg-base-300 text-base-content p-3 pt-1 h-32 lg:h-64 my-2 rounded-btn overflow-hidden"
              v-if="list">
              <li v-for="item of riwayat">{{ item }}</li>
            </ul>
            <button class="btn bg-gradient-to-r from-primary to-accent text-base-100 btn-sm mt-2"
              @click="reset()">Reset</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
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