import { useState, Suspense, useEffect} from 'react';
import { View}  from 'react-native';
import { Canvas} from '@react-three/fiber/native';
import * as Three from 'three';
import * as ScreenOrientation from 'expo-screen-orientation';
import ImageSphere from './components/imageSphere';
import SetupCamera from './components/setUpCamera';
// import CharacterImage from './components/character';
// import { db } from './firebaseConfig'; 
import { initializeApp } from "firebase/app";3
import * as Font from 'expo-font';
import CameraControls from './components/cameraControls';
import TouchControls from './components/buttonControls';
// import DialogueBox from './components/dialogueBox';
// import { doc, getDoc } from "firebase/firestore/lite";
import { Asset } from 'expo-asset';
import { NativeBaseProvider } from 'native-base';
import {Provider} from 'react-redux';
import {store} from './state/store';
import DialogueFetcher from './components/dialogueFetcher';
import Note from './components/Note';
import EggBox from './components/eggBox';
import Hotspot from './components/hotspot';
import ZoomControls from './components/zoomControls';
import SideDrawerMode from './components/SideDrawerMode';
import SideDrawerOption from './components/sideDrawer';
import ModeToggleControl from './components/ModeToggleControl';
import DrawerToggleButton from './components/DrawerToggleButton';
import BackButton from './components/BackButton';
import CameraStateUpdater from './components/cameraStateUpdater';


  
  export default function TestApp() {


    useEffect(() => {
        async function lockOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        
        lockOrientation();
      }, []);
      
    
      return (
        <Provider store={store}>
        <NativeBaseProvider>
        <View style={{ flex: 1, position: 'relative' }}>
          <Canvas camera={{ position: [0, 0, 19] }}>
            <SetupCamera  />
            <ambientLight />
            <pointLight position={[1, 15, 15]} />
            <CameraControls />
            <Suspense fallback={null}>
            <ImageSphere />
            <EggBox/>
            <Hotspot/>
            </Suspense>
            <ZoomControls />
            <CameraStateUpdater />
          </Canvas>
          <BackButton />
          <DrawerToggleButton/>
          <ModeToggleControl />
          <DialogueFetcher/>
          <Note />
          <SideDrawerMode />
          <SideDrawerOption />
          <TouchControls />
      </View>
    </NativeBaseProvider>
    </Provider>
  );
};
