<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authName = ref()
const authPass = ref()
const warning = ref(false)

function login (){
  let getData = localStorage.getItem("userData")
  let data =  JSON.parse(getData)
  const find = data.find(({ userName }) => userName === authName.value)
  let fullName =''
  if( find ){
      if(find.password === authPass.value){
      fullName = find.firstName + ' ' + find.lastName
      warning.value = false
      router.push({ path: '/' })
      localStorage.setItem("auth", true);
      localStorage.setItem("user", fullName);
      location.reload()
      }else{
      warning.value = true
    }
 }
 else{
      warning.value = true
    }
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p v-if="warning" class="text-red-500 text-center text-sm font-semibold animate-bounce">User Name & Password Pelih!!!</p>
        <form class="space-y-4" @submit.prevent="login()">
          <div>
            <label for="userName" class="block text-sm font-medium leading-6 text-gray-900">User Name</label>
            <div class="mt-2">
              <input v-model="authName" type="string" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
              </div>
            </div>
            <div class="mt-1">
              <input v-model="authPass" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
        <div class="mt-3 font-semibold text-indigo-600 hover:text-indigo-500 text-right">
            <RouterLink to="/register">Sing Ngelah Account?</RouterLink>
        </div>
      </div>
    </div>
  </template>