// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Enable offline cache
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("⚠️ Persistence failed — multiple tabs open.");
  } else if (err.code === "unimplemented") {
    console.warn("⚠️ Persistence not available in this browser.");
  }
});

export { db };
