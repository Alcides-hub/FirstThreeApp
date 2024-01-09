import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber/native';
import * as Three from 'three';

function zoomControls({ targetSphericalCoords, zoomActive, zoomLevel = 20, zoomSpeed = 5, onZoomComplete}) {
  const { camera } = useThree();
  const targetDirection = useRef(new Three.Vector3());
  const initialFOV = useRef(camera.fov);
  const zoomCompleteCalled = useRef(false); // Ref to track if onZoomComplete has been called
  const [zoomCompleted, setZoomCompleted] = useState(false);
  const sphericalToVector = (spherical) => {
    const vector = new Three.Vector3();
    vector.setFromSpherical(spherical);
    return vector;
  };
  

  // Set the target direction when targetSphericalCoords change
  useEffect(() => {
    if (targetSphericalCoords) {
      targetDirection.current = sphericalToVector(targetSphericalCoords);
      camera.lookAt(targetDirection.current);
    }
  }, [targetSphericalCoords, camera]);

  // This function will be called every frame by useFrame
  const updateCamera = () => {
    // Update the FOV for zooming effect
    camera.fov = Three.MathUtils.lerp(camera.fov, zoomLevel, zoomSpeed * 0.01);
    camera.updateProjectionMatrix();
  };

  const zoomThreshold = 0.1; // Adjust this value based on your requirements


  useFrame(() => {
    if (zoomActive && !zoomCompleted) {
      camera.fov = Three.MathUtils.lerp(camera.fov, zoomLevel, zoomSpeed * 0.01);
      camera.updateProjectionMatrix();

      if (Math.abs(camera.fov - zoomLevel) < zoomThreshold) {
        onZoomComplete();
        setZoomCompleted(true);
      }
    }
  });

  useEffect(() => {
    if (!zoomActive) {
      setZoomCompleted(false);
    }
  }, [zoomActive]);

  return null;
}




export default zoomControls;
