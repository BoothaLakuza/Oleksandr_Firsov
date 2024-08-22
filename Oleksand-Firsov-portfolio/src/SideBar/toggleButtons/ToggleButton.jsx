import { motion } from "framer-motion";
import React, { useState } from "react";

const ToggleButton = ({ setOpen, open }) => {
  const firstPath =
    "M0 16h16V0H0v16zm2-2V2h12v12H2zm2-5h2V7H4v2zm6 0h2V7h-2v2zM7 9h2V7H7v2z";
  const secondPath =
    "M9.414 8l2.122-2.121-1.415-1.415L8 6.586 5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8zM0 16h16V0H0v16zm2-2V2h12v12H2z";

  return (
    <button
      onClick={() => {
        setOpen((prev) => !prev);
      }}
      style={{ display: "flex", alignItems: "center" }}
    >
      <motion.div
        className="squareBox"
        whileHover={{ rotate: 360, scale: 1.5 }}
        // whileTap={{ scale: 0.9 }}
        animate={{ width: open ? 20 : 30, height: open ? 20 : 30 }}
        style={{
          // backgroundColor: "blueviolet",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
        }}
      >
        <svg
          fill="#000000"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
        >
          <motion.path
            d={open ? secondPath : firstPath}
            fillRule="evenodd"
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.div>
      <span style={{ marginLeft: "8px" }}>Toggle</span>
    </button>
  );
};

export default ToggleButton;
