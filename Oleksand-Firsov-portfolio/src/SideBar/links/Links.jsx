import React from 'react';
import { motion } from 'framer-motion';

const Links = ({ isOpen }) => {
  const items = [
    "HomePage",
    "Location",
    "Skills",
    "Contact",
  ];

  // Animation variants for individual links
  const linkVariants = {
    hidden: { opacity: 0, x: -50 }, // Instant disappearance and movement
    visible: { opacity: 1, x: 0 },   // Normal state when visible
  };

  // Transition configuration
  const transitionConfig = {
    duration: 1, // Duration for appearing
    delay: 0,    // Delay for hidden state, effectively zero
  };

  // Function to calculate tilt based on mouse position
  const calculateTilt = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width; // X coordinate from 0 to 1
    const y = (clientY - top) / height; // Y coordinate from 0 to 1
    const tiltX = (y - 0.5) * 10; // Adjust tilt intensity
    const tiltY = (x - 0.5) * -10; // Adjust tilt intensity
    return { tiltX, tiltY };
  };

  return (
    <div className="links">
      {items.map((item, index) => (
        <motion.a
          key={item}
          href={`#${item}`}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={linkVariants}
          transition={{
            opacity: { duration: isOpen ? transitionConfig.duration : 0 },
            x: { duration: isOpen ? transitionConfig.duration : 0 },
            delay: index * 0.3, // Staggered delay for appearance
          }}
          style={{ display: 'inline-block', perspective: '1000px' }} // Perspective for 3D effect
        >
          <motion.div
            whileHover={{
              rotateX: 10,
              rotateY: -10,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            onMouseMove={(e) => {
              const { tiltX, tiltY } = calculateTilt(e);
              e.currentTarget.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }}
            style={{ padding: '10px', backgroundColor: '#eee', borderRadius: '5px' }} // Styling for the link container
          >
            {item}
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
}

export default Links;
