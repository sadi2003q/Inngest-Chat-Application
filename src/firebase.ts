import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7nvlntDjrZbAKZ3GD7xNBTHg4TZ319HY",
  authDomain: "chatnow-bd883.firebaseapp.com",
  projectId: "chatnow-bd883",
  storageBucket: "chatnow-bd883.firebasestorage.app",
  messagingSenderId: "418617724834",
  appId: "1:418617724834:web:acafc5da43e78377322cfb",
  measurementId: "G-76PRL5X393"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// Exports
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
