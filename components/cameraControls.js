import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber/native';
import * as Three from 'three';
import { Gyroscope } from 'expo-sensors';
import useGyroscope from './useGyroscope';




function CameraControls({rotation, controlMode, isDialogueActive, showModalNote}) {
    const { camera } = useThree();
    const gyroscopeData = useRef({ x: 0, y: 0, z: 0 });
    const manualRotation = useRef({ x: 0, y: 0 });
    const initialOrientationSet = useRef(false);
    const initialOrientation = useRef(new Three.Quaternion());
  
     
    
    // Set the initial orientation once
    useEffect(() => {
      // Adjust the second parameter (Y axis rotation) to fine-tune the initial direction the camera faces
      // The value is in radians, and 2 * Math.PI radians equals 360 degrees.
      // Since you mentioned it's a little to the right, try subtracting a small value from Math.PI and adjust as needed.
      const yRotation = Math.PI  / 180 ; // start with directly behind the initial position
      const fineTuning = 0; // adjust this value to fine-tune the direction
    
      initialOrientation.current.setFromEuler(new Three.Euler(0, yRotation - fineTuning, 0, 'XYZ'));
      camera.quaternion.copy(initialOrientation.current);
      initialOrientationSet.current = true;
    }, [camera]);
  
    // Initialize the gyroscope sensor
    useGyroscope((data) => {
      if (initialOrientationSet.current) {
        gyroscopeData.current = {
          x: lowPassFilter(data.x, gyroscopeData.current.x, 0.05),
          y: lowPassFilter(data.y, gyroscopeData.current.y, 0.05),
          z: lowPassFilter(data.z, gyroscopeData.current.z, 0.05),
        };
      }
    });
  
    // The lowPassFilter function itself
  const lowPassFilter = (newValue, oldValue, alpha) => {
    return oldValue + alpha * (newValue - oldValue);
  };
  // useEffect(() => {
  //   // Set the camera to an initial upright orientation
  //   // Adjust these values as needed to ensure the camera starts upright
  //   camera.rotation.set(0, 0, 0); // This sets the camera to a default upright position
  //   initialOrientation.current.copy(camera.quaternion); // Store this as the initial orientation
  //   initialOrientationSet.current = true;
  // }, [camera]);
  
  useFrame(() => {
    // if (isDialogueActive) {
    //   return;
    // }
    // if (showModalNote) {
    //   return;
    // }
    if (controlMode === 'gyroscope') {
    // Adjusting the scale factors for sensitivity
    const pitchScale = 0.03; // Control sensitivity of up and down movement
    const yawScale = 0.03; // Control sensitivity of left and right movement
  
    // Map gyroscope pitch (y-axis) to camera's X-axis (up and down)
    // Map gyroscope yaw (x-axis) to camera's Y-axis (left and right)
    const pitch = gyroscopeData.current.y * - pitchScale;
    const yaw = gyroscopeData.current.x * yawScale;
  
    // Apply the gyroscope data directly to the camera rotation
    // This will continuously update the camera's orientation based on the gyroscope
    camera.rotation.x += pitch;
    camera.rotation.y += yaw;
  
    // Optional: Clamp the rotation to prevent extreme tilting or turning
    const maxPitch = Math.PI / 45; // Limit up/down movement
    camera.rotation.x = Math.max(-maxPitch, Math.min(maxPitch, camera.rotation.x));
  
    // Ensure the rotation values stay within a valid range
    camera.rotation.x %= 2 * Math.PI;
    camera.rotation.y %= 2 * Math.PI;
  } else if ( controlMode === 'buttons') {
    const rotationInRadians = rotation * (Math.PI / 180 );
      camera.rotation.y = rotationInRadians;
  } 
  });
  
  
    return null;
  }

  export default CameraControls;