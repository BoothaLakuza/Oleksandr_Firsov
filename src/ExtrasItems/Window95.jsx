// src/Window95.js
import React from 'react';
import './Window95Style.css';
import {motion} from "framer-motion"
import Lisbon from '../section/Location/Lisbon';
import globe from "../assets/world-2.png"


const Window95 = () => {
  return (
    <motion.div className="box"
    drag
    dragConstraints={{
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }}
    >
      <div className="title">
        <img className="title-icon" src={globe} alt="icon" />
        <p className="title-text">Location</p>
        <button className="close-btn">X</button>
      </div>
      <div className="body">
        <div className="content">
        
        </div>
        <div className="transparent-area">
            <Lisbon/>
          {/* Content inside this area will be fully transparent */}
          {/* <p>This area is fully transparent.</p> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Window95;
