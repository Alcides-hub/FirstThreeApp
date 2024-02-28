// import { useState, useRef, Suspense, useEffect } from 'react';
// import { useThree, useFrame, useLoader } from '@react-three/fiber/native';
// import * as Three from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { TextureLoader } from 'three';


// function EggBox({onInteract, showObject, setShowObject, onPress}) {
//     const [active, setActive] = useState(true);
//     // Determine whether to render based on displayMode and other conditions
   
    
    
//     const [cavity, diffuse, normals, occlusion, rough] = useLoader(TextureLoader, [
//       require('../assets/egg-box/textures/BoiteOeufs_cavity.jpg'),
//       require('../assets/egg-box/textures/BoiteOeufs_Diffuse.jpg'),
//       require('../assets/egg-box/textures/BoiteOeufs_normals.jpg'),
//       require('../assets/egg-box/textures/BoiteOeufs_occlusion.jpg'),
//       require('../assets/egg-box/textures/BoiteOeufs_Rough.jpg')
//     ]);
  
//     const handleInteraction = (event) => {
//       console.log("EggBox clicked");
    
//       // Always trigger interaction handlers
//       if (typeof onInteract === 'function') {
//         onInteract("EggBox");
//       }
//       if (onPress) {
//         onPress();
//       }
    
//       // Toggle the active state for visibility
//       // setActive(!active);
    
//       event.stopPropagation();
//     };

//       const obj = useLoader(
//       OBJLoader,
//       require('../assets/egg-box/BoiteOeufs_LOW_UV.obj'),
//     );
//     const meshMaterial = useRef(new Three.MeshStandardMaterial({
//       map: diffuse,
//       normalMap: normals,
//       aoMap: occlusion,
//       roughnessMap: rough,
      
//     }));
  
//     // const originalColor = useRef();  // New ref to store original color
  
//     obj.traverse((child) => {
//       if (child instanceof Three.Mesh) {
//         child.material = meshMaterial.current;
//       }
//     });
  
//     const mesh = useRef();
  
      
//     return (
//       active &&
//       <mesh  
//       ref={mesh} 
//       onClick={handleInteraction}
//       position={[28, -5, -109]} 
//       rotation={[0, 0, 99]}
//         <primitive 
//         object={obj} 
//         scale={0.5} 
//         />      
//       </mesh>
//     );
//   }  
  
//   export default EggBox;

import React, { useState, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber/native';
import * as Three from 'three';
import { Asset } from 'expo-asset';
import {useDispatch, useSelector} from 'react-redux';
import {setInteractedItem, setCurrentSelectedItem, toggleSideDrawer} from '../actions/dialogueActions';
import { pushInteractedItemToFirestore } from '../scripts/firestoreService';


function EggBox() {
    const mesh = useRef();
    const dispatch = useDispatch();
    const [imageTexture, setImageTexture] = useState(null);
    const { showEggBox } = useSelector((state) => state.dialogue);
    const { invalidate } = useThree();
    // const usedItems = useSelector(state => state.appState.usedItems);

    const handleItemInteraction = (ItemName) => {
        console.log(ItemName); // Logging the interacted item's name for verification
        dispatch(setInteractedItem(ItemName));
        dispatch(setCurrentSelectedItem(ItemName));
        pushInteractedItemToFirestore(ItemName);
        dispatch(toggleSideDrawer());
      };

     
   
    
// Load texture once, regardless of conditions
    useEffect(() => {
      console.log("image on!")
        async function loadTexture() {
            try {
                const asset = Asset.fromModule(require('../assets/egg-box/pngwing2.png'));
                await asset.downloadAsync();
                const texture = new Three.TextureLoader().load(asset.uri, () => {
                    invalidate(); // Trigger a re-render in R3F after texture is loaded
                });
                setImageTexture(texture);
            } catch (error) {
                console.error("Texture loading error:", error);
            }
        }

        loadTexture();
    }, [invalidate]);

    if (!imageTexture) {
        return null;
    }
  
    
      
    if (showEggBox) {  
      const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
      const xRotation = degreesToRadians(0);
      const yRotation = degreesToRadians(0);
      const zRotation = degreesToRadians(0);

    

    return (
        <mesh
        ref={mesh} 
            onPointerDown={() => handleItemInteraction("Eggbox")}
            position={[34, -2, -180]}
            rotation={[xRotation, yRotation, zRotation]}
            scale={4}
            
        >
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial map={imageTexture} side={Three.DoubleSide} transparent={true}  />
        </mesh>
    );
    } else {
      // Return null or a placeholder if the conditions are not met
      return null;
  }
}


export default EggBox;
