// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-fbbdd.firebaseapp.com",
  projectId: "real-estate-fbbdd",
  storageBucket: "real-estate-fbbdd.firebasestorage.app",
  messagingSenderId: "559998723201",
  appId: "1:559998723201:web:da329e9f5f041d253c1980"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);