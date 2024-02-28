import { useState, useRef, Suspense, useEffect} from 'react';
import { View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Canvas, useLoader, useThree} from '@react-three/fiber/native';
import * as Three from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCrosshairs} from '@fortawesome/free-solid-svg-icons';
import { TextureLoader } from 'three';
import SideDrawerOption from './components/sideDrawer';
import Hotspot from './components/hotspot';
import ImageModal from './modal/imageModal';
import Dialoguebox1 from './components/dialogue_box1';
import ZoomControls from './components/zoomControls';
import * as ScreenOrientation from 'expo-screen-orientation';
import TouchControls from './components/buttonControls';
import CameraControls from './components/cameraControls';
import EggBox from './components/eggBox';
import ImageSphere from './components/imageSphere';
import SetupCamera from './components/setUpCamera';
import CharacterImage from './components/character';
import { db } from './firebaseConfig'; 
import { initializeApp } from "firebase/app";
import * as Font from 'expo-font';
import DialogueBox from './components/dialogueBox';
import ResponseBox from './components/ResponseBox';
import { doc, getDoc } from "firebase/firestore/lite";
import Note from './components/Note';
import ImageModal2 from './modal/imageModal2';
import { NativeBaseProvider } from 'native-base';
import Modal from 'react-native-modal';
import MonsterScene from './components/MonsterScene';
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';



async function loadFonts() {
  await Font.loadAsync({
    'PatuaOne-Regular': require('./assets/fonts/PatuaOne-Regular.ttf'),
  });
}

loadFonts();

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


export default function App() {
  const [interactedItems, setInteractedItems] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [CurrentSelectedItem, setCurrentSelectedItem] = useState(null);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState(''); // Add this state for the dialogue content
  const [showObject, setShowObject] = useState(false);
  const [usedItems, setUsedItems] = useState({}); // New state to track used items
  // State for the spherical coordinates
  const [sphericalCoords, setSphericalCoords] = useState(new Three.Spherical());
// State for the camera's field of view (FOV), which affects zooming
const [initialFOV, setInitialFOV] = useState(null);
const [zoomLevel, setZoomLevel] = useState(75); // Default FOV, change as needed for zoom
const [initialCameraState, setInitialCameraState] = useState({
  position: new Three.Vector3(),
  quaternion: new Three.Quaternion(),
}); 
const [controlMode, setControlMode] = useState('gyroscope'); // 'gyroscope' or 'buttons'
const [zoomActive, setZoomActive] = useState(false);
const cameraRef = useRef(null);
const [rotationAngle, setRotationAngle] = useState(0);
// State to hold all dialogue data from Firestore
const [dialogueData, setDialogueData] = useState(null);
// State to hold the current dialogue item
const [currentDialogue, setCurrentDialogue] = useState(null);
const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
const [characterEmotion, setCharacterEmotion] = useState(null);
const [isDialogueActive, setIsDialogueActive] = useState(false);
const [showModalNote, setShowModalNote] = useState(false);
const [showModalImage, setShowModalImage] = useState(false);
const [showEggBoxModal, setShowEggBoxModal] = useState(false);
const [isOrderCorrect, setIsOrderCorrect] = useState(false);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  const handleCorrectOrder = () => {
    console.log("handleCorrectOrder triggered");
    setIsOrderCorrect(true);  // Update state based on child component's interaction
    setIsVideoPlaying(true);
  };

  // 
  const handlePlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      // The video has finished playing
      console.log("Video finished playing");
      setIsVideoPlaying(false);
    }
  
    // You can also handle other status updates like buffering, errors, etc.
    if (playbackStatus.isBuffering) {
      console.log("Video is buffering");
    }
  
    if (playbackStatus.error) {
      console.error("Video playback error:", playbackStatus.error);
    }
  };

  // useEffect(() => {
  //   if (isOrderCorrect && isVideoPlaying ) {
  //     const videoElement = document.getElementbyId('monsterVideo');
  //     videoElement.onEnded = () => {
  //       setIsVideoPlaying();
  //     }
  //   }
  // }, [isOrderCorrect, isVideoPlaying]);


  useEffect(() => {
    Asset.loadAsync(require('./assets/videos/kasa_appear.mp4'));
  }, []);

