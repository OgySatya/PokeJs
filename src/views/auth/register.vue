<script setup>
import { ref } from 'vue';

const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const warning = ref(false)

function registerUser () {
    if(password.value === confirmPassword.value){
    let user = [{
    firstName : firstName.value,
    lastName : lastName.value,
    userName : userName.value,
    password : password.value,
    confirmPassword : confirmPassword.value
    }]
    let getData = localStorage.getItem("userData")
    let allUser = getData ? JSON.parse(getData) : [];
    let combine = allUser.concat(user)
    localStorage.setItem("userData", JSON.stringify(combine));
    warning.value = false
}else {warning.value = true }
}
  
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Poke account
              </h1>
              <p v-if="warning" class="text-red-500 text-center text-sm font-semibold animate-bounce">Password Sing Patuh!!!</p>
              <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser()">
                  <div>
                      <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input type="string" v-model="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Lala">
                  </div>
                  <div>
                      <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input type="string" v-model="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Lele">
                  </div>
                  <div>
                      <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                      <input type="string" v-model="userName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Lala Lele">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" v-model="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" v-model="confirmPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  </div>
                  <button type="submit" class="w-full bg-amber-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-500">Create an account</button>
              </form>
          </div>
      </div>
  </div>
</section>
</template>