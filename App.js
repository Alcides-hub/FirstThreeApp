import React from 'react';
import TestApp from './TestApp'; // Adjust the path to where TestApp.js is located
import {Provider} from 'react-redux';
import {store} from './state/store';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
  <Provider store={store}>
      <NativeBaseProvider>
        <TestApp />
      </NativeBaseProvider>
    </Provider>
  );
}

