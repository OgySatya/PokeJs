<template>
  <div>
    <h1>Messages</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
    <h2>Add Message</h2>
    <input v-model="newMessage" placeholder="Enter your message" />
    <button @click="addMessage">Add Message</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import database from '../firebase';
import { ref as dbRef, onValue, push } from 'firebase/database';

const messages = ref([]);
const newMessage = ref('');

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
    text: newMessage.value
  });
  newMessage.value = '';
};
</script>
