// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

  const firebaseConfig = {
  apiKey: "AIzaSyDBvFMbuFMuHanapAuqJYs5fle2EKuR97Y",
  authDomain: "decent-fb067.firebaseapp.com",
  projectId: "decent-fb067",
  storageBucket: "decent-fb067.firebasestorage.app",
  messagingSenderId: "1087864342102",
  appId: "1:1087864342102:web:269219e330aba4e9679df7",
  measurementId: "G-TC2MGSFTXZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;