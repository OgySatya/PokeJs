<script setup>
import { ref, reactive } from 'vue';
const emit = defineEmits(['event']);

const emitEvent = () => {
  emit('event', user);
};
const userName = ref('')
const pokemon = [{
  name: 'bulbasaur',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  type: 'grass'
},
{
  name: 'vulpix',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/37.svg',
  type: 'fire',
},
{
  name: 'squirtle',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
  type: 'water',
},
{
  name: 'pikachu',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
  type: 'electric',
},
{
  name: 'cubone',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/104.svg',
  type: 'ground',
},
{
  name: 'arbok',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/24.svg',
  type: 'poison',
},
{
  name: 'pidgey',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg',
  type: 'normal',
},
{
  name: 'onix',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/95.svg',
  type: 'rock',
},
{
  name: 'umbreon',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/197.svg',
  type: 'dark',
},
]
const user = reactive({})
const avatar = ref(-1)
function submit(index) {
  user.name = userName.value
  user.img = pokemon[index].img
  user.type = pokemon[index].type
  emitEvent()
}
</script>
<template>
  <div class="mx-auto block max-w-md rounded-lg bg-base-300 p-6">
    <h1 class="text-center text-2xl font-black my-2 drop-shadow-xl">Welcome to Pokemon Group Chat</h1>
    <form class="grid space-y-2 " @submit.prevent="submit(avatar)">
      <label class="input input-bordered flex items-center gap-2 ">
        Name
        <input type="text" class="grow" v-model="userName" placeholder="tulis nama ...." />
      </label>
      <select class="select select-bordered" v-model="avatar">
        <option disabled selected>pilih pokemon</option>
        <option v-for="(poke, index) in pokemon" :value="index">
          <p class=" capitalize">{{ poke.name }}</p>
        </option>

      </select>
      <button type="submit" class="btn btn-neutral">
        Submit
      </button>
    </form>
  </div>
</template>