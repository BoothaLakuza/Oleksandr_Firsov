import React, { useState, useEffect } from "react";
import "./WindowOStyle.css";
import folderIcon from "../assets/window95ICon.png"; // Adjust the path to your image

const WindowOS = ({ children, style }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        left: e.clientX - offset.x,
        top: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClose = () => {
    setPosition({ left: -9999, top: -9999 }); // Hide the window
  };

  const handleFolderClick = () => {
    alert("Folder clicked!");
    // Add any other functionality here
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="windowos-section">
      <div className="pc-container">
        <div className="screen-container">
          <button
            className="folder-button"
            onClick={handleFolderClick}
          ></button>
          <div
            id="windows95-window"
            style={{ left: `${position.left}px`, top: `${position.top}px` }}
          >
            <div id="windows95-titlebar" onMouseDown={handleMouseDown}>
              <span>Contact Me</span>
              <button id="close-btn" onClick={handleClose}>
                X
              </button>
            </div>
            <div id="windows95-content">
              <form id="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default WindowOS;
