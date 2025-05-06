import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8stdbse2GLR9ndtAsRZLnw_FzVZVTock",
  authDomain: "vistsroom.firebaseapp.com",
  projectId: "vistsroom",
  storageBucket: "vistsroom.firebasestorage.app",
  messagingSenderId: "29629035358",
  appId: "1:29629035358:web:9d295b8412318836b015cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
