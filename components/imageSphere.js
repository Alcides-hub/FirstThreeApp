import { useRef } from 'react';
import { useLoader } from '@react-three/fiber/native';
import * as Three from 'three';
import { TextureLoader } from 'three';




function ImageSphere() {
    const mesh = useRef();
    const texture = useLoader(Three.TextureLoader, require('../assets/TokkaidoRoom1.jpg'));
  
    // Flip texture horizontally
    texture.wrapS = Three.RepeatWrapping;
    texture.repeat.x = -1;
  
    // If texture is not loaded, don't render the sphere yet
    if (!texture) return null;
  
    return (
      <mesh ref={mesh}>
        <sphereGeometry args={[600, 123, 15]} />
        <meshBasicMaterial map={texture} side={Three.BackSide} />
      </mesh>
    );
  }

  export default ImageSphere; 
  
  