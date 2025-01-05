import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyChYjDo2RGAupiV2h-O816RdgIbESQ5ik8",
  authDomain: "todo-list-55767.firebaseapp.com",
  projectId: "todo-list-55767",
  storageBucket: "todo-list-55767.firebasestorage.app",
  messagingSenderId: "416968415245",
  appId: "1:416968415245:web:2cd136f08079b176dd5d44",
  measurementId: "G-R9FVZWNJVP"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)
export const db = getFirestore(firebase);
