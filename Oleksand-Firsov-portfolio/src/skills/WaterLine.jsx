// Line.js
import React from 'react';
import './Line.css'; // Add styling for the line here

const Line = ({ position, size, width = 10, height = 10 }) => {
  return (
    <div
      className="line"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y + size.height - 30, // Adjust position to the bottom of the skill
        width: size.width,
        height: height, // Use the custom height here
        backgroundColor: 'black', // Change color as needed
      }}
    />
  );
};

export default Line;
