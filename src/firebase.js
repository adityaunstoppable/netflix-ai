// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7cjj99SCuGaBmJ8of2NpZT01ST8Kti6w",
  authDomain: "netflix-ai-aditya.firebaseapp.com",
  projectId: "netflix-ai-aditya",
  storageBucket: "netflix-ai-aditya.appspot.com",
  messagingSenderId: "48070626782",
  appId: "1:48070626782:web:be0e2ac56d8a14e33f214f",
  measurementId: "G-TPC5JH37Z7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
