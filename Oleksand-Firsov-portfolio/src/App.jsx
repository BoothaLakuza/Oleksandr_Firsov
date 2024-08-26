import "./App.css";
import Hero from "./section/Hero/Hero";
import Projects from "./projects/Projects";
import SkillContainer from "./skills/SkillsContainer";
import WindowOS from "./contact/WindowOS";
import Pond from "./skills/Pond";
import Keyboard from "./contact/Keyboard";
import NavBar from "./NavBar/NavBar";
import Lisbon from "./section/Location/Lisbon";
import Grid from "./section/Hero/Grid";
import RainDrop from "./section/Hero/RainDrop";
import Window95 from "./ExtrasItems/Window95";
import Cartridges from "./projects/Cartridges";
import Carousel from "./projects/Carousel";
import CRTScreen from "./Effects/CRTScreen";
import "./Effects/CRTStyle.css";
import Sega from "./projects/Sega";
import Contact from "./contact/Contact";
import  "./contact/ContactStyles.css";
function App() {
  const models = [
    "../src/assets/3D models/Cartridge/Cartridge.glb",
    "../src/assets/3D models/Cartridge/Cartridge.glb",
    "../src/assets/3D models/Cartridge/Cartridge.glb",
  ];
  const disqueteRotation = [0, 0, 0.5]; 
  const disquetePosition = [0, -5, -80]; 
  const cartridgeRadius = 10;
  return (
    <>
      <Grid />
      
        <div className="curvedImage">
          <div className="contactForm">
         <Contact position={disquetePosition} rotation={disqueteRotation}/> 
         </div>
          <div className="screen">
            <CRTScreen />
            <div className="text">
              <span>AV-1</span>
              <span>AV-1</span>
              <span>AV-1</span>
              <span>AV-1</span>
              <span>AV-1</span>
            </div>
            <div className="scanlines">
              <div className="overlay"></div>
            </div>
          </div>
        </div>
        <section id="HomePage">
          <NavBar />
          <Hero />
        </section>
        <section id="Location">
          {/* <Lisbon /> */}
          <Window95 />
        </section>
        <section id="Skills">
          <h1>Projects</h1>
          <Carousel models={models} radius={cartridgeRadius} />
        </section>
        <section id="Contact">Contact</section>
      
    </>
  );
}

export default App;
