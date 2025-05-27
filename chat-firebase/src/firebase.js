// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqTwB8S4wYHnw0Pp5u7dX91SR1zXi7r5A",
  authDomain: "chat-firebase-48e1e.firebaseapp.com",
  projectId: "chat-firebase-48e1e",
  storageBucket: "chat-firebase-48e1e.firebasestorage.app",
  messagingSenderId: "549425771817",
  appId: "1:549425771817:web:1be26a65dc49a20b27f338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };