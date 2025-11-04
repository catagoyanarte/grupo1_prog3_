import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA_TrHQN6iBgWHI44HWKxt9olJ-e2aUzYg",
  authDomain: "grupo1prog3.firebaseapp.com",
  projectId: "grupo1prog3",
  storageBucket: "grupo1prog3.firebasestorage.app",
  messagingSenderId: "211583340721",
  appId: "1:211583340721:web:982da1b1ed7501ec151290",
  measurementId: "G-Z99E5KZ0QE"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();