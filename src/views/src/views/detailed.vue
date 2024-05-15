<script setup>
const emit = defineEmits(["back"]);
const props = defineProps({
  pokek: String
})
</script>

<template>
  <div v-if="pokek" class="w-fit inset-0 fixed left-0 top-0 mx-auto">
    <div class="p-1 border-8 border-double rounded-xl">
      <button @click.prevent="$emit('back', false)" class="btn text-2xl btn-circle absolute right-2 top-2 m-3">✕</button>
      <div :class="pokek.types[0].type.name" class="p-2 rounded-md">
        <div v-if="pokek.types[1]" :class="pokek.types[1].type.name"
          class=" rounded-full mx-auto p-1 w-44 h-44 lg:w-96 lg:h-96">
          <img class="mx-auto w-40 h-40 lg:w-96 lg:h-96" :src="pokek.sprites.other.dream_world.front_default" />
        </div>
        <div v-else class="mx-auto p-1">
          <img class="mx-auto w-40 h-40 lg:w-96 lg:h-96" :src="pokek.sprites.other.dream_world.front_default" />
        </div>
        <h1 class="font-semibold btn grid bg-opacity-70 mt-1 text-xl">
          #{{ pokek.id }} - {{ pokek.name }}</h1>
        <div class="grid border-4 mt-1 p-1 mx-auto bg-amber-100 rounded-lg text-red-800 font-mono">
          <div class="grid grid-cols-2">
            <div class="hidden lg:block">
              <p class="font-bold ">Height</p> {{ pokek.height }}
            </div>
            <div class="hidden lg:block">
              <p class="font-bold ">Weight</p> {{ pokek.weight }}
            </div>
            <div>
              <p class="font-bold">Ability</p>
              <p class="capitalize mx-auto">{{ pokek.abilities[0].ability.name }}
              <div v-if="pokek.abilities[1]">{{ pokek.abilities[1].ability.name }}</div>
              </p>
            </div>
            <div class="mt-1">
              <p class="font-bold">Pokemon Type</p>
              <p class="flex capitalize mt-1">
                <span :class="pokek.types[0].type.name" class=" p-1 px-2 rounded">{{ pokek.types[0].type.name }}</span>
                <span v-if="pokek.types[1]" :class="pokek.types[1].type.name" class="p-1 px-2 rounded ml-3">{{
    pokek.types[1].type.name }}</span>
              </p>
            </div>
          </div>
          <section class="grid grid-cols-2 mt-2">
            <div v-for="(stat, index) in pokek.stats" :key="index">
              <div class="capitalize font-bold">{{ stat.stat.name }}</div>
              <div class=" w-40 lg:w-60">
                <div class="bg-slate-600 text-xs rounded-lg pl-2 text-white reverse max-w-40 lg:max-w-60"
                  :style="{ width: `${stat.base_stat}%` }">{{ stat.base_stat }}</div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>


</template>
