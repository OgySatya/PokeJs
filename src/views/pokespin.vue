<script setup>
import { ref, reactive, onBeforeMount, nextTick } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

const rotation = ref(0);
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
  rotation.value = (360 / 10) * index - 18;
  let oldDeg = 0;
  let putar = rotation.value + 1800 - oldDeg;
  degree.value = `rotate3d(0, 0, 1, ${putar}deg)`;
  spin.value = true;
  luckNumber.value = index;
  sumBet.value = 0;
  menang.value = 0;
  disabled.value = false;
  is_default();
  setTimeout(() => {
    oldDeg = (360 / 10) * index;
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
  <div class="flex my-5 p-10 spinBg rounded-2xl">
    <div class="p-4">
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="(pokemon, index) in pokemonData.data" :key="index" class="">
          <template v-if="pokemon">
            <div class="flex">
              <input
                v-model="pokemon.weight"
                orient="vertical"
                type="range"
                step="1000"
                min="0"
                max="10000"
                class="h-28"
                style="writing-mode: vertical-lr; direction: rtl"
              />
              <div>
                <img
                  v-if="!pokemon.is_default "
                  class="w-24 h-24 mx-auto rounded-xl animate-pulse"
                  :class="pokemon.types[0].type.name"
                  :src="pokemon.sprites.other.home.front_default"
                />
                <img
                   v-else
                  class="w-24 h-24 mx-auto"
                  :src="pokemon.sprites.other.home.front_default"
                />
              </div>
            </div>
            <p class="capitalize font-semibold text-center text-amber-700 -mt-3">
              {{ pokemon.name }}
            </p>
            <input
              v-model="pokemon.weight"
              type="number"
              class="w-24 mx-4 border-2 ring-1 ring-orange-500 border-amber-700 rounded-lg px-2 bg-stone-400"
            />
          </template>
        </li>
      </ul>
    </div>
    <div class="border-8 border-dashed border-stone-500 mx-6 rounded-2xl p-4">
      <div class="mx-auto">
        <button
          @click="getPokemon()"
          class="mx-12 bg-zinc-400 border-4 border-stone-700 ring-4 p-2 rounded-2xl font-bold text-xl text-gray-700"
        >
          Change Pokemon
        </button>
      </div>
      <p class="text-4xl font-bold text-amber-700 my-5 text-center">
        Rp.{{ dana }}
      </p>
      <ConfettiExplosion
        class="mx-auto h-full"
        v-if="visible"
        :particleSize="10"
        :duration="3500"
      />
      <div v-if="disabled" class="text-center">
        <p v-if="info" class="text-2xl font-semibold text-lime-700">
          Anda Menang
        </p>
        <p
          v-else-if="info === false"
          class="text-2xl font-semibold text-rose-700"
        >
          Anda Kalah
        </p>
        <p v-if="info !== null" class="text-2xl font-semibold text-teal-700">
          Rp.{{ total }}
        </p>
      </div>
    </div>
    <div class="mt-72">
      <div class="ml-3.5">
        <div
          v-if="pokemonData.data[0]"
          class="ml-64 ml -mt-32 absolute"
          :class="{ spiner: spin }"
          :style="{ transform: 'rotate(' + rotation + 'deg)' }"
        >
          <svg
            class=""
            height="160px"
            width="160px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.001 512.001"
            xml:space="preserve"
          >
            <path
              style="fill: #507c5c"
              d="M327.393,512c-2.389,0-4.779-0.617-6.924-1.854l-64.483-37.198l-64.483,37.2
			c-4.412,2.543-9.865,2.465-14.2-0.209c-4.335-2.673-6.854-7.509-6.56-12.593l12.332-213.415c0.441-7.641,7.001-13.473,14.633-13.035
			c7.641,0.442,13.476,6.994,13.035,14.633l-10.852,187.784l49.168-28.364c4.286-2.472,9.563-2.472,13.849,0l49.168,28.364
			l-2.09-36.162c-0.441-7.641,5.395-14.191,13.036-14.633c7.617-0.424,14.193,5.395,14.633,13.036l3.571,61.794
			c0.294,5.084-2.225,9.92-6.56,12.593C332.441,511.311,329.917,512,327.393,512z"
            />
            <polygon
              style="fill: #cff09e"
              points="255.985,131.829 314.332,205.191 398.961,205.191 255.985,13.857 113.009,205.191 
			197.639,205.191 "
            />
            <path
              style="fill: #507c5c"
              d="M409.599,196.277L267.086,5.562C264.47,2.062,260.355,0,255.985,0c-4.371,0-8.485,2.062-11.101,5.562
			L101.909,196.896c-3.14,4.202-3.638,9.815-1.289,14.503c2.35,4.688,7.145,7.649,12.388,7.649h84.63
			c4.224,0,8.216-1.926,10.846-5.231l47.501-59.726l39.813,50.059l10.26,164.98c0.425,7.369,6.534,13.059,13.821,13.059
			c0.269,0,0.54-0.008,0.812-0.024c7.641-0.442,13.476-6.992,13.035-14.633l-9.233-148.484h74.469c0.01,0,0.019,0,0.028,0
			c7.653,0,13.857-6.204,13.857-13.857C412.846,201.796,411.627,198.686,409.599,196.277z M321.015,191.334l-54.186-68.131
			c-2.629-3.305-6.622-5.231-10.846-5.231c-4.224,0-8.216,1.926-10.846,5.231l-54.186,68.131h-50.292L255.982,37.006l115.323,154.328
			H321.015z"
            />
          </svg>
          <div class="-mt-1">
            <button
              @click="spinArrow()"
              class="rounded-full border-8 border-dotted mx-auto w-16 h-16 ml-12 ring-4 ring-offset-4 ring-offset-slate-400 border-green-400 ring-lime-800 font-bold text-xl text-lime-800 animate-pulse focus:animate-none"
            >
              SPIN
            </button>
          </div>
          <div class="h-44"></div>
        </div>
      </div>
      <ul class="">
        <li
          v-for="(pokemon, index) in pokemonData.data"
          :key="index"
          class="p-1 border-4 border-stone-500 pokemon rounded-3xl"
          :style="{ '--v': index + 1 }"
        >
          <div
            v-if="pokemon"
            class="rounded-2xl"
            :class="pokemon.types[0].type.name"
          >
            <img
              class="w-32 h-32"
              :src="pokemon.sprites.other.dream_world.front_default"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.spinBg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(3) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(37, 60%, 80%, 1)'/><path d='M29.998 26.65v6.693zm-6.837 3.347h3.488zm10.185 0h3.489zm0 0a3.349 3.346 0 01-3.348 3.346 3.349 3.346 0 01-3.349-3.346 3.349 3.346 0 013.349-3.346 3.349 3.346 0 013.348 3.346zm-3.173-6.832c-1.978-.032-3.976.786-5.29 2.287-1.986 2.163-2.275 5.629-.727 8.113 1.45 2.442 4.522 3.736 7.287 3.116 3.067-.607 5.45-3.561 5.392-6.684.045-2.643-1.642-5.173-4.042-6.245a6.489 6.489 0 00-2.62-.587zM59.995 52.87v14.25zm-14.557 7.125h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zm-6.757-14.547c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM-.005 52.87v14.25zm-14.557 7.125h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zM.368 45.447c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM59.995-7.13V7.12zM45.438-.006h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zm-6.757-14.547c-4.212-.069-8.465 1.673-11.262 4.869C44.876-5.078 44.26 2.3 47.556 7.59c3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM-.005-7.13V7.12zM-14.562-.006h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zM.368-14.553c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249z'  stroke-width='1.5' stroke='hsla(32, 92%, 45%, 0.55)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
}
.pokemon {
  transform: rotate(calc(360deg / 10 * (var(--v) + 2)));
  transform-origin: 350px;
  position: absolute;
}
img {
  transform: rotate(calc(-360deg / 10 * (var(--v) + 2)));
}
.spiner {
  -moz-transition: all 0.5s linear;
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
  animation: spiner 3s;
  transition: 3s;
  border: crimson;
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
