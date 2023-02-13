// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMBOXMTHSEKxID-wKEex3nmNoRqmm_wD4",
  authDomain: "helical-analyst-376421.firebaseapp.com",
  projectId: "helical-analyst-376421",
  storageBucket: "helical-analyst-376421.appspot.com",
  messagingSenderId: "376243716539",
  appId: "1:376243716539:web:224230609e73c04d8b049e",
  measurementId: "G-47B2D6EVKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);