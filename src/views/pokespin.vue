<script setup>
import { ref, reactive, onBeforeMount, nextTick } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

const rotation = ref(0);
const oldRotation = ref(0)
const spin = ref(false);
const degree = ref(``);
const deg = ref(``);
const luckNumber = ref(0);
const dana = ref(100000);
const sumBet = ref(0);
const menang = ref(0);
const total = ref(0);
const info = ref(null);
const disabled = ref(true);
const arrowPosition = ref(``)
const pokemonData = reactive({
  data: new Array(10).fill(null),
});

async function fetchPokemon(pokemonId) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
}
function getPokemon() {
  pokemonData.data.forEach(async (pokemon, index) => {
    const id = Math.floor(Math.random() * 251);
    const response = await fetchPokemon(id);
    const data = await response.json();
    pokemonData.data[index] = data;
    pokemonData.data[index].weight = 0;
  });
}

onBeforeMount(() => {
  getPokemon();
});

function spinArrow() {
  const index = Math.floor(Math.random() * 10) + 1;
  rotation.value = (360 / 10 * index - 36);
  let putar = rotation.value + 1800 - oldRotation.value;
  degree.value = `rotate3d(0, 0, 1, ${putar}deg)`;
  spin.value = true;
  luckNumber.value = index;
  sumBet.value = 0;
  menang.value = 0;
  disabled.value = false;
  is_default();
  setTimeout(() => {
    oldRotation.value = rotation.value
    arrowPosition.value = `rotate(${rotation.value}deg)`
    gatcha();
    spin.value = false;
    deg.value = `rotate3d(0, 0, 1, ${rotation.value}deg)`;
    total.value = menang.value - sumBet.value;
    dana.value += total.value;
    info.value = false;
    if (menang.value > sumBet.value) {
      info.value = true;
      explode();
    } else if (menang.value === sumBet.value) {
      info.value = null;
    }
    disabled.value = true;
  }, 3000);
}
function taruhan() {
  sumBet.value = pokemonData.data.reduce((acc, item) => {
    return acc + +item.weight;
  }, 0);
}

function gatcha() {
  menang.value += pokemonData.data[luckNumber.value - 1].weight * 10;
  pokemonData.data[luckNumber.value - 1].is_default = false;
  taruhan();
}
function is_default() {
  pokemonData.data.forEach((item) => {
    item.is_default = true;
  });
}
const visible = ref(false);

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
};

</script>

<template>
  <div class="grid mx-auto w-max lg:flex">
    <main class="mx-auto my-4 lg:m-5 ">
      <div class="container w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] lg:mx-2 ">
        <button class="arrow" @click="spinArrow()">
          <svg :class="{ spiner: spin }" class="fill-primary w-24 h-24 lg:w-44 lg:h-44"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1"
            id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
            <g transform="translate(-1)">
              <g>
                <g>
                  <path
                    d="M402.067,179.2l-128-170.667c-8.533-11.378-25.6-11.378-34.133,0l-128,170.667     c-10.548,14.064-0.513,34.133,17.067,34.133h64v85.333c0,11.782,9.551,21.333,21.333,21.333h85.333     c11.782,0,21.333-9.551,21.333-21.333v-85.333h64C402.58,213.333,412.614,193.264,402.067,179.2z M299.667,170.667     c-11.782,0-21.333,9.551-21.333,21.333v85.333h-42.667V192c0-11.782-9.551-21.333-21.333-21.333h-42.667L257,56.889     l85.333,113.778H299.667z" />
                  <path
                    d="M299.667,341.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,384,214.333,384h85.333     c11.782,0,21.333-9.551,21.333-21.333S311.449,341.333,299.667,341.333z" />
                  <path
                    d="M299.667,405.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,448,214.333,448h85.333     c11.782,0,21.333-9.551,21.333-21.333S311.449,405.333,299.667,405.333z" />
                  <path
                    d="M299.667,469.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,512,214.333,512h85.333     c11.782,0,21.333-9.551,21.333-21.333S311.449,469.333,299.667,469.333z" />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <div v-for="(pokemon, index) in pokemonData.data" :key="index"
          class="wheel border-8 border-accent ring-8 ring-neutral" :style="{ '--v': index + 1 }">
          <span class="poke flex items-center" v-if="pokemon" :class="pokemon.types[0].type.name">
            <img class="h-20 w-20 lg:w-32 lg:h-32 mx-auto" :style="{ '--v': index + 1 }"
              :src="pokemon.sprites.other.dream_world.front_default" />
          </span>
        </div>
      </div>
    </main>

    <div class="mx-auto grid lg:m-2 w-max">
      <ConfettiExplosion v-if="visible" class="mx-auto" :particleSize="10" :duration="3500" />
      <button @click="getPokemon()" class="bg-primary text-2xl lg:py-1 py-0.5 text-neutral-content font-bold rounded-t-btn">
        Change Pokemon
      </button>
      <ul class="grid grid-cols-5 gap-1 bg-accent lg:p-2 lg:gap-4">
        <li v-for="(pokemon, index) in pokemonData.data" :key="index">
          <div v-if="pokemon" :class="pokemon.types[0].type.name" class="lg:p-1 rounded-box">
            <div class="flex mx-auto ">
              <input v-model="pokemon.weight" orient="vertical" type="range" step="1000" min="0" max="10000"
                class="h-24 hidden lg:block" style="writing-mode: vertical-lr; direction: rtl" />
              <img class="w-[70px] h-[70px] lg:w-20 lg:h-20 mx-auto rounded-xl"
                :class="{ 'animate-bounce': !pokemon.is_default }" :src="pokemon.sprites.other.home.front_default" />
            </div>
            <p class="capitalize font-semibold text-center text-amber-700  hidden lg:block lg:text-lg">
              {{ pokemon.name }}
            </p>
            <input v-model="pokemon.weight" type="number" class="w-[75px] lg:w-24 text-sm mx-auto input h-6" />
          </div>
        </li>
      </ul>
      <button @click="spinArrow()" class="bg-secondary text-2xl lg:py-1 py-0.5 text-neutral-content font-bold rounded-b-btn">
        Spin Pokemon
      </button>
      <aside class="mx-auto my-4 bg-neutral rounded-btn w-full inline-grid items-start  h-40 ">
        <div class="text-2xl font-bold text-center ">
          <p class="lg:text-3xl text-warning-content bg-warning lg:py-1 py-0.5 rounded-t-btn">ShopeePay</p>
          <p class="text-neutral-content">
            Rp.{{ dana }}
          </p>
        </div>

        <div v-if="disabled" class="text-center">
          <p v-if="info" class="text-2xl font-semibold text-success">
            Anda Menang
          </p>
          <p v-else-if="info === false" class="text-2xl font-semibold text-error">
            Anda Kalah
          </p>
          <p v-if="info !== null" class="text-2xl font-semibold text-neutral-content">
            Rp.{{ total }}
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.container .arrow {
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transform: v-bind(arrowPosition);
}

.container .wheel {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  transform: rotate(9deg);
}

.container .poke {
  position: absolute;
  height: 50%;
  width: 50%;
  transform-origin: bottom right;
  transform: rotate(calc((360deg / 10 * var(--v))));
  clip-path: polygon(0 0, 49% 0, 100% 100%, 0 49%);
}

.container .poke img {
  position: relative;
  transform: rotate(calc(-9deg - 36deg * var(--v)))
}

.spiner {
  -moz-transition: all 0.5s linear;
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
  animation: spiner 3s;
  transition: 3s;
}

@keyframes spiner {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: v-bind(deg);
  }

  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: v-bind(degree);
  }
}
</style>
