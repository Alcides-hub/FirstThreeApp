import { useState, useRef, Suspense, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber/native';
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

// Define a low-pass filter to smooth the gyroscope data
const lowPassFilter = (newValue, oldValue, alpha) => {
  return oldValue + alpha * (newValue - oldValue);
};

function CameraControls() {
  const { camera } = useThree();
  const gyroscopeData = useRef({ x: 0, y: 0, z: 0 });
  const previousRotation = useRef(new Three.Quaternion());

  // Initialize the gyroscope sensor
  useGyroscope((data) => {
    gyroscopeData.current = {
      x: lowPassFilter(data.x, gyroscopeData.current.x, 0.1), // Adjust the alpha value for smoothing
      y: lowPassFilter(data.y, gyroscopeData.current.y, 0.1),
      z: lowPassFilter(data.z, gyroscopeData.current.z, 0.1),
    };
  });

  

  useFrame(() => {
    const { x, y, z } = gyroscopeData.current;
    
    // Update camera rotation here using x, y, z values
    // For example, you can use Quaternion rotations to rotate the camera
    const rotationQuaternion = new Three.Quaternion().setFromEuler(
      new Three.Euler(x, y, 0, 'XYZ')
    );

    // Use a lower slerp factor for smoother camera movement
    camera.quaternion.slerp(rotationQuaternion, 0.05); // Adjust the factor as needed
  });

  return null;
}


function ImageSphere() {
  const mesh = useRef();
  const texture = new Three.TextureLoader().load(require('./assets/art_gallery_1.png'));
 

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[60, 32, 32]} />
      <meshBasicMaterial map={texture} side={Three.BackSide} />
    </mesh>
  );
}



function EggBox({onInteract}) {
  const [active, setActive] = useState(false);
  const [showEggBox, setShowEggBox] = useState(true);
  
  
  const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
    require('./assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_normals.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Rough.jpg')
  ]);

  const handleInteraction = () => {
    console.log("EggBox clicked"); // Debug log
    // This function could be passed in via props, or 
    // you can manage the state within this component itself.
    if (typeof onInteract === 'function') {
      onInteract("EggBox");
    }
    // If already active (i.e., has been clicked once and is rotating), hide the EggBox
    if (active) {
      setShowEggBox(false);
  }
    setActive(!active);
    
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

  const originalColor = useRef();  // New ref to store original color

  obj.traverse((child) => {
    if (child instanceof Three.Mesh) {
      child.material = meshMaterial.current;
    }
  });

  // Update material color based on 'active' state
  useEffect(() => {
    if (active) {
      // Store the original color when object becomes active
      originalColor.current = meshMaterial.current.color.clone();
      meshMaterial.current.color.set('green');
    } else {
      // Reset to original color when object becomes inactive
      if (originalColor.current) {
        meshMaterial.current.color.copy(originalColor.current);
      }
    }
  }, [active]);

  const mesh = useRef();
const rotationY = useRef(0); // This will keep track of the current Y rotation.
const targetRotationY = useRef(0);  // New ref to store the target rotation.

useEffect(() => {
  if (active) {
      targetRotationY.current = Math.PI;  // 180 degrees in radians.
  } else {
      targetRotationY.current = 0;  // Reset rotation.
  }
}, [active]);

const rotationSpeed = 0.03; // Adjust this value for desired rotation speed

useFrame((state, delta) => {
  if (active) {
    rotationY.current += delta;
    if (rotationY.current >= 2 * Math.PI) {
      rotationY.current -= 2 * Math.PI;
    }
  } else {
    rotationY.current -= rotationSpeed;
    if (rotationY.current <= 0) {
      rotationY.current = 0;
    }
  }

  if (mesh.current) {
    mesh.current.rotation.y = rotationY.current;
  }
});
    
  return (
    showEggBox &&
    <mesh  
    ref={mesh} 
    onClick={handleInteraction}
    position={[0, -5, -30]} 
    rotation={active ? [0, Math.PI / 2, 0] : [0, 0, 99]}>
      <primitive 
      object={obj} 
      scale={active ? 0.4 : 0.1} 
      />      
    </mesh>
  );
}  



export default function App() {
  const [interactedItems, setInteractedItems] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [CurrentSelectedItem, setCurrentSelectedItem] = useState(null);

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

  const onLook = (itemName) => {
    // Implement the "Look" functionality based on itemName
    console.log(`Looking at ${itemName}`);
    // Open a modal or show information about itemName
  };
  
  const onUseItem = (itemName) => {
    // Implement the "Use" functionality based on itemName
    console.log(`Using ${itemName}`);
    // Perform an action with itemName
  };
  

  return (
    <View style={{ flex: 1 }}>
      <Canvas camera={{ position: [0, 0, 19] }}>
        <ambientLight />
        <pointLight position={[1, 15, 15]} />
        <CameraControls />
        <ImageSphere />
        <Suspense fallback={null}>
          <EggBox onInteract={handleItemInteraction} />
          <Hotspot onClick={handleItemInteraction} /> 
        </Suspense>
      </Canvas>

      <ImageModal isVisible={isImageOpen} onClose={toggleImage} />

      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
            <SideDrawer isOpen={isDrawerOpen} items={interactedItems} selectedItem={CurrentSelectedItem} onLook={onLook} onUseItem={onUseItem} />
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }} onPress={toggleDrawer}>
        <Image source={require('./assets/push_ui.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
}
