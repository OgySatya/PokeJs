<script setup>
import { ref, onMounted, reactive } from 'vue';
import database from '../firebase';
import { ref as dbRef, onValue, push, set } from 'firebase/database';
import login from './auth/chatlogin.vue'

const messages = ref([]);
const newMessage = ref('');
const userData = ref()

onMounted(() => {
  const db = dbRef(database, 'messages/');
  onValue(db, (snapshot) => {
    const data = snapshot.val();
    messages.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
  });
});

const addMessage = () => {
  const db = dbRef(database, 'messages/');
  let now = new Date();
  let formattedDate = now.toLocaleString()
  push(db, {
    text: newMessage.value,
    time: formattedDate,
    user: {
      name: userData.value.name,
      img: userData.value.img,
      type: userData.value.type
    },
  });
  newMessage.value = '';
};
const passing = (data) => {
  userData.value = data
};
function logout() {
  userData.value = ''
}

</script>
<template>
  <div class="artboard phone-2 mx-auto m-1">
    <login @event="passing" v-if="!userData" />
    <main v-else class="relative">
      <div class="navbar bg-neutral text-neutral-content justify-between rounded-t-box">
        <div class="flex space-x-2 px-3 rounded-btn">
          <div class="size-14 p-2 mask mask-squircle" :class="userData.type"><img class="size-12 scale-125"
              :src="userData.img" /></div>
          <p class="text-2xl font-extrabold">{{ userData.name }}</p>
        </div>
        <button @click="logout()">
          <svg class="h-8 w-8 text-neutral-content" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </button>
      </div>
      <ul class="overflow-x-auto h-[650px] border-neutral border-x-4 bg-base-100">
        <li v-for="message in messages" :key="message.id">
          <div class="chat p-2 " :class="(message.user.name === userData.name ? 'chat-start' : 'chat-end')">
            <div class="chat-image avatar">
              <div class="size-10">
                <img class="" :src="message.user.img" />
              </div>
            </div>
            <div class="chat-header font-semibold">
              {{ message.user.name }}
            </div>
            <div class="chat-bubble text-black text-wrap" :class="message.user.type">{{ message.text }}
            </div>
            <div class="chat-footer opacity-50">
              {{ message.time }}
            </div>
          </div>
        </li>
      </ul>
      <form @submit.prevent="addMessage()"
        class="join mx-auto w-full rounded-none border-4 border-neutral rounded-b-box">
        <input class="input input-ghost join-item w-full" v-model="newMessage" placeholder="Enter your message" />
        <button type="submit" class="bg-neutral px-3  join-item rounded-none">
          <svg class="h-8 w-8 text-neutral-content rotate-45" width="24" height="24" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
          </svg>
        </button>
      </form>
    </main>


  </div>
</template>
<style></style>
