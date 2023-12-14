import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber/native';

const SetupCamera = ({ setCameraRef }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.rotation.set(0, -0.4, 0); // Set the initial position
    setCameraRef(camera);
  }, [camera, setCameraRef]);

  return null; // This component does not render anything
};

export default SetupCamera;
