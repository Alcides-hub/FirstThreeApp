import { useState, useRef, Suspense, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Canvas, useFrame, useLoader, useThree} from '@react-three/fiber/native';
import * as Three from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCrosshairs} from '@fortawesome/free-solid-svg-icons';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { TextureLoader } from 'expo-three';
import { TextureLoader } from 'three';
import SideDrawer from './components/side_drawer';
import Hotspot from './components/hotspot';
import ImageModal from './modal/imageModal';
import Dialoguebox1 from './components/dialogue_box1';
import ZoomControls from './components/zoomControls';
import * as ScreenOrientation from 'expo-screen-orientation';
import TouchControls from './components/buttonControls';


// import { useAnimatedSensor, SensorType } from 'react-native-reanimated';
import { Gyroscope } from 'expo-sensors';



const useGyroscope = (callback) => {
  useEffect(() => {
    let isMounted = true;

    
    const handleGyroscopeData = ({ x, y, z }) => {
      if (isMounted) {
        callback({ x, y, z });
      }
    };

    Gyroscope.addListener(handleGyroscopeData);
    Gyroscope.setUpdateInterval(16); // Adjust the update interval as needed (e.g., 16ms for 60 FPS)

    return () => {
      isMounted = false;
      Gyroscope.removeAllListeners();
    };
  }, [callback]);
};

// // Define a low-pass filter to smooth the gyroscope data
// const lowPassFilter = (newValue, oldValue, alpha) => {
//   return oldValue + alpha * (newValue - oldValue);
// };

function CameraControls({rotation, controlMode}) {
  const { camera } = useThree();
  const gyroscopeData = useRef({ x: 0, y: 0, z: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });
  const initialOrientationSet = useRef(false);
  const initialOrientation = useRef(new Three.Quaternion());

   
  
  // Set the initial orientation once
  useEffect(() => {
    // Adjust the second parameter (Y axis rotation) to fine-tune the initial direction the camera faces
    // The value is in radians, and 2 * Math.PI radians equals 360 degrees.
    // Since you mentioned it's a little to the right, try subtracting a small value from Math.PI and adjust as needed.
    const yRotation = Math.PI  / 180 ; // start with directly behind the initial position
    const fineTuning = 0; // adjust this value to fine-tune the direction
  
    initialOrientation.current.setFromEuler(new Three.Euler(0, yRotation - fineTuning, 0, 'XYZ'));
    camera.quaternion.copy(initialOrientation.current);
    initialOrientationSet.current = true;
  }, [camera]);

  // Initialize the gyroscope sensor
  useGyroscope((data) => {
    if (initialOrientationSet.current) {
      gyroscopeData.current = {
        x: lowPassFilter(data.x, gyroscopeData.current.x, 0.05),
        y: lowPassFilter(data.y, gyroscopeData.current.y, 0.05),
        z: lowPassFilter(data.z, gyroscopeData.current.z, 0.05),
      };
    }
  });

  // The lowPassFilter function itself
const lowPassFilter = (newValue, oldValue, alpha) => {
  return oldValue + alpha * (newValue - oldValue);
};
// useEffect(() => {
//   // Set the camera to an initial upright orientation
//   // Adjust these values as needed to ensure the camera starts upright
//   camera.rotation.set(0, 0, 0); // This sets the camera to a default upright position
//   initialOrientation.current.copy(camera.quaternion); // Store this as the initial orientation
//   initialOrientationSet.current = true;
// }, [camera]);

useFrame(() => {
  
  if (controlMode === 'gyroscope') {
  // Adjusting the scale factors for sensitivity
  const pitchScale = 0.03; // Control sensitivity of up and down movement
  const yawScale = 0.03; // Control sensitivity of left and right movement

  // Map gyroscope pitch (y-axis) to camera's X-axis (up and down)
  // Map gyroscope yaw (x-axis) to camera's Y-axis (left and right)
  const pitch = gyroscopeData.current.y * - pitchScale;
  const yaw = gyroscopeData.current.x * yawScale;

  // Apply the gyroscope data directly to the camera rotation
  // This will continuously update the camera's orientation based on the gyroscope
  camera.rotation.x += pitch;
  camera.rotation.y += yaw;

  // Optional: Clamp the rotation to prevent extreme tilting or turning
  const maxPitch = Math.PI / 45; // Limit up/down movement
  camera.rotation.x = Math.max(-maxPitch, Math.min(maxPitch, camera.rotation.x));

  // Ensure the rotation values stay within a valid range
  camera.rotation.x %= 2 * Math.PI;
  camera.rotation.y %= 2 * Math.PI;
} else if ( controlMode === 'buttons') {
  const rotationInRadians = rotation * (Math.PI / 180 );
    camera.rotation.y = rotationInRadians;
} 
});


  return null;
}

