import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6-YLFRt85C36_SSO6v5ZlGn2sC573mDs",
  authDomain: "decision-graveyard-c68dc.firebaseapp.com",
  projectId: "decision-graveyard-c68dc",
  storageBucket: "decision-graveyard-c68dc.firebasestorage.app",
  messagingSenderId: "476359071544",
  appId: "1:476359071544:web:844d62e31fcd18452ad3cd",
  measurementId: "G-PXEH21YZZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };