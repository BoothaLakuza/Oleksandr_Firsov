import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import heroImgBack from "../../assets/Design uten navn (1).png"; // The image to show on the back
import themeIcon from "../../assets/sun.svg";
import twitterIcon from "../../assets/twitter-light.svg";
import twitterIconDark from "../../assets/twitter-dark.svg";
import githubIcon from "../../assets/github-light.svg";
import githubIconDark from "../../assets/github-dark.svg";
import linkedinIcon from "../../assets/linkedin-light.svg";
import linkedinIconDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/Sasha Firsov CV.pdf";
import { useTheme } from "../../common/ThemeContext";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import "./ArrowStyle.css";
import handImg from "../../assets/pngHandPointer.png";
import { animate, motion, useAnimation } from "framer-motion";

function Hero() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;

  const textVariantsLeft = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1, // Corrected key casing
      },
    },
  };

  const textVariantsRight = {
    initial: {
      x: 500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1, // Corrected key casing
      },
    },
  };
  const controls = useAnimation();

  const handleShake = async () => {
    // Start shake animation
    await controls.start({
      x: [0, -10, 10, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    });
  };

  return (
    <section id="hero" className={styles.container}>
      <motion.div className={styles.colorModeContainer} animate={controls}>
        <motion.div className={styles.flipContainer}>
          <div className={styles.flipper}>
            <img
              className={`${styles.hero} ${styles.front}`}
              src={heroImg}
              alt="Profile picture of Oleksandr Firsov"
            />
            <img
              className={`${styles.hero} ${styles.back}`}
              src={heroImgBack}
              alt="Back image of Oleksandr Firsov"
            />
          </div>
        </motion.div>
        <motion.img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          onClick={toggleTheme} // Existing functionality
          onClickCapture={handleShake} // Trigger shake animation
          whileTap={{ scale: 1.2 }} // Optional: scale the icon on tap
        />
      </motion.div>
      <motion.div className={styles.info} animate={controls}>
        <motion.h1
          className="hOne"
          variants={textVariantsLeft}
          initial="initial"
          animate="animate"
        >
          Oleksandr
          <br />
          Firsov
        </motion.h1>
        <motion.h2
          className="hTwo"
          variants={textVariantsRight}
          initial="initial"
          animate="animate"
        >
          Frontend Developer Portfolio
        </motion.h2>
        <span>
          <a href="https://x.com/boothalakuza" target="_blank">
            <img src={twitterIcon} alt="Twitter icon" />
          </a>
          <a href="https://github.com/BoothaLakuza" target="_blank">
            <img src={githubIcon} alt="GitHub icon" />
          </a>
          <a href="https://x.com/boothalakuza" target="_blank">
            <img src={linkedinIcon} alt="LinkedIn icon" />
          </a>
        </span>
        <motion.p
          variants={textVariantsLeft}
          initial="initial"
          animate="animate"
        >
          With passion to create engaging products
        </motion.p>
        <a href={CV} download>
          <button className="hover">Get my CV</button>
        </a>
      </motion.div>

      <motion.div 
        className="arrow-down"
        animate={{ y: [0, 20, 0] }} // Moves up and down
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          ease: "easeOut",
          repeatType: "reverse",
        }}
        whileHover={{ scale: 1.5 }} // Slightly scales up on hover
      >
        <img src={handImg} alt="Hand Pointer" width="75" height="75" /> {/* Adjust size if needed */}
      </motion.div>

    </section>
  );
}

export default Hero;
