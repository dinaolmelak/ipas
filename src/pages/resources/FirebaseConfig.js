// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-fDYuzU2zczj2ht8W-h6_uQt5735MqDI",
  authDomain: "ipas-jsums.firebaseapp.com",
  projectId: "ipas-jsums",
  storageBucket: "ipas-jsums.appspot.com",
  messagingSenderId: "799905402476",
  appId: "1:799905402476:web:629001ca2fe4ff32329249",
  measurementId: "G-DHZ2280121"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;