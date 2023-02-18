import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}D`,
    projectId:`${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAUZMtQaL6mab705cX4G69WHmsZXuJnHWU",
//     authDomain: "testingtrove-41496.firebaseapp.com",
//     projectId: "testingtrove-41496",
//     storageBucket: "testingtrove-41496.appspot.com",
//     messagingSenderId: "775415267833",
//     appId: "1:775415267833:web:f3a524361c91936fe6fd28"
//   };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  

  export { app, storage };
