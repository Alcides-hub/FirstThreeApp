import React, { useState, useEffect, useRef } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber/native';
import * as Three from 'three';
import { Asset } from 'expo-asset';
import {useDispatch, useSelector} from 'react-redux';
import {setInteractedItem, setCurrentSelectedItem, setZoomActive, setZoomParams} from '../actions/dialogueActions';
import { Dimensions } from 'react-native';
import { useSaveCameraState} from '../hooks/handleSaveCameraState';





function Hotspot() {
  const { showEggBox, isDialogueVisible, showModalNote } = useSelector((state) => state.dialogue);
  const { camera, invalidate} = useThree();
  const windowDimensions = Dimensions.get('window');
  const dispatch = useDispatch();
  const mesh = useRef();
  const [imageTexture, setImageTexture] = useState(null);
  const saveCameraState = useSaveCameraState();
  

  const handleItemInteraction = (ItemName) => {
    
    
      if (ItemName === "Hotspot") {
        dispatch(setCurrentSelectedItem(ItemName));
        
      }
    };

    const handleTouchEnd = (point) => {
      const ItemName = "Hotspot"; // Or dynamically determine based on the object interacted with
      const serializablePoint = { x: point.x, y: point.y, z: point.z };
      dispatch(setInteractedItem({ ItemName, point: serializablePoint }));
      dispatch(setZoomActive(true));
      // setIsImageOpen(true);
    };
    
 // Load texture once, regardless of conditions
 useEffect(() => {
  console.log("image on!")
    async function loadTexture() {
        try {
            const asset = Asset.fromModule(require('../assets/icon-sign/infosign2.png'));
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

useFrame(() => {
  if (mesh.current) {
    mesh.current.rotation.y += 0.02;
  }
});

  //   const handleClick = () => {
  //   console.log("Hotspot clicked!");
  //   if (typeof onClick === 'function') {
  //       onClick("Hotspot"); // Pass "Hotspot" as the identifier
  //     console.log("clicked!", isImageOpen)
  //   }
  // };

  const handleTouch = (event) => {
    // Calculate touch position in normalized device coordinates (-1 to +1)
    // Assuming the hotspot is the same size as the window/screen:
    const touchX = (event.nativeEvent.locationX / windowDimensions.width) * 2 - 1;
  const touchY = -(event.nativeEvent.locationY / windowDimensions.height) * 2 + 1;
  saveCameraState();
  
  
  

    // Create a vector for the raycaster
    const pointerVector = new Three.Vector2(touchX, touchY);
    
    // Use Raycaster to find intersections
    const raycaster = new Three.Raycaster();
    raycaster.setFromCamera(pointerVector, camera);
    const intersects = raycaster.intersectObject(mesh.current);
  
    if (intersects.length > 0) {
      // If the ray intersects with the mesh, call the onTouchEnd prop
      if (typeof onTouchEnd === 'function') {
        onTouchEnd(intersects[0].point);
      }
    }
  };
  
  
  
  if (isDialogueVisible || showModalNote || !imageTexture) {
    return null; // Ensures Hotspot is not rendered if dialogue or modal note is visible, or if imageTexture hasn't loaded
  }


  return (
    <mesh
      ref={mesh} 
      onPointerDown={handleTouch}
      onClick={handleItemInteraction}
      onTouchEnd={handleTouchEnd}
      position={[28, 3, -20]}
      rotation={[0, Math.PI / 2, 0]} // Adjust the rotation as needed
      scale={[0.5, 0.5, 0.5]} // Adjust the scale as needed
      
    >
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial map={imageTexture} side={Three.DoubleSide} transparent={true}  />
    </mesh>
  );
} 

export default Hotspot;