// // Fetch the dialogue data from Firestore once
// useEffect(() => {
//   const fetchDialogue = async () => {
//     try {
//       const documentSnapshot = await getDoc(doc(db, "kasa_dialogue", "kasa_start"));
//       if (documentSnapshot.exists()) {
//         // Store the entire dialogue data in state
//         setDialogueData(documentSnapshot.data());
//         setCurrentDialogueIndex(0); 
//         setIsDialogueActive(true); // Dialogue starts
//       } else {
//         console.log("Document not found");
//       }
//     } catch (error) {
//       console.error("Error fetching dialogue:", error);
//     }
//   };
//   fetchDialogue();
// }, []);

// // Update the currentDialogue whenever currentDialogueIndex changes
// useEffect(() => {
//   if (dialogueData && dialogueData.dialogueList) {
//     setCurrentDialogue(dialogueData.dialogueList[currentDialogueIndex]);
//   }
// }, [currentDialogueIndex, dialogueData]);

// const handleNextDialogue = () => {
//   setCurrentDialogueIndex(prevIndex => {
//     const nextIndex = prevIndex + 1;
//     // Check if we have reached the end of the dialogue list or the specific order
//     if (dialogueData && nextIndex < dialogueData.dialogueList.length) {
//       if (dialogueData.dialogueList[nextIndex].order === 4) {
//         // Specific dialogue order reached, handle the end of the dialogue
//         handleEndDialogue();
//       }
//       return nextIndex;
//     } else {
//       // Handle the end of the dialogue, such as resetting or performing some action
//       console.log("End of dialogue reached");
//       handleEndDialogue(); // Call this function when the end of the dialogue list is reached
//       return prevIndex;  // Keep the index the same if there is no next dialogue
//     }
//   });
// };

// const handleEndDialogue = () => {
//   setIsDialogueActive(false);
//   setShowModalNote(true);
//   console.log("handleEndDialogue executed");
  
//   // Additional actions, like navigating to another screen or resetting states
// };


// const handleOptionPress = async (optionIndex) => {
//   if (!isDialogueActive) return;

//   if (dialogueData && dialogueData.dialogueList && optionIndex !== null) {
//     const currentDialogueOrder = dialogueData.dialogueList[currentDialogueIndex].order;
    
//     // Check if the current dialogue is order 3 and it's the last in the sequence
//     if (currentDialogueOrder === 3 && currentDialogueIndex === dialogueData.dialogueList.length - 1) {
//       handleEndDialogue();
//       return;
//     }

//     // Move to the next dialogue
//     const nextDialogueIndex = currentDialogueIndex + 1;
//     if (nextDialogueIndex < dialogueData.dialogueList.length) {
//       setCurrentDialogue(dialogueData.dialogueList[nextDialogueIndex]);
//       setCurrentDialogueIndex(nextDialogueIndex);
//     } else {
//       console.log("End of dialogue reached");
//       handleEndDialogue();
//     }
//   } else {
//     console.error("No dialogue data available or invalid option index");
//   }
// };

const handleCloseNoteModal = () => {
  console.log("handleCloseNoteModal called");

  setShowModalNote(false);
  
  // Add the note to interacted items
  const itemName = "note1"; // Or any other identifier for the note
  if (!interactedItems.includes(itemName)) {
    setInteractedItems([...interactedItems, itemName]);
    console.log("Item interacted:", itemName);
  }
  setCurrentSelectedItem(itemName);
};


