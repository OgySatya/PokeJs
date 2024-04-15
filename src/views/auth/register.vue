<script>
import { ref, computed , reactive} from 'vue';

const newUser = reactive({
    firstName :'',
    lastName :'',
    userName :'',
    password :'',
    confirmPassword :''
})
const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')

function registerUser () {
    newUser.firstName = firstName.value
    newUser.lastName = lastName.value
    newUser.userName = userName.value
    newUser.password = password.value
    newUser.confirmPassword = confirmPassword.value
    console.log(firstName.value, lastName.value, userName.value,)
}
// addNewObject() {
//       // Retrieve the existing object from local storage
//       const existingObject = localStorage.getItem("myObject");
      
//       // Parse the JSON string back into an object, or initialize an empty object if it doesn't exist
//       let modifiedObject = existingObject ? JSON.parse(existingObject) : {};
      
//       // Add the new object to the existing object
//       modifiedObject = {...modifiedObject, ...this.newObjectToAdd};
      
//       // Serialize the modified object to JSON string
//       const serializedModifiedObject = JSON.stringify(modifiedObject);
      
//       // Store the modified serialized object in local storage
//       localStorage.setItem("myObject", serializedModifiedObject);
//     },
//     loadObject() {
//       // Retrieve the serialized object from local storage
//       const serializedObject = localStorage.getItem("myObject");
      
//       if (serializedObject) {
//         // Parse the JSON string back into an object
//         this.loadedObject = JSON.parse(serializedObject);
//       } else {
//         this.loadedObject = null;
//       }
//     }
  
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Poke account
              </h1>
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
                      <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" v-model="confirmPassword" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  </div>
                  <button type="submit" class="w-full bg-amber-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
              </form>
          </div>
      </div>
  </div>
</section>
</template>