import React, { useState, useEffect, useRef } from 'react';
import SkillsContainer from './SkillsContainer'; // Import SkillsContainer

// Helper function to check if a point is near the wavy boundary of the oval
const isOnWavyBoundary = (x, y, centerX, centerY, a, b, waveFrequency, waveAmplitude, time) => {
  const dx = x - centerX;
  const dy = y - centerY;
  
  // Base distance calculation for the oval
  let distance = (dx * dx) / (a * a) + (dy * dy) / (b * b);

  // Calculate wave effect with time-based animation
  const angle = Math.atan2(dy, dx);
  const waveEffect = waveAmplitude * Math.sin(waveFrequency * angle + time);

  // Adjust the distance for wave effect
  distance = distance - waveEffect;
  
  // Check if the point is within the wavy boundary
  return distance >= 0.9 && distance <= 1.1;
};

// Generate the grid with wavy boundary symbols
const generatePondGrid = (rows, cols, centerX, centerY, a, b, symbols, waveFrequency, waveAmplitude, time) => {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      if (isOnWavyBoundary(x, y, centerX, centerY, a, b, waveFrequency, waveAmplitude, time)) {
        row.push(symbols[Math.floor(Math.random() * symbols.length)]);
      } else {
        row.push(' '); // Empty space inside and outside the oval
      }
    }
    grid.push(row);
  }
  return grid;
};

const Pond = ({children, style}) => {
  const [grid, setGrid] = useState([]);
  const [time, setTime] = useState(0);
  const [raindrops, setRaindrops] = useState([]);
  const requestRef = useRef();
  
  const rows = 40;
  const cols = 60;
  const centerX = cols / 2;
  const centerY = rows / 2;
  const a = cols / 2;
  const b = rows / 2.5;
  const symbols = ['~', '*', 'O', '|'];

  // Wavy boundary parameters
  const waveFrequency = 5; // Number of waves around the boundary
  const waveAmplitude = 0.1; // Amplitude of the waves

  // Function to update grid based on the current time
  const updateGrid = () => {
    let newGrid = generatePondGrid(rows, cols, centerX, centerY, a, b, symbols, waveFrequency, waveAmplitude, time);
    
    // Check for raindrop collision and update grid
    raindrops.forEach(raindrop => {
      const { x, y } = raindrop;
      if (y < rows && newGrid[y][x] === '|') {
        newGrid[y][x] = ' '; // Destroy the boundary symbol
      }
    });

    setGrid(newGrid);
  };

  // Function to animate the raindrops
  const animateRaindrops = () => {
    setRaindrops(prevRaindrops => {
      // Move each raindrop down by one row
      const updatedRaindrops = prevRaindrops.map(raindrop => ({
        ...raindrop,
        y: raindrop.y + 1
      })).filter(raindrop => raindrop.y < rows); // Remove raindrops that fall off the grid

      // Add a new raindrop occasionally
      if (Math.random() < 0.1) { // Adjust the probability to control raindrop frequency
        updatedRaindrops.push({ x: Math.floor(Math.random() * cols), y: 0 });
      }

      return updatedRaindrops;
    });
  };

  // Animation loop
  const animate = () => {
    setTime(prevTime => prevTime + 0.05); // Increment time to create wave motion
    updateGrid();
    animateRaindrops();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    updateGrid(); // Initial grid setup
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current); // Cleanup on component unmount
  }, [time]);

  return (
    <div style={{...style, fontFamily: 'monospace', whiteSpace: 'pre' }}>
      <div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.join(' ')}
          </div>
        ))}
        {children}
        {/* Display the falling raindrops */}
        {raindrops.map((raindrop, index) => (
          <div key={index} style={{ 
            position: 'absolute',
            top: raindrop.y * 18, // Adjust these values based on your font size and row height
            left: raindrop.x * 10, // Adjust these values based on your font size and column width
            color: 'blue' // Optional: Change color to make raindrops more visible
          }}>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pond;
