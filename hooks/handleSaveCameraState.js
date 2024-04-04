import { useDispatch } from 'react-redux';
import { saveCameraState } from '../actions/dialogueActions';
import { useThree } from '@react-three/fiber';


export const useSaveCameraState = () => {
  const dispatch = useDispatch();
  const { camera } = useThree();

  const handleSaveCameraState = () => {
    // Convert Three.js objects to plain objects
    const cameraState = {
      position: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      quaternion: { x: camera.quaternion.x, y: camera.quaternion.y, z: camera.quaternion.z, w: camera.quaternion.w },
      fov: camera.fov,
    };
    dispatch(saveCameraState(cameraState));
  };

  return handleSaveCameraState;
};