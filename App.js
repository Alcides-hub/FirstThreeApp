import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber/native';
import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { TextureLoader } from 'expo-three';
import { TextureLoader } from 'three';

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
      <sphereGeometry args={[40, 32, 32]} />
      <meshBasicMaterial map={texture} side={Three.BackSide} />
    </mesh>
  );
}



function EggBox(Props) {
  const [active, setActive] = useState(false);
  
  
  const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
    require('./assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_normals.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
    require('./assets/egg-box/textures/BoiteOeufs_Rough.jpg')
  ]);


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
      // If rotation surpasses 180 degrees, reset it.
      // If rotation surpasses 180 degrees, reset it.
      if (rotationY.current >=2 * Math.PI) {
        rotationY.current -= 2 * Math.PI; 
      }
    } else {
      // If not active, smoothly reset rotation to original position
      rotationY.current -= rotationSpeed;
      if (rotationY.current <= 0) {
        rotationY.current = 0;
      }
    }

    mesh.current.rotation.y = rotationY.current;
  });
    
  return (
    <mesh 
    ref={mesh} 
    position={[0, -4, -30]} 
    rotation={active ? [0, Math.PI / 2, 0] : [0, 0, 99]}>
      <primitive 
      object={obj} 
      scale={active ? 0.4 : 0.1} 
      onClick={(event) => setActive(!active)}
      />      
    </mesh>
  );
}  



export default function App() {
  // const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
  //   interval: 100,
  // });

  return (
   
      <Canvas camera={{ position: [0, 0, 19] }} >
          <ambientLight />
          <pointLight position={[1, 15, 15]} />
          <CameraControls />
          <ImageSphere />
          {/* <SimpleModel/> */}
          <Suspense fallback={null}>
            
            {/* <AmazonBox />
            <Shoe animatedSensor={animatedSensor} /> */}
            <EggBox/>
          </Suspense> 
          
        </Canvas>  
  );
}
