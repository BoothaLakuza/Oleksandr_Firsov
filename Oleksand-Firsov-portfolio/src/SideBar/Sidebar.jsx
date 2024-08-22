// import { useState } from "react";
// import { delay, motion, transform } from "framer-motion";
// import Links from "./links/Links";
// import "./sidebar.css";
// import ToggleButton from "./toggleButtons/ToggleButton";

// const Sidebar = () => {
// const [open, setOpen] = useState(false)

// const variants ={
//     open:{
//         clipPath: "circle(1200px at 50px 50px)",
//         transition:{
//             delay: 0.5,
//             type: "spring",
//             stiffness: 20,
//             damping: 40,
//         }
//     },
//     closed:{
//         clipPath: "circle(30px at 50px 50px)",
//         transition:{
//             delay: 0.5,
//             type: "spring",
//             stiffness: 400,
//             damping: 40,
//         }
//     }
// }

//   return (
//     <motion.div className="sidebar" animate={open ? "open" : "closed"}>
//       <motion.div className="bg" variants={variants}>
//         <Links />
//       </motion.div>
//       <ToggleButton setOpen ={setOpen}/>
//     </motion.div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Links from "./links/Links";
import ToggleButton from "./toggleButtons/ToggleButton";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 400, // Fixed width for .bg
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        height: window.innerHeight,
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  const getBlocks = (indexOfColum) => {
    const blockSize = dimensions.height * 0.1;
    const nbOfBlocks = Math.ceil(dimensions.width / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
    return shuffledIndexes.map((randomIndex, index) => (
      <motion.div
        key={index}
        className="block"
        initial={{ opacity: 0 }}
        animate={{
          opacity: open ? 1 : 0,
          transition: {
            duration: 0.4,
            delay: 0.02 * (indexOfColum + randomIndex),
          },
        }}
      />
    ));
  };

  return (
    <motion.div
    className="sidebar" animate={open ? "open" : "closed"}
      // animate={{ opacity: open ? 1 : 0 }}
      // transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pixelBackground">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="row">
              {getBlocks(index)}
            </div>
          ))}
        </div>
        <Links isOpen={open} />
      </motion.div>
      <ToggleButton setOpen={setOpen} open={open} />
    </motion.div>
  );
};

export default Sidebar;
