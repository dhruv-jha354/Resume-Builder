// Firebase import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyASDFkOIW5Ds3bnmDEi7f0TVad-YPH2jAE",
    authDomain: "resume-builder-6ce23.firebaseapp.com",
    projectId: "resume-builder-6ce23",
    storageBucket: "resume-builder-6ce23.firebasestorage.app",
    messagingSenderId: "726821599307",
    appId: "1:726821599307:web:c19ea3e7195b149407f5ce",
    measurementId: "G-W85FG6FNPF"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// authentication and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);