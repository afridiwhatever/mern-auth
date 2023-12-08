// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fcb11.firebaseapp.com",
  projectId: "mern-auth-fcb11",
  storageBucket: "mern-auth-fcb11.appspot.com",
  messagingSenderId: "261522353886",
  appId: "1:261522353886:web:9e093d4abd7b176ecfdc4f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
