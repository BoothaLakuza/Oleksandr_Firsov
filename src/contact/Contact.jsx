import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./ContactStyles.css";


function Model({ url, position, rotation }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate around the Y-axis
 
    }
  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={position}
      rotation={rotation}
    />
  );
}

const Contact = ({position, rotation}) => {
  return (
    <Canvas className="disk">
         <ambientLight intensity={10} />
      <directionalLight position={[5, 5, 5]} intensity={10} />
      <directionalLight position={[-5, -5, -5]} intensity={10} />
      <directionalLight position={[0, 0, 0]} intensity={10} />

      <Model url="../assets/3D models/Disquete/disk_34.glb" position={position} rotation={rotation}/>;
    </Canvas>
  );
};

export default Contact;
