import React from 'react'
import { motion } from 'framer-motion';
import "./LisbonStyle.css"

import mapPin from '../../assets/Lisbon Images/mapPin.png'
import circle from '../../assets/Lisbon Images/circle.png'
import jesus from '../../assets/Lisbon Images/jesus.png'
import bridge from '../../assets/Lisbon Images/ponto.png'
import mountain from '../../assets/Lisbon Images/mount.png'
import wave from "../../assets/Lisbon Images/waves.png";
import surfer from '../../assets/Lisbon Images/surfer.png'


const Lisbon = () => {

  const imageVariantsLeft = {
      initial: {
          x: -500,
          opacity: 0,
      },
      animate: {
          x: 0,
          opacity: 1,
          transition: {
              duration: 1,
              staggerChildren: 0.1,
          },
      },
  };

  const imageVariantsRight = {
      initial: {
          x: 500,
          opacity: 0,
      },
      animate: {
          x: 0,
          opacity: 1,
          transition: {
              duration: 1,
              staggerChildren: 0.1,
          },
      },
  };

  return (
      <div className="lisbon-container">
          <motion.img
              src={circle}
              alt="Circle"
              className="circle"
              variants={imageVariantsLeft}
              initial="initial"
              animate="animate"
          />
          <motion.img
              src={jesus}
              alt="Jesus"
              className="jesus"
              variants={imageVariantsLeft}
              initial="initial"
              animate="animate"
          />
          <motion.img
              src={bridge}
              alt="Bridge"
              className="bridge"
              variants={imageVariantsRight}
              initial="initial"
              animate="animate"
          />
          <motion.img
              src={mountain}
              alt="Mountain"
              className="mountain"
              variants={imageVariantsRight}
              initial="initial"
              animate="animate"
          /> 
            <motion.img
              src={wave}
              alt="Waves"
              className="waves"
              variants={imageVariantsLeft}
              initial="initial"
              animate="animate"
          /> 
                <motion.img
              src={surfer}
              alt="Surfer"
              className="surfer"
              variants={imageVariantsLeft}
              initial="initial"
              animate="animate"
          /> 
           <motion.div
            className="lisbon-container"
            variants={imageVariantsLeft} // Optional: Apply container animation
            initial="initial"
            animate= "animate"
        >
            <motion.img
                src={mapPin}
                alt="MapPin"
                className="pin"

                initial={{ y: 0 }}
                animate={ {y: [0, -40, 0]}}
                transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    repeatType: 'loop', 
                    ease: 'easeInOut', 
                    delay: 1 // Delay before bouncing starts
                }}
            />
            <h1 className='lisbonName'>Lisbon</h1>
        </motion.div>
    
      </div>
  );
};


export default Lisbon