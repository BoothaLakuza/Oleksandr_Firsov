import React from "react";
import "./WindowOStyle.css";
import folderIcon from "../assets/window95ICon.png"; // Adjust the path to your image
import { motion } from "framer-motion";

const WindowOS = ({ onClose }) => {
  return (
    <motion.div
      className="contactbox"
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
    >
      <div className="title">
        <img className="title-icon" src={folderIcon} alt="icon" />
        <p className="title-text">Contact Me:</p>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="content" id="windows95-content">
        <form id="contact-form">
          <h1> Name:</h1>
          <label htmlFor="name"></label>
          <input type="text" id="name" name="name" required />
          <h1> Email:</h1>
          <label htmlFor="email"></label>
          <input type="email" id="email" name="email" required />
          <h1> Message me:</h1>
          <label htmlFor="message"></label>
          <textarea id="message" name="message" required></textarea>
          <p>P.S this form doesnt work yet😅</p>
          <button className="submitBtn" type="submit">Send</button>
        </form>
      </div>
    </motion.div>
  );
};

export default WindowOS;
