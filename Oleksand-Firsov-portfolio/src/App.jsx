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

function App() {
  return (
    <>
        <div className="gridApp">
          <Grid />
        </div>
      <section id="HomePage">
        <NavBar />
        <Hero />
      </section>
      <section id="Location">
        <Lisbon />
      </section>
      <section id="Skills">
        Skills
      </section>
      <section id="Contact">Contact</section>
    </>
  );
}

export default App;
