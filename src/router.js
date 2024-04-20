import { createWebHistory, createRouter } from 'vue-router'

import home from './views/home.vue'
import pokedex from './views/pokedex.vue'
import login from './views/auth/login.vue'
import register from './views/auth/register.vue'
import pokecok from './views/pokecok.vue'
import pokematch from './views/pokematch.vue'
import pokespin from './views/pokespin.vue'
import pokecards from './views/pokecards.vue'

const routes = [
  { path: '/', component: home, meta: { requiresAuth: true }},
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/pokedex', component: pokedex, meta: { requiresAuth: true } },
  { path: '/pokecok', component: pokecok, meta: { requiresAuth: true } },
  { path: '/pokematch', component: pokematch, meta: { requiresAuth: true } },
  { path: '/pokespin', component: pokespin, meta: { requiresAuth: true } },
  { path: '/pokecards', component: pokecards, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const bolehLogin = JSON.parse(localStorage.getItem("auth"));
  if (to.meta.requiresAuth && !bolehLogin){
    next({path : '/login',})
  }
  if(to.path === "/login" && bolehLogin ){
    next({path : '/'});
  } 
  else next();
})

export default router