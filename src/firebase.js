import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxyE_K949bzndu2uwGGZ6TMwUf3fp_TWU",
  authDomain: "pokejs-9f030.firebaseapp.com",
  databaseURL: "https://pokejs-9f030-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pokejs-9f030",
  storageBucket: "pokejs-9f030.appspot.com",
  messagingSenderId: "773492975021",
  appId: "1:773492975021:web:2b16a5f4158d2b55c92d24"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;