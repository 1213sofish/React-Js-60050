// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7e1ZrVvot06HBTQaPDaMNLdKZDNDIIMY",
    authDomain: "proyecto-e92bb.firebaseapp.com",
    projectId: "proyecto-e92bb",
    storageBucket: "proyecto-e92bb.firebasestorage.app",
    messagingSenderId: "1052364826541",
    appId: "1:1052364826541:web:02dd0ed7b91d092be5a324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)