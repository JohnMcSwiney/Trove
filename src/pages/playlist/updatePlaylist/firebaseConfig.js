import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMBOXMTHSEKxID-wKEex3nmNoRqmm_wD4",
    authDomain: "helical-analyst-376421.firebaseapp.com",
    projectId: "helical-analyst-376421",
    storageBucket: "helical-analyst-376421.appspot.com",
    messagingSenderId: "376243716539",
    appId: "1:376243716539:web:224230609e73c04d8b049e",
    measurementId: "G-47B2D6EVKF",
  };

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();