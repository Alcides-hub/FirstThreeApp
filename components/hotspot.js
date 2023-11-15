import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber/native';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as Three from 'three';
import { Dimensions } from 'react-native';

function Hotspot({isImageOpen, onClick, onTouchEnd, saveCameraState}) {

  const { camera} = useThree();
  const windowDimensions = Dimensions.get('window');
    
  const obj = useLoader(
    OBJLoader,
    require('../assets/icon-sign/infosign.obj')
  );

  const mesh = useRef();

  useFrame(() => {
    // Continuously rotate the object
    mesh.current.rotation.y += 0.02;
  });

  const handleClick = () => {
    console.log("Hotspot clicked!");
    if (typeof onClick === 'function') {
        onClick("Hotspot"); // Pass "Hotspot" as the identifier
      console.log("clicked!", isImageOpen)
    }
  };

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
  
  
  
//   useEffect(() => {
//     if (isImageOpen) {
//       handleClick();
//     }
//   }, [isImageOpen]);


  return (
    <mesh
      ref={mesh}
      onPointerDown={handleTouch}
      position={[22, 5, -47]}
      rotation={[0, Math.PI / 2, 0]} // Adjust the rotation as needed
      scale={[0.5, 0.5, 0.5]} // Adjust the scale as needed
      onClick={handleClick} // Handle the click event
    >
      <primitive object={obj} />
    </mesh>
  );
}

export default Hotspot;
