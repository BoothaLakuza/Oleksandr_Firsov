import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './Grid.css'; 

const TileGrid = () => {
  const [toggled, setToggled] = useState(false);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const wrapperRef = useRef(null);

  const toggle = () => {
    setToggled(prev => !prev);
  };

  const handleOnClick = index => {
    toggle();

    anime({
      targets: '.tile',
      backgroundColor: toggled ? '#ff0000' : '#00ff00', // Switch colors
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      }),
      easing: 'easeInOutQuad'
    });
  };

  const createTiles = () => {
    const tiles = [];
    for (let i = 0; i < columns * rows; i++) {
      tiles.push(
        <div
          key={i}
          className="tile"
          onClick={() => handleOnClick(i)}
        />
      );
    }
    return tiles;
  };

  const updateGrid = () => {
    if (wrapperRef.current) {
      const size = 50;
      const newColumns = Math.floor(window.innerWidth / size);
      const newRows = Math.floor(window.innerHeight / size);

      setColumns(newColumns);
      setRows(newRows);
      wrapperRef.current.style.setProperty('--columns', newColumns);
      wrapperRef.current.style.setProperty('--rows', newRows);
    }
  };

  useEffect(() => {
    updateGrid();
    window.addEventListener('resize', updateGrid);

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, [toggled]);

  return (
    <div
      ref={wrapperRef}
      id="tiles"
      className={toggled ? 'toggled' : ''}
    >
      {createTiles()}
    </div>
  );
};

export default TileGrid;
