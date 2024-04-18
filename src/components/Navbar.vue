<script setup>
import { ref, onMounted} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const name = ref()
onMounted(() => {
    if (localStorage.user) {
      name.value = localStorage.user;
    }
}) 
  
function logOut () {
    localStorage.setItem("auth", false);
    localStorage.setItem("user", '');
    router.push({ path: '/login' });
    location.reload()
}
</script>

<template>
    <nav class="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-between">
    <ul class="flex p-1">
        <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
            <RouterLink to="/pokedex">PokeDex</RouterLink>
        </li>
        <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
            <RouterLink to="/pokecok">PokeCok</RouterLink>
        </li>
        <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
            <RouterLink to="/pokematch">PokeMatch</RouterLink>
        </li>
        <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
            <RouterLink to="/pokespin">PokeSpin</RouterLink>
        </li>
        <li class="mr-6 text-2xl font-bold text-sky-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">
            <RouterLink to="/pokecards">PokeCards</RouterLink>
        </li>
    </ul>
    <div class="m-1 border-4 inline-flex rounded-xl"> 
    <p v-if="name" class="text-xl font-bold text-violet-500 px-2.5 py-1 border-r-4 capitalize">{{ name }}</p>
    <button @click="logOut()" class="text-xl font-bold text-violet-500 hover:bg-gray-700 hover:text-white rounded-md px-2.5 py-1">Log out</button>
    </div>
    </nav>
    
</template>
