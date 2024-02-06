import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber/native';

const SetupCamera = ({ }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.rotation.set(0, 0, -0.02); 
  }, [camera]);

  return null; // This component does not render anything
};

export default SetupCamera;
