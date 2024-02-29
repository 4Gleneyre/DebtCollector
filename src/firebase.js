// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYwMwE8aEuB3fLYB1FIhQUK9e49ERqQDA",
    authDomain: "debtcollector-b406b.firebaseapp.com",
    projectId: "debtcollector-b406b",
    storageBucket: "debtcollector-b406b.appspot.com",
    messagingSenderId: "814039914761",
    appId: "1:814039914761:web:1a2829826db78cb2929bd8",
    measurementId: "G-W0E72RDCG1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export the Firestore instance
