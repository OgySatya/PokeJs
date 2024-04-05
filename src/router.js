import { createMemoryHistory, createRouter } from 'vue-router'

import pokedex from './views/pokedex.vue'
import pokecok from './views/pokecok.vue'
import pokematch from './views/pokematch.vue'
import pokespin from './views/pokespin.vue'

const routes = [
  { path: '/', component: pokedex },
  { path: '/pokecok', component: pokecok },
  { path: '/pokematch', component: pokematch },
  { path: '/pokespin', component: pokespin },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router