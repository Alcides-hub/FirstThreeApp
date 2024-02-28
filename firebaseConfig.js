import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // or 'firebase/firestore' for the full SDK
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD_pXgo9SF67fDf4r_ibq-lV3ctbLdar9k",
  authDomain: "tokkaidoapp.firebaseapp.com",
  databaseURL:
    "https://tokkaidoapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tokkaidoapp",
  storageBucket: "tokkaidoapp.appspot.com",
  messagingSenderId: "756050415760",
  appId: "1:756050415760:web:9b0385bbf413d444964815",
  measurementId: "G-Z12YHWVYDT",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication with custom persistence
// This is the only initialization of Auth needed
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, db, auth };