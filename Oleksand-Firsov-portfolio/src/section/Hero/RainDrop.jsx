import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../App.css';
const getGridSize = () => {
    const minFactor = Math.min(window.innerWidth, window.innerHeight);
    return minFactor > 1200 ? 65 : minFactor > 950 ? 55 : minFactor > 750 ? 45 : 35;
  };
const RainDrop = () => {
  const [grid, setGrid] = useState([]);
  const [cellSize, setCellSize] = useState(getGridSize()); // Default size

  useEffect(() => {
    const buildGrid = () => {
      const size = getGridSize();
      setCellSize(size);

      const cols = Math.floor(window.innerWidth / size);
      const rows = Math.floor(window.innerHeight / size);

      let gridItems = [];
      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
          gridItems.push({ id: `${i}-${j}`, row: i, col: j });
        }
      }
      setGrid(gridItems);
    };

    buildGrid();
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
  }, []);

  return (
    <div className='grid-container'>
      <svg className='svgItems' width="100%" height="100%">
        <g>
          {grid.map((item) => (
            <motion.rect
              key={item.id}
              x={item.col * cellSize}
              y={item.row * cellSize}
              width={cellSize}
              height={cellSize}
              fill="rgba(48, 69, 95, 0.45)"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default RainDrop;
