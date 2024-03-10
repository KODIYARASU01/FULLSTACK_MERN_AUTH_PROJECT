// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-90e79.firebaseapp.com",
  projectId: "mern-auth-90e79",
  storageBucket: "mern-auth-90e79.appspot.com",
  messagingSenderId: "46213656177",
  appId: "1:46213656177:web:fba05b35f5c674339ab5d0",
  measurementId: "G-VMVGL1Q7G7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);