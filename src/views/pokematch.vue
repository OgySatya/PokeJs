<script setup>
import { ref, reactive, nextTick, watch, onMounted } from 'vue'
import ConfettiExplosion from "vue-confetti-explosion";

const picked = ref(8)
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
const cards = reactive({})
watch(picked, (value, oldValue) => {
  if (!!value && value > 0) {
    pokemonCard.list = Array(value).fill(null);
    playGame();
  }
})
onMounted(() => {
  playGame();
});
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
  })

}
function pick(id, index) {
  timer()
  if (!isMatch.value.includes(index)) {
    if (disable.value == false) {
      cards.value[index].flipped = false;
      if (!picked1.value) {
        picked1.value = id
      } else if (index1.value !== index && picked1.value) {
        picked2.value = id
      };

      if (index1.value < 0) {
        index1.value = index
      } else if (index1.value !== index && index1.value > -1) {
        index2.value = index
      };
      if (picked2.value) {
        cards.value[index1.value].held_items.is_default = false;
        cards.value[index2.value].held_items.is_default = false;
        matchingCard();
        attempt.value += 1
        disable.value = true
      }
    }
  }
}
function matchingCard() {
  if (picked1.value == picked2.value) {
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
      if (isMatch.value.length == cards.value.length) {
        explode()
        clearInterval(waktuId)
        waktu.value = true
        setTimeout(() => { alert('SELAMAT !!! Anda Menang dengan : ' + attempt.value + ' langkah dan waktu ' + time.value + 's') }, 500)
      }
    }, 700)
  } else {
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
  <ConfettiExplosion class="mx-auto h-full" v-if="visible" :particleSize="10" :duration="3500" />
  <div class="mx-auto grid w-max">
    <div class="flex justify-between px-2 my-2 ">
      <select v-model="picked" class="bg-base-300 rounded-md font-bold p-2">
        <option disabled class="text-warning">Select Dificulty</option>
        <option :value="8">Level 1</option>
        <option :value="12">Level 2</option>
        <option :value="16">Level 3</option>
      </select>
      <span class="bg-base-300 rounded-md font-bold p-2">Attempt : {{ attempt }}</span>
      <span class="bg-base-300 rounded-md font-bold p-2">Time : {{ time }}s</span>
    </div>
    <div class="mx-auto grid grid-cols-4 gap-1 lg:gap-3 lg:grid-cols-8">
      <template v-for="(pokemon, index) in cards.value" :key="index">
        <button v-if="pokemon" class="w-24 h-28 lg:w-32 lg:h-40" @click="pick(pokemon.id, index)" :key="index">
          <div v-if="pokemon.flipped" :class="{ flip: pokemon.flipped }"
            class="w-24 h-28 lg:w-32 lg:h-40 bg-gradient-to-br from-primary via-secondary to-accent rounded-btn border-2 lg:border-4 hover:border-neutral">
          </div>
          <div v-else
            :class="pokemon.types[0].type.name, { shake: pokemon.held_items.is_default }, { flip: !pokemon.flipped }"
            class="w-24 h-28 lg:w-32 lg:h-40 border-2 lg:border-8 rounded-lg border-double border-neutral mx-auto">
            <img class=" mx-auto w-20 h-20 lg:w-28 lg:h-28 p-1"
              :src="pokemon.sprites.other.dream_world.front_default" />
            <p class=" badge badge-base-300 capitalize text-xs font-medium">{{ pokemon.name }}</p>
          </div>
        </button>
        <div v-else>
          <div
            class="w-24 h-28 lg:w-32 lg:h-40 animate-pulse border-2 lg:border-8 rounded-lg border-double border-neutral mx-auto flex items-center">
            <svg class="mx-auto fill-neutral" fill="#000000" width="70px" height="70px" viewBox="0 0 512 512"
              data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
              <title />
              <path
                d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z" />
            </svg>
          </div>
        </div>
      </template>
    </div>
    <button @click="playGame()" class="btn btn-neutral font-bold w-fit mx-auto my-2">Play Game</button>
  </div>
  <div>
    <div>

    </div>
  </div>
</template>
<style scoped>
.flip {
  animation: flip 0.5s;
}

@keyframes flip {
  0% {
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