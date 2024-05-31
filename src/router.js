import { createWebHistory, createRouter } from 'vue-router'

import home from './views/home.vue'
import pokedex from './views/pokedex.vue'
import login from './views/auth/login.vue'
import register from './views/auth/register.vue'
import pokecok from './views/pokecok.vue'
import pokematch from './views/pokematch.vue'
import pokespin from './views/pokespin.vue'
import pokecards from './views/pokecards.vue'
import pokechat from './views/pokechat.vue'

const routes = [
  { path: '/', component: pokechat, name: 'Pokechat'},
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/pokedex', component: pokedex, name: 'Pokedex'},
  { path: '/pokecok', component: pokecok, name: 'Pokecok'},
  { path: '/pokematch', component: pokematch, name: 'Pokematch'},
  { path: '/pokespin', component: pokespin, name: 'Pokespin'},
  { path: '/pokecards', component: pokecards, name: 'Pokecard'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'text-accent',
})

// router.beforeEach((to, from, next) => {
//   const bolehLogin = JSON.parse(localStorage.getItem("auth"));
//   if (to.meta.requiresAuth && !bolehLogin){
//     next({path : '/login',})
//   }
//   if(to.path === "/login" && bolehLogin ){
//     next({path : '/'});
//   } 
//   else next();
// })

export default router