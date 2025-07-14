// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCcoV6KEwBQrLCIKTq8nDUULIhvEgcVfeM",
  authDomain: "travelmate-48d26.firebaseapp.com",
  projectId: "travelmate-48d26",
  storageBucket: "travelmate-48d26.firebasestorage.app",
  messagingSenderId: "476776053532",
  appId: "1:476776053532:web:aecc82b33e789add13d8d9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 