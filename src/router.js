import { createWebHistory, createRouter } from 'vue-router'

import pokedex from './views/pokedex.vue'
import pokecok from './views/pokecok.vue'
import pokematch from './views/pokematch.vue'
import pokespin from './views/pokespin.vue'
import pokecards from './views/pokecards.vue'

const routes = [
  { path: '/', component: pokedex },
  { path: '/pokecok', component: pokecok },
  { path: '/pokematch', component: pokematch },
  { path: '/pokespin', component: pokespin },
  { path: '/pokecards', component: pokecards },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router