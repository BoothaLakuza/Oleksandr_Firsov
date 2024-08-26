import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Cartridge from "./Cartridges"; // Adjust the import path if needed
import "../projects/CartridgeStyle.css";
import Sega from "../projects/Sega.jsx";


const Carousel = ({ models, radius, staticModelUrl }) => {
  const modelCount = models.length;
  const angleStep = (2 * Math.PI) / modelCount; // Angle between each model
  const segaPosition = [0, -2, 0]; // Adjust these values as needed
  const segaRotation = [-6, Math.PI / 90, 0]; // Example rotation (45 degrees around the Y axis)

  return (
    <Canvas className="cartridgeCanvas">
      <ambientLight intensity={10} />
      <directionalLight position={[5, 5, 5]} intensity={10} />
      <directionalLight position={[-5, -5, -5]} intensity={10} />
      <directionalLight position={[0, 0, 0]} intensity={10} />
      <OrbitControls
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI - Math.PI / 2.1}
        minDistance={15}
        maxDistance={20}
      />

      <Suspense fallback={null}>
        <Sega position={segaPosition} rotation={segaRotation} />
      </Suspense>

      {/* Rotating Models */}
      <group>
        {models.map((modelUrl, index) => {
          const angle = index * angleStep;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);

          return (
            <Cartridge
              key={index} // Unique key for each model
              url={modelUrl}
              position={[x, 0, z]}
            />
          );
        })}
      </group>
    </Canvas>
  );
};

export default Carousel;
