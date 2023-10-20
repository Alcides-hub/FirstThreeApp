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
      <sphereGeometry args={[30, 32, 32]} />
      <meshBasicMaterial map={texture} side={Three.BackSide} />
    </mesh>
  );
}

function Box(props) {
  const [active, setActive] = useState(false);
  const mesh = useRef();

  useFrame((state, delta) => {
    if (active) {
      mesh.current.rotation.y += delta;
      mesh.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry />
      <meshStandardMaterial color={active ? 'green' : 'gray'} />
    </mesh>
  );
}

function EggBox(Props) {
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
  const mesh = useRef();
  obj.traverse((child) => {
    if (child instanceof Three.Mesh) {
      child.material = new Three.MeshStandardMaterial({
        map: diffuse,
        normalMap: normals,
        aoMap: occlusion,
        roughnessMap: rough,
      });
    }
  });
  
  return (
    <mesh ref={mesh}>
      <primitive object={obj} scale={0.1} />
    </mesh>
  );
}  

// function Shoe(props) {
//   const [base, normal, rough] = useLoader(TextureLoader, [
//     require('./assets/Airmax/textures/BaseColor.jpg'),
//     require('./assets/Airmax/textures/Normal.jpg'),
//     require('./assets/Airmax/textures/Roughness.png'),
//   ]);

//   const material = useLoader(MTLLoader, require('./assets/Airmax/shoe.mtl'));

//   const obj = useLoader(
//     OBJLoader,
//     require('./assets/Airmax/shoe.obj'),
//     (loader) => {
//       material.preload();
//       loader.setMaterials(material);
//     }
//   );

//   const mesh = useRef();

//   useLayoutEffect(() => {
//     obj.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material.map = base;
//         child.material.normalMap = normal;
//         child.material.roughnessMap = rough;
//       }
//     });
//   }, [obj]);

//   useFrame((state, delta) => {
//     let { x, y, z } = props.animatedSensor.sensor.value;
//     x = ~~(x * 100) / 5000;
//     y = ~~(y * 100) / 5000;
//     mesh.current.rotation.x += x;
//     mesh.current.rotation.y += y;
//   });

//   return (
//     <mesh ref={mesh} rotation={[0.7, 0, 0]}>
//       <primitive object={obj} scale={10} />
//     </mesh>
//   );
// }
// function SimpleModel() {
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="red" />
//     </mesh>
//   );
// }

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
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Suspense fallback={null}>
            
            {/* <AmazonBox />
            <Shoe animatedSensor={animatedSensor} /> */}
            <EggBox/>
          </Suspense> 
          
        </Canvas>  
  );
}
