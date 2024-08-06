// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnu3HEzAb5YQ6945hjMvX1PkIlvljVHjU",
  authDomain: "toursite-d133f.firebaseapp.com",
  projectId: "toursite-d133f",
  storageBucket: "toursite-d133f.appspot.com",
  messagingSenderId: "341982185720",
  appId: "1:341982185720:web:e73fea88fb98b4c8bc130d",
  measurementId: "G-DEFYXV5GKN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const _ = getAnalytics(app);
