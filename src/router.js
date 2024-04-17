import { createWebHistory, createRouter } from 'vue-router'

import pokedex from './views/pokedex.vue'
import login from './views/auth/login.vue'
import register from './views/auth/register.vue'
import pokecok from './views/pokecok.vue'
import pokematch from './views/pokematch.vue'
import pokespin from './views/pokespin.vue'
import pokecards from './views/pokecards.vue'

const routes = [
  { path: '/', component: pokedex },
  { path: '/login', component: login },
  { path: '/login/register', component: register },
  { path: '/pokecok', component: pokecok },
  { path: '/pokematch', component: pokematch },
  { path: '/pokespin', component: pokespin },
  { path: '/pokecards', component: pokecards },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const bolehLogin = JSON.parse(localStorage.getItem("auth"));
  if(to.path !== "/login" && !bolehLogin ){
    next({path : '/login',})
  }
  if(to.path === "/login" && bolehLogin ){
    next({path : '/'});
  } 
  else next();
})

export default router