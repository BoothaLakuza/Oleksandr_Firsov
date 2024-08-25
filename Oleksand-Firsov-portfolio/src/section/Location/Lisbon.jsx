// src/section/Location/Lisbon.js
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import "./LisbonStyle.css";

import mapPin from '../../assets/Lisbon Images/mapPin.png';
import circle from '../../assets/Lisbon Images/circle.png';
import jesus from '../../assets/Lisbon Images/jesus.png';
import bridge from '../../assets/Lisbon Images/ponto.png';
import mountain from '../../assets/Lisbon Images/mount.png';
import wave from "../../assets/Lisbon Images/waves.png";
import surfer from '../../assets/Lisbon Images/surfer.png';

const Lisbon = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: '-50% 0px',
    onChange: (inView) => {
      console.log('In view:', inView);
    },
  });

  const imageVariantsLeft = {
    hidden: {
      x: -500,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  const imageVariantsRight = {
    hidden: {
      x: 500,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="lisbon-container" ref={ref}>
      <motion.img
        src={circle}
        alt="Circle"
        className="circle"
        variants={imageVariantsLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.img
        src={jesus}
        alt="Jesus"
        className="jesus"
        variants={imageVariantsLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.img
        src={bridge}
        alt="Bridge"
        className="bridge"
        variants={imageVariantsRight}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.img
        src={mountain}
        alt="Mountain"
        className="mountain"
        variants={imageVariantsRight}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.img
        src={wave}
        alt="Waves"
        className="waves"
        variants={imageVariantsLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.img
        src={surfer}
        alt="Surfer"
        className="surfer"
        variants={imageVariantsLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div
        className="lisbon-container"
        variants={imageVariantsLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.img
          src={mapPin}
          alt="MapPin"
          className="pin"
          initial={{ y: 0 }}
          animate={isInView ? { y: [0, -40, 0] } : { y: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <div className='lisbonName'>
          
        <p>Based in:</p>
        <h1 >Lisbon</h1>
        </div>
      </motion.div>
    </div>
  );
};

export default Lisbon;
