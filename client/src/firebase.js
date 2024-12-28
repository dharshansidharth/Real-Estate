// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-3ef4d.firebaseapp.com",
  projectId: "real-estate-3ef4d",
  storageBucket: "real-estate-3ef4d.firebasestorage.app",
  messagingSenderId: "387786017708",
  appId: "1:387786017708:web:0f4066702cfb41d774c809"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);