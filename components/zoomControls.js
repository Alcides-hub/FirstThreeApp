import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber/native';
import * as Three from 'three';

function zoomControls({ targetSphericalCoords, zoomLevel,zoomActive, zoomSpeed = 1 }) {
  const { camera } = useThree();
  const targetDirection = useRef(new Three.Vector3());
  const initialFOV = useRef(camera.fov);

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

  useFrame(() => {
    if (zoomActive) {
      // Only update camera FOV and look direction if zoom is active
      const direction = sphericalToVector(targetSphericalCoords);
      camera.lookAt(direction);
      camera.fov = Three.MathUtils.lerp(camera.fov, zoomLevel, zoomSpeed * 0.01);
      camera.updateProjectionMatrix();
    }
  });
  


  return null;
}

export default zoomControls;
