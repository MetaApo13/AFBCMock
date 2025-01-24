// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1zMjwDG9INObgpVNkrCOV-wh8HJZ0zMs",
  authDomain: "skilla-bc054.firebaseapp.com",
  projectId: "skilla-bc054",
  storageBucket: "skilla-bc054.firebasestorage.app",
  messagingSenderId: "278776346826",
  appId: "1:278776346826:web:461eba4b78c1fd54e2dc33",
  measurementId: "G-3CX9JNWF57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };