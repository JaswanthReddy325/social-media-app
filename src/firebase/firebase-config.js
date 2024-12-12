import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAQAlCsXkXqKVgAtCKWhbTxiJVXgfvVVtk",
    authDomain: "socialmedia-application-683bd.firebaseapp.com",
    projectId: "socialmedia-application-683bd",
    storageBucket: "socialmedia-application-683bd.firebasestorage.app",
    messagingSenderId: "853543339792",
    appId: "1:853543339792:web:4cdd000876f1e8203ac795",
    measurementId: "G-J84MWFK9VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