// Toggle control mode
const toggleControlMode = () => {
  setControlMode(prevMode => {
    const newMode = prevMode === 'buttons' ? 'gyroscope' : 'buttons';
    console.log("Control Mode Toggled to:", newMode);
    return newMode;
  });
};
  // Function to update the camera ref
  const setCameraRef = (camera) => {
    cameraRef.current = camera;
    setInitialFOV(cameraRef.current.fov);
  };


  const saveCameraState = () => {
    if (cameraRef.current) {
      setInitialCameraState({
        position: cameraRef.current.position.clone(),
        quaternion: cameraRef.current.quaternion.clone(),
        fov: initialFOV, 
      });
    }
  };

  const toggleDrawer = () => {
    
    setDrawerOpen(!isDrawerOpen);
  };

  // const toggleImage = () => {
  //   console.log("Current state before toggle:", isImageOpen);
  //   setIsImageOpen(!isImageOpen);
  //   console.log("State after toggling:", !isImageOpen);
  // };

  const handleItemInteraction = (itemName) => {
    console.log("Item interacted:", itemName);
   
  
    // Avoid adding duplicate items
    if (!interactedItems.includes(itemName)) {
      setInteractedItems([...interactedItems, itemName]);
    }
    
    if (itemName === "Hotspot") {
      setCurrentSelectedItem(itemName);
      
    }
  };

  const itemsDetails = {
    EggBox: "This eggbox is weird, I don't think I have any use of it",
    note1: "This is an important note I found. It might be useful later."
  };
  
  const getItemDetails = (itemName) => {
    // Look up item details by name or ID
    return itemsDetails[itemName] || 'No details available.';
  };

  const onLook = (itemName) => {
  console.log(`Looking at ${itemName}`);
  if (itemName === 'EggBox') {
    setShowEggBoxModal(true);
    // setIsDialogueVisible(true);
    // const details = getItemDetails(itemName); 
    // setDialogContent(details);
    
  } else if (itemName === 'note1') {
    // If the item is 'note1', open the image modal
    setShowModalImage(true); // Assuming this will trigger the image modal
     // setIsDialogueVisible(true);
    //  const details = getItemDetails(itemName); 
    // setDialogContent(details);
  } 
};
  
  const onUseItem = (itemName) => {

    setShowObject(true);
    // Implement the "Use" functionality based on itemName
    console.log(`Using ${itemName}`);
    // Perform an action with itemName
    setUsedItems(prevUsedItems => ({
      ...prevUsedItems,
      [itemName]: true
    }));
  };

  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    
    lockOrientation();
  }, []);
  

  const handleTouchEnd = (point) => {
    const spherical = new Three.Spherical().setFromVector3(point);
    setSphericalCoords(spherical); // Set the spherical coordinates for the zoom
    setZoomLevel(15); // Set the zoom level you want after touching the hotspot
    setZoomActive(true);
    // setIsImageOpen(true);
  };

  const handleBackButtonClick = () => {
    
    if (cameraRef.current && initialCameraState) {
      cameraRef.current.position.copy(initialCameraState.position);
      cameraRef.current.quaternion.copy(initialCameraState.quaternion);
      cameraRef.current.fov = initialCameraState.fov;
      cameraRef.current.updateProjectionMatrix();
  
      setZoomLevel(initialCameraState.fov);
      setZoomActive(false);
    }
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
    handleBackButtonClick();
    
  }
  
  const onZoomComplete = () => {
    console.log("Zoom complete, opening modal");
  setIsImageOpen(true);
  };

  

