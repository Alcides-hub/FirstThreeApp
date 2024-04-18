import React, {useState, useEffect} from 'react';
// import FirstLevel from './FirstLevel'; // Adjust the path to where TestApp.js is located
import {Provider} from 'react-redux';
import {store} from './state/store';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
// import LoginScreen from './components/LoginScreen';
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebaseConfig';
import AppNavigator from './appNavigator';
import { clearFirestoreCollection } from './scripts/clearFirestoreCollection'; // Adjust path as needed
// import {fetchDialogue} from './actions/dialogueActions';
// import {useDispatch} from 'react-redux';


export default function App() {
  // const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        // User is logged in
        setUser(newUser);

        // Clear Firestore collection on successful login
        await clearFirestoreCollection('objects');
        // dispatch(fetchDialogue("kasa_dialogue", "kasa_start"));
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);


  return (
    <Provider store={store}>
    <NativeBaseProvider>
      <NavigationContainer>
      <AppNavigator user={user} setUser={setUser} />
      </NavigationContainer>
    </NativeBaseProvider>
  </Provider>
  );
}


