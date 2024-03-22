import { createMemoryHistory, createRouter } from 'vue-router'

import pokedex from './views/pokedex.vue'
import pokecok from './views/pokecok.vue'

const routes = [
  { path: '/', component: pokedex },
  { path: '/pokecok', component: pokecok },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router