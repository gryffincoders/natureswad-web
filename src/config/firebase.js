// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6kAElzMkDNwPoDTNfPVl0EhZ5NJhAkxo",
  authDomain: "natureswad-83a35.firebaseapp.com",
  projectId: "natureswad-83a35",
  storageBucket: "natureswad-83a35.firebasestorage.app",
  messagingSenderId: "707227434311",
  appId: "1:707227434311:web:958f1d8a9d1a2e89352062",
  measurementId: "G-008SHG1LDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (Only runs in the browser, preventing crashes if you ever use Server-Side Rendering)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;