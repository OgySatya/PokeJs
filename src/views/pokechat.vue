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
  push(db, {
    text: newMessage.value,
    user: {name : userData.value.name,
      img : userData.value.img,
      type : userData.value.type
    },
  });
  newMessage.value = '';
};
const passing = (data) => {
userData.value = data
};

</script>
<template>
  <main class="max-w-md mx-auto">
  <login  @event="passing" />
  <div class="artboard phone-4">
    <h1>Messages</h1>
    <ul class="p-5">
      <li v-for="message in messages" :key="message.id">
            <div class="chat chat-start">
      <div class="chat-image avatar" >
        <div class="size-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" :src="message.user.img" />
        </div>
      </div>
      <div class="chat-header font-semibold">
    {{message.user.name}}
  </div>
      <div class="chat-bubble text-black text-wrap h-auto w-fit" :class="message.user.type">{{ message.text }}</div>
    </div>
</li>
    </ul>
    <div class="join flex w-max mx-auto">
  <input class="input input-bordered join-item w-full " v-model="newMessage" placeholder="Enter your message"/>
  <button @click="addMessage" class="btn join-item">Send Text</button>
</div>
  </div>
  
</main>
</template>