function ImageSphere() {
  const mesh = useRef();
  const texture = useLoader(Three.TextureLoader, require('./assets/TokkaidoRoom1.jpg'));

  // Flip texture horizontally
  texture.wrapS = Three.RepeatWrapping;
  texture.repeat.x = -1;

  // If texture is not loaded, don't render the sphere yet
  if (!texture) return null;

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[600, 123, 32]} />
      <meshBasicMaterial map={texture} side={Three.BackSide} />
    </mesh>
  );
}



function EggBox({onInteract, showObject, setShowObject, onPress}) {
  const [active, setActive] = useState(false);
  
  
  
  const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
    require('./assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_normals.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Rough.jpg')
  ]);

  const handleInteraction = (event) => {
    console.log("EggBox clicked"); // Debug log
    // This function could be passed in via props, or 
    // you can manage the state within this component itself.
    if (typeof onInteract === 'function') {
      onInteract("EggBox");
    }
    // If already active (i.e., has been clicked once and is rotating), hide the EggBox
    if (active) {
      setShowObject(true);
  }
    if (onPress) {
      onPress();
    }
    setActive(!active);
    event.stopPropagation();
  };

  


    const obj = useLoader(
    OBJLoader,
    require('./assets/egg-box/BoiteOeufs_LOW_UV.obj'),
  );
  const meshMaterial = useRef(new Three.MeshStandardMaterial({
    map: diffuse,
    normalMap: normals,
    aoMap: occlusion,
    roughnessMap: rough,
    
  }));

  // const originalColor = useRef();  // New ref to store original color

  obj.traverse((child) => {
    if (child instanceof Three.Mesh) {
      child.material = meshMaterial.current;
    }
  });

  // Update material color based on 'active' state
  // useEffect(() => {
  //   if (active) {
  //     // Store the original color when object becomes active
  //     originalColor.current = meshMaterial.current.color.clone();
  //     meshMaterial.current.color.set('green');
  //   } else {
  //     // Reset to original color when object becomes inactive
  //     if (originalColor.current) {
  //       meshMaterial.current.color.copy(originalColor.current);
  //     }
  //   }
  // }, [active]);

  


  const mesh = useRef();
// const rotationY = useRef(0); // This will keep track of the current Y rotation.
// const targetRotationY = useRef(0);  // New ref to store the target rotation.

// useEffect(() => {
//   if (active) {
//       targetRotationY.current = Math.PI;  // 180 degrees in radians.
//   } else {
//       targetRotationY.current = 0;  // Reset rotation.
//   }
// }, [active]);

// const rotationSpeed = 0.03; // Adjust this value for desired rotation speed

// useFrame((state, delta) => {
//   if (active) {
//     rotationY.current += delta;
//     if (rotationY.current >= 2 * Math.PI) {
//       rotationY.current -= 2 * Math.PI;
//     }
//   } else {
//     rotationY.current -= rotationSpeed;
//     if (rotationY.current <= 0) {
//       rotationY.current = 0;
//     }
//   }

//   if (mesh.current) {
//     mesh.current.rotation.y = rotationY.current;
//   }
// });
    
  return (
    showObject &&
    <mesh  
    ref={mesh} 
    onClick={handleInteraction}
    position={[28, -5, -109]} 
    rotation={[0, 0, 99]}>
      <primitive 
      object={obj} 
      scale={0.5} 
      />      
    </mesh>
  );
}  

const SetupCamera = ({ setCameraRef }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.rotation.set(0 , 0, 0); // Set the initial position
    setCameraRef(camera);
  }, [camera, setCameraRef]);

  return null; // This component does not render anything
};

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
  
    // You might also want to reset any other state related to the zoom
  };

  // useEffect(() => {
  //   // Calculate spherical coordinates from the target position
  //   const targetPosition = new Three.Vector3(22, 5, -47);
  //   const newSphericalCoords = new Three.Spherical().setFromVector3(targetPosition.normalize());
  //   newSphericalCoords.radius = 60; // Radius of your sphere
  //   setSphericalCoords(newSphericalCoords);

  //   // Set the zoom level to your desired FOV
  //   setZoomLevel(30); // Example zoom level, adjust as needed
  // }, []);

  

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

