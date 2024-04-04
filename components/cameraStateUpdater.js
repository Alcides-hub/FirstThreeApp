import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { clearCameraResetRequest } from '../actions/dialogueActions';

const CameraStateUpdater = () => {
  const { camera } = useThree();
  const dispatch = useDispatch();
 
  const isCameraResetRequested = useSelector((state) => state.dialogue.requestCameraReset);
  const savedCameraState = useSelector((state) => state.dialogue.cameraState);
  console.log(savedCameraState);

  useEffect(() => {
    if (isCameraResetRequested && savedCameraState) {
      // Apply the saved camera state
      camera.position.set(savedCameraState.position.x, savedCameraState.position.y, savedCameraState.position.z);
      camera.quaternion.set(savedCameraState.quaternion.x, savedCameraState.quaternion.y, savedCameraState.quaternion.z, savedCameraState.quaternion.w);
      camera.fov = savedCameraState.fov;
      camera.updateProjectionMatrix();
  
      // Reset the flag to prevent repeated resets
      dispatch(clearCameraResetRequest());
      
    }
  }, [isCameraResetRequested, savedCameraState, camera, dispatch]); // Correctly list dependencies here

  return null;
};
export default CameraStateUpdater;

