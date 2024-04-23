import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './appNavigator';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';
import { setUser, clearUser } from './state/actions/authActions'; // Adjust the import paths as needed

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        // User is logged in
        const userData = {
          id: newUser.uid,
          email: newUser.email,
          emailVerified: newUser.emailVerified,
          isAnonymous: newUser.isAnonymous,
        };
        store.dispatch(setUser(userData));
      } else {
        // User is logged out
        store.dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

