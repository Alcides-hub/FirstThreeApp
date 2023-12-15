import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyD_pXgo9SF67fDf4r_ibq-lV3ctbLdar9k",
    authDomain: "tokkaidoapp.firebaseapp.com",
    databaseURL: "https://tokkaidoapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tokkaidoapp",
    storageBucket: "tokkaidoapp.appspot.com",
    messagingSenderId: "756050415760",
    appId: "1:756050415760:web:9b0385bbf413d444964815",
    measurementId: "G-Z12YHWVYDT"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the Firebase app
const firestore = getFirestore(app);

// Initialize Firebase Authentication with the Firebase app
const auth = getAuth(app);

// Export Firebase app, Firestore, and Firebase Authentication
export { app, firestore, auth };