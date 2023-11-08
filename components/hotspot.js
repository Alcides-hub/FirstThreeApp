import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber/native';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function Hotspot({isImageOpen, onClick}) {
    
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
  
//   useEffect(() => {
//     if (isImageOpen) {
//       handleClick();
//     }
//   }, [isImageOpen]);


  return (
    <mesh
      ref={mesh}
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
