import { useState, useRef, Suspense, useEffect } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber/native';
import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';


function EggBox({onInteract, showObject, setShowObject, onPress}) {
    const [active, setActive] = useState(true);
    // Determine whether to render based on displayMode and other conditions
   
    
    
    const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
      require('../assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_normals.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
      require('../assets/egg-box/textures/BoiteOeufs_Rough.jpg')
    ]);
  
    const handleInteraction = (event) => {
      console.log("EggBox clicked");
    
      // Always trigger interaction handlers
      if (typeof onInteract === 'function') {
        onInteract("EggBox");
      }
      if (onPress) {
        onPress();
      }
    
      // Toggle the active state for visibility
      // setActive(!active);
    
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
  
    const mesh = useRef();
  
      
    return (
      active &&
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