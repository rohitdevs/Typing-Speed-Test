import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBrIPsqmpIJaAkSwq5mYpQ9x44l1Aqph9A",
    authDomain: "speedtype-project.firebaseapp.com",
    projectId: "speedtype-project",
    storageBucket: "speedtype-project.appspot.com",
    messagingSenderId: "104771988581",
    appId: "1:104771988581:web:90e1da4446a64ee21e6a8c",
    measurementId: "G-VHJD4P0Q58"
  };


  const firebaseapp=firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const db=firebaseapp.firestore();

  export {auth,db}