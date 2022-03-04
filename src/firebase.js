import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBU1w6RMRLHQ5ID1juIFi7jsPiOJEd8aCs",
    authDomain: "todo-app-3b081.firebaseapp.com",
    projectId: "todo-app-3b081",
    storageBucket: "todo-app-3b081.appspot.com",
    messagingSenderId: "142371381221",
    appId: "1:142371381221:web:400fa0ae538daa395f590c",
    measurementId: "G-PQVHNV4GXW"
  };
  
  // Use this to initialize the firebase App
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  // Use these for db & auth
  const db = firebaseApp.firestore();
  
  export default db;