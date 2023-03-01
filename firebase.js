// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {doc,addDoc, getDoc, setDoc, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-JNQTp3sQG0Sroivl2kZ_LEgGNfGh4kI",
  authDomain: "travel-buddy-f1db8.firebaseapp.com",
  projectId: "travel-buddy-f1db8",
  storageBucket: "travel-buddy-f1db8.appspot.com",
  messagingSenderId: "674071523667",
  appId: "1:674071523667:web:5ab5fb85eb0cb12892b1a6",
  measurementId: "G-7RSBZQ4MG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;