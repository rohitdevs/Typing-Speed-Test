import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrIPsqmpIJaAkSwq5mYpQ9x44l1Aqph9A",
    authDomain: "speedtype-project.firebaseapp.com",
    projectId: "speedtype-project",
    storageBucket: "speedtype-project.appspot.com",
    messagingSenderId: "104771988581",
    appId: "1:104771988581:web:90e1da4446a64ee21e6a8c",
    measurementId: "G-VHJD4P0Q58"
  };

  // const app = initializeApp(firebaseConfig);
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const db=firebaseApp.firestore();

  export {auth,db}

  // export const auth=getAuth(app);