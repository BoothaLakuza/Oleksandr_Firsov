import styles from './ProjectsStyles.module.css';
import ProjectCard from '../common/ProjectCard';
import ProjectCardVideo from '../common/ProjectCardVideo';
import proceduralAnimal from '../assets/Procedural snake.mp4'

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCardVideo
          src={proceduralAnimal}
          link="https://github.com/BoothaLakuza/Snak"
          h3="Snak"
          p="Video Game Demo"
        />
      </div>
    </section>
  );
}

export default Projects;