import { initializeApp } from "firebase/app";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCxyE_K949bzndu2uwGGZ6TMwUf3fp_TWU",
  authDomain: "pokejs-9f030.firebaseapp.com",
  projectId: "pokejs-9f030",
  storageBucket: "pokejs-9f030.appspot.com",
  messagingSenderId: "773492975021",
  appId: "1:773492975021:web:2b16a5f4158d2b55c92d24"
};


const app = initializeApp(firebaseConfig);
export default app;