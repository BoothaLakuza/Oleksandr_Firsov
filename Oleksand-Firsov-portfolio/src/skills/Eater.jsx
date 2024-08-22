import React from 'react';
import './SkillsContainer.css'; // Add necessary CSS for the eater

const Eater = ({ position }) => {
  return (
    <div
      className="eater"
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default Eater;
