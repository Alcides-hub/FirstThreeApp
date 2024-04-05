import { useState, Suspense, useEffect} from 'react';
import { View}  from 'react-native';
import { Canvas} from '@react-three/fiber/native';
import * as Three from 'three';
import * as ScreenOrientation from 'expo-screen-orientation';
import ImageSphere from './components/imageSphere';
import SetupCamera from './components/setUpCamera';
// import CharacterImage from './components/character';
// import { db } from './firebaseConfig'; 
import { initializeApp } from "firebase/app";
import * as Font from 'expo-font';
import CameraControls from './components/cameraControls';
import TouchControls from './components/buttonControls';
// import DialogueBox from './components/dialogueBox';
// import { doc, getDoc } from "firebase/firestore/lite";
import { Asset } from 'expo-asset';
// import { NativeBaseProvider } from 'native-base';
// import {Provider} from 'react-redux';
// import {store} from './state/store';
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
import ImageModal from './modal/imageModal';
import {useDispatch, useSelector} from 'react-redux';
import  {setImageOpen, setZoomCompleted} from './actions/dialogueActions';


  
  export default function TestApp() {

    const isImageOpen = useSelector(state => state.dialogue.isImageOpen);
    const isZoomCompleted = useSelector((state) => state.dialogue.isZoomCompleted);
    const dispatch = useDispatch();


    useEffect(() => {
        async function lockOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        
        lockOrientation();
      }, []);

      useEffect(() => {
        if (isZoomCompleted) {
          dispatch(setImageOpen(true)); // Opens the modal
          // Optionally reset zoom completion for future actions
          // dispatch(setZoomCompleted(false));
          console.log(`Zoom Completed: ${isZoomCompleted}, Image Open: ${isImageOpen}`);
        }
      }, [isZoomCompleted, dispatch]);

      const handleClose = () => {
        dispatch(setImageOpen(false));
        // dispatch(setZoomCompleted(false));
        console.log(`Zoom Completed: ${isZoomCompleted}, Image Open: ${isImageOpen}`);
      }
    
      
    
      return (
        // <Provider store={store}>
        // <NativeBaseProvider>
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
          {isImageOpen && <ImageModal isVisible={isImageOpen} onClose={handleClose} />}
      </View>
    // </NativeBaseProvider>
    // </Provider>
  );
};
