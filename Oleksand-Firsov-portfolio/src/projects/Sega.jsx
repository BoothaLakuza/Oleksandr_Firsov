import React from "react";
import { useGLTF } from "@react-three/drei";
import "./SegaStyle.css";

function Model({ url, position, rotation }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} rotation={rotation} />;
}

const Sega = ({ position, rotation }) => {
  return <Model url="../../src/assets/3D models/SEGA/SegaModel.glb" position={position} rotation={rotation} />;
};

export default Sega;
