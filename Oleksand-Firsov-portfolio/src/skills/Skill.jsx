import React from 'react';
import './SkillsContainer.css';

const Skill = ({ skill, position }) => {
  const skillStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '3px',
    textAlign: 'center',
    fontSize: '14px',
    animation: 'floating 3s ease-in-out infinite'
  };

  return (
    <div style={skillStyle} className="skill">
      {skill}
    </div>
  );
};

export default Skill;