const handleRotate = (angle) => {
  setRotationAngle(prevAngle => prevAngle + angle);
};
console.log("Hello", isImageOpen) 

  return (
    <NativeBaseProvider>
    <View style={{ flex: 1, position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 19] }}>
        <SetupCamera setCameraRef={setCameraRef} />
        <ambientLight />
        <pointLight position={[1, 15, 15]} />
        {!showModalNote && !isDialogueActive && !isImageOpen && <CameraControls controlMode={controlMode} rotation={rotationAngle} isDialogueActive={isDialogueActive}  />}
        <Suspense fallback={null}>
        <ImageSphere />
        </Suspense>
        <Suspense fallback={null}>
        {!showModalNote && !isDialogueActive && <EggBox onInteract={handleItemInteraction} onPress={toggleDrawer}  showObject={showObject} setShowObject={setShowObject} usedItems={usedItems} />}
        {!showModalNote && !isDialogueActive && <Hotspot saveCameraState={saveCameraState} onClick={handleItemInteraction} onTouchEnd={handleTouchEnd} /> }
        
        {isOrderCorrect  && !isVideoPlaying && <MonsterScene />}
        
        </Suspense>
        {sphericalCoords && <ZoomControls 
            targetSphericalCoords={sphericalCoords} 
            zoomLevel={zoomLevel} 
            zoomActive={zoomActive}
            onZoomComplete={onZoomComplete} 
          />}
        
      </Canvas>
      
      
      {/* {isOrderCorrect && <Text>Monster Scene should be here</Text>} */}
      <View >
        <ResponseBox currentDialogue={currentDialogue} handleOptionPress={handleOptionPress} />
      </View>
      {isDialogueActive && <CharacterImage characterEmotion={characterEmotion} />}
      {isDialogueActive && <DialogueBox currentDialogue={currentDialogue} characterName={currentDialogue?.name} handleOptionPress={handleNextDialogue}/>}
      <TouchControls onRotate={handleRotate} />
      
        <Note
          onPress={handleCloseNoteModal}
          showNote={showModalNote}
          onClick={toggleDrawer}
          usedItems={usedItems}
        />
      {isDrawerOpen && (
 1       <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
            <SideDrawerOption isOpen={isDrawerOpen} items={interactedItems} selectedItem={CurrentSelectedItem} onLook={onLook} onUseItem={() => {onUseItem(CurrentSelectedItem); }}  />
          </View>
        </TouchableWithoutFeedback>
      )}
      {!showModalNote && !isDialogueActive && (
      <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }} onPress={toggleDrawer}>
        <Image source={require('./assets/inventory.png')} style={{ width: 50, height: 50 }} />
      </TouchableOpacity> 
      )}

      {!showModalNote && !isDialogueActive && (<TouchableOpacity style={{ position: 'absolute', top: 30, right: 20 }} onPress={toggleControlMode}>
        <Image source={require('./assets/push_ui.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      )}
      <ImageModal2 isVisible={showModalImage} onClose={() => setShowModalImage(false)} />
      {isDialogueVisible && (
        <Dialoguebox1
          isVisible={isDialogueVisible}
          content={dialogContent}
          onClose={() => setIsDialogueVisible(false)}
        />
      )}
      {!showModalNote && !isDialogueActive && (<TouchableOpacity onPress={handleBackButtonClick} style={{position: 'absolute', bottom: 50, right: 20}}>
      <Image source={require('./assets/back.png')} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
  )}
  {showEggBoxModal && (
1  <Modal isVisible={showEggBoxModal} backdropColor='transparent' animationIn="fadeIn" // Change the animation to a simple fade in
  animationOut="fadeOut" // Change the animation to a simple fade out
  style={styles.modalContainer}>
<View style={styles.imageContainer}>
<TouchableOpacity onPress={() => setShowEggBoxModal(false)}>
   <Image
     source={require("./image/eggBox.jpg")} // Replace with the actual path
     alt="EggBox"
     style={styles.eggBoxImage}
   />
   </TouchableOpacity>
</View>
</Modal>
)}

{isVideoPlaying && isOrderCorrect && (
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
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%', // Adjust based on your preference
    height: '60%', // Adjust based on your preference
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // Optional, for rounded corners
    marginLeft: 70,
  },
  eggBoxImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // This ensures the aspect ratio is maintained
  },
  video: {
    height: '100%',
    width: '100%',
  }
});