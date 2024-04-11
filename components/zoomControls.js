import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber/native';
import * as Three from 'three';
import { useDispatch, useSelector} from 'react-redux';
import { setIsImageOpen, setSphereCoords, setZoomCompleted, setZoomActive } from '../actions/dialogueActions';


function zoomControls({ zoomSpeed = 5}) {
  const { camera } = useThree();
  const targetDirection = useRef(new Three.Vector3());
  const dispatch = useDispatch();
  const initialFOV = useRef(camera.fov);
  // const zoomCompleteCalled = useRef(false); // Ref to track if onZoomComplete has been called
  // const [zoomCompleted, setZoomCompleted] = useState(false);
  const sphericalToVector = (spherical) => {
    const vector = new Three.Vector3();
    vector.setFromSpherical(spherical);
    return vector;
  };
  const { zoomActive, zoomLevel, isZoomCompleted, sphericalCoords} = useSelector((state) => state.dialogue)
  const { zoomTarget } = useSelector((state) => state.dialogue);
  // Set the target direction when targetSphericalCoords change
  useEffect(() => {
    if (sphericalCoords) {
      targetDirection.current = sphericalToVector(sphericalCoords);
      camera.lookAt(targetDirection.current);
    }
  }, [sphericalCoords, camera]);

  // This function will be called every frame by useFrame
  const updateCamera = () => {
    // Update the FOV for zooming effect
    camera.fov = Three.MathUtils.lerp(camera.fov, zoomLevel, zoomSpeed * 0.01);
    camera.updateProjectionMatrix();
  };

  const zoomThreshold = 0.1; // Adjust this value based on your requirements


  useFrame(() => {
    if (zoomActive && !isZoomCompleted && zoomTarget) {
      camera.fov = Three.MathUtils.lerp(camera.fov, zoomLevel, zoomSpeed * 0.01);
      camera.updateProjectionMatrix();
      const targetVec = new Three.Vector3(...zoomTarget);
      camera.lookAt(targetVec);
      // console.log(zoomTarget,"hello");

      if (Math.abs(camera.fov - zoomLevel) < zoomThreshold) {
        dispatch(setZoomCompleted(true));
      }
    }
  },[ zoomLevel ,zoomTarget ,zoomActive, isZoomCompleted, dispatch]);

  useEffect(() => {
    if (!zoomActive) {
      dispatch(setZoomCompleted(false));
    }
  }, [zoomActive]);

  return null;
}




export default zoomControls;
