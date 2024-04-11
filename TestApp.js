import { useState, Suspense, useEffect} from 'react';
import { View, StyleSheet}  from 'react-native';
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
import  {requestCameraReset, setImageOpen, setIsCorrectOrder, setIsVideoPlaying, setObakeVisible} from './actions/dialogueActions';
import { Video } from 'expo-av';
import MonsterScene from './components/MonsterScene';

  
  export default function TestApp() {

    const isImageOpen = useSelector(state => state.dialogue.isImageOpen);
    const isZoomCompleted = useSelector((state) => state.dialogue.isZoomCompleted);
    const isOrderCorrect  = useSelector((state) => state.dialogue.isOrderCorrect);
    const isVideoPlaying = useSelector((state)=> state.dialogue.isVideoPlaying);
    const isObakeVisible = useSelector((state)=> state.dialogue.isObakeVisible);
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

      useEffect(() => {
        Asset.loadAsync(require('./assets/videos/kasa_appear.mp4'))
          .then(() => console.log("Video asset loaded successfully."))
          .catch((error) => console.error("Failed to load video asset:", error));
      }, []);

      const handleClose = () => {
        dispatch(setImageOpen(false));
        dispatch(requestCameraReset(true));
        // dispatch(setZoomCompleted(false));
        console.log(`Zoom Completed: ${isZoomCompleted}, Image Open: ${isImageOpen}`);
      }

      const handleCorrectOrder = (isVideoPlaying) => {
        console.log("handleCorrectOrder triggered");
        dispatch(setIsCorrectOrder(true));  // Update state based on child component's interaction
        dispatch(setIsVideoPlaying(true));
        console.log("video working:", isVideoPlaying);
      };

      const handlePlaybackStatusUpdate = (playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          // The video has finished playing
          console.log("Video finished playing");
          dispatch(setIsVideoPlaying(false));
          dispatch(setObakeVisible(true));
        }
      
        // You can also handle other status updates like buffering, errors, etc.
        if (playbackStatus.isBuffering) {
          console.log("Video is buffering");
        }
      
        if (playbackStatus.error) {
          console.error("Video playback error:", playbackStatus.error);
        }
      };
          
      
    
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
            {!isVideoPlaying && isObakeVisible && (<MonsterScene/>)}
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
          {isImageOpen && <ImageModal isVisible={isImageOpen} onClose={handleClose} onCorrectOrder={handleCorrectOrder}/>}
          {isVideoPlaying && !isOrderCorrect && (
        <Video
            source={require('./assets/videos/kasa_appear.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping={false}
            useNativeControls
            style={styles.video}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate} 
            onError={(e) => console.log('Video Error:', e)}
        />
      )}
      </View>
    // </NativeBaseProvider>
    // </Provider>
  );
};
const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
},
});
