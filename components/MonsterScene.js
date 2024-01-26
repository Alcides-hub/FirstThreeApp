import { useEffect, useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber/native';
import * as Three from 'three';
import { Asset } from 'expo-asset';

function ImageComponent() {
  const [imageTexture, setImageTexture] = useState(null);
  const { invalidate } = useThree();

  useEffect(() => {
    async function loadTexture() {
      try {
        const asset = Asset.fromModule(require('../assets/monster/monster.png'));
        await asset.downloadAsync();
        const texture = new Three.TextureLoader().load(asset.uri);
        setImageTexture(texture);
        invalidate(); // Trigger a re-render in R3F after texture is loaded
      } catch (error) {
        console.error("Texture loading error:", error);
      }
    }

    loadTexture();
  }, [invalidate]);

  if (!imageTexture) {
    return null;
  }

  return (
    <mesh position={[-3, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial map={imageTexture} side={Three.DoubleSide} transparent={true}  />
    </mesh>
  );
}

export default ImageComponent;
