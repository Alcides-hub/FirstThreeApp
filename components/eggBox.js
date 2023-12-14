import { useState, useRef, Suspense, useEffect } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber/native';
import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';


function EggBox({onInteract, showObject, setShowObject, onPress}) {
    const [active, setActive] = useState(false);
    
    
    
    const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
      require('../assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_normals.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_Rough.jpg')
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
      require('../assets/egg-box/BoiteOeufs_LOW_UV.obj'),
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
  
  export default EggBox;