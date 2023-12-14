import { useState, useRef, Suspense, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Canvas, useLoader, useThree} from '@react-three/fiber/native';
import * as Three from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCrosshairs} from '@fortawesome/free-solid-svg-icons';
import { TextureLoader } from 'three';
import SideDrawer from './components/side_drawer';
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



export default function App() {
  const [interactedItems, setInteractedItems] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [CurrentSelectedItem, setCurrentSelectedItem] = useState(null);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState(''); // Add this state for the dialogue content
  const [showObject, setShowObject] = useState(true);
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

  const toggleImage = () => {
    console.log("Current state before toggle:", isImageOpen);
    setIsImageOpen(!isImageOpen);
    console.log("State after toggling:", !isImageOpen);
  };

  const handleItemInteraction = (itemName) => {
    console.log("Item interacted:", itemName);
  
    // Avoid adding duplicate items
    if (!interactedItems.includes(itemName)) {
      setInteractedItems([...interactedItems, itemName]);
    }
    
    if (itemName === "Hotspot") {
      setIsImageOpen(!isImageOpen);
    }
    setCurrentSelectedItem(itemName);
  };

  const itemsDetails = {
    EggBox: "This eggbox is weird, I don't think I have any use of it"
  };
  
  const getItemDetails = (itemName) => {
    // Look up item details by name or ID
    return itemsDetails[itemName] || 'No details available.';
  };

  const onLook = (itemName) => {
    // Implement the "Look" functionality based on itemName
    console.log(`Looking at ${itemName}`);
    // Open a modal or show information about itemName
    setIsDialogueVisible(true);
    const details = getItemDetails(itemName); 
    setDialogContent(details); 
  };
  
  const onUseItem = (itemName) => {

    setShowObject(false);
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
    setZoomLevel(30); // Set the zoom level you want after touching the hotspot
    setZoomActive(true);
  };

  const handleBackButtonClick = () => {
    
    if (cameraRef.current) {
      cameraRef.current.position.copy(initialCameraState.position);
      cameraRef.current.quaternion.copy(initialCameraState.quaternion);
  
      // Reset FOV if you're using it to zoom
      // Assuming initialFOV is a stored value that represents the initial field of view of the camera
      cameraRef.current.fov = initialFOV;
      setZoomLevel(initialFOV); 
      cameraRef.current.updateProjectionMatrix();
      setZoomActive(false);
    }
  };

  

const handleRotate = (angle) => {
  setRotationAngle(prevAngle => prevAngle + angle);
};

// In your render method, pass rotationAngle to your 3D model component
// <Your3DModelComponent rotation={rotationAngle} ... />



  return (
    <View style={{ flex: 1, position: 'relative' }}>
      
      <Canvas camera={{ position: [0, 0, 19] }}>
        <SetupCamera setCameraRef={setCameraRef} />
        <ambientLight />
        <pointLight position={[1, 15, 15]} />
        <CameraControls controlMode={controlMode} rotation={rotationAngle} />
        <Suspense fallback={null}>
        <ImageSphere />
        </Suspense>
        <Suspense fallback={null}>
          <EggBox onInteract={handleItemInteraction} onPress={toggleDrawer}  showObject={showObject} setShowObject={setShowObject} usedItems={usedItems} />
          <Hotspot saveCameraState={saveCameraState} onClick={handleItemInteraction} onTouchEnd={handleTouchEnd} /> 
        </Suspense>
        {sphericalCoords && <ZoomControls targetSphericalCoords={sphericalCoords} zoomLevel={zoomLevel} zoomActive={zoomActive} />}
      </Canvas>
      <CharacterImage />
      <TouchControls onRotate={handleRotate} />

      {/* <ImageModal isVisible={isImageOpen} onClose={toggleImage} /> */}

      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
            <SideDrawer isOpen={isDrawerOpen} items={interactedItems} selectedItem={CurrentSelectedItem} onLook={onLook} onUseItem={() => {onUseItem(CurrentSelectedItem); }}  />
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }} onPress={toggleDrawer}>
        <Image source={require('./assets/push_ui.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ position: 'absolute', top: 30, right: 20 }} onPress={toggleControlMode}>
        <Image source={require('./assets/push_ui.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    
        
   

      {isDialogueVisible && (
        <Dialoguebox1
          isVisible={isDialogueVisible}
          content={dialogContent}
          onClose={() => setIsDialogueVisible(false)}
        />
      )}
      <TouchableOpacity onPress={handleBackButtonClick} style={{position: 'absolute', bottom: 50, right: 20}}>
      <Image source={require('./assets/push_ui.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
}

