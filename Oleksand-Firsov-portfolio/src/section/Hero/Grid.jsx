import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import "../../App.css";

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
      backgroundColor: toggled ? '#694F8E' : '#8C3061',
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      }),
      easing: 'easeInOutQuad',
      keyframes: [
        { scale: 1.5 },
        { scale: 1 }
      ]
    });
  };

  const calculateOpacity = (index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const centerX = columns / 2;
    const centerY = rows / 2;

    // Calculate distance from the center
    const distance = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2));

    // Normalize distance to a range between 0.25 and 1 (or any range you'd like)
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const opacity = 1 - (distance / maxDistance) * 0.90; // Adjust 0.75 to control the range

    return opacity;
  };

  const createTiles = () => {
    const tiles = [];
    for (let i = 0; i < columns * rows; i++) {
      const opacity = calculateOpacity(i);
      tiles.push(
        <motion.div
          key={i}
          className="tile"
          onClick={() => handleOnClick(i)}
          initial={{ opacity: opacity }}
          whileHover={{ opacity: opacity * 0.25 }}
          transition={{ duration: 0.5 }}
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
    //Create a unit test?
  };

  useEffect(() => {
    updateGrid();
    window.addEventListener('resize', updateGrid);

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, []);

  useEffect(() => {
    const animation1 = () => {
      anime({
        targets: '.tile',
        backgroundColor: toggled ? '#694F8E' : '#8C3061',
        rotate: [0, 360],
        delay: anime.stagger(50, { grid: [columns, rows] }),
        easing: 'easeInOutQuad'
      });
    };

    const animation2 = () => {
      anime({
        targets: '.tile',
        backgroundColor: toggled ? '#694F8E' : '#8C3061',
        delay: anime.stagger(50, { grid: [columns, rows], axis: 'y' }),
        easing: 'easeInOutQuad'
      });
    };

    const animation3 = () => {
      anime({
        targets: '.tile',
        scale: [0, 1],
        delay: anime.stagger(50, { grid: [columns, rows] }),
        easing: 'easeOutBack'
      });
    };

    const animations = [animation1, animation2, animation3];

    const playRandomAnimation = () => {
      const randomIndex = Math.floor(Math.random() * animations.length);
      animations[randomIndex]();
    };

    // Set interval to play random animation every 20 seconds
    const intervalId = setInterval(playRandomAnimation, 10000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [columns, rows, toggled]);

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
