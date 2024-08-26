import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture  } from '@react-three/drei';
import "./CartridgeStyle.css"


function Cartridges({ url, position }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  
  useFrame(({ camera }) => {
    if (modelRef.current) {
      modelRef.current.lookAt(camera.position);
    }
  });

  // Clone the scene to avoid shared state issues
  const model = scene.clone();
  model.scale.set(1, 1, 1); // Adjust scale if needed
  model.position.set(...position); // Set position dynamically

  return <primitive object={model} ref={modelRef} />;
}

export default Cartridges;
