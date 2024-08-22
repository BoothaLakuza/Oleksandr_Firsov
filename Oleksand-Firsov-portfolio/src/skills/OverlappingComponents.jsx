import React from 'react';
import Pond from './Pond'; // Import your Pond component
import SkillsContainer from './SkillsContainer'; // Import your SkillsContainer component

const OverlappingComponents = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Pond />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
        <SkillsContainer />
      </div>
    </div>
  );
};

export default OverlappingComponents;
