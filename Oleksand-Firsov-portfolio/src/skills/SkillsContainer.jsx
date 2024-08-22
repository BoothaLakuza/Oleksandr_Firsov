import React, { useState, useEffect, useRef } from 'react';
import Skill from './Skill';
import Eater from './Eater';
import Line from './WaterLine'; // Import the Line component
import './SkillsContainer.css';

const SkillsContainer = ({children, style}) => {
  const skillSize = { width: 100, height: 50 }; // Size of each skill
  const containerRef = useRef(null); // Ref to the container

  // Manually define skills with specific names and IDs
  const initialSkills = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'React' },
    // Add more skills if needed
  ];

  const [skills, setSkills] = useState([]);
  const [eaterPosition, setEaterPosition] = useState({ x: 0, y: 0 });
  const [targetSkill, setTargetSkill] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Initialize skills with random positions within the container
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      console.log('Container Width:', containerWidth);
      console.log('Container Height:', containerHeight);

      const skillsWithPositions = initialSkills.map(skill => ({
        ...skill,
        x: Math.random() * (containerWidth - skillSize.width),
        y: Math.random() * (containerHeight - skillSize.height),
      }));

      setSkills(skillsWithPositions);
      setEaterPosition({
        x: containerWidth / 2 - 25, // Centering eater within the container
        y: containerHeight / 2 - 25,
      });
    }
  }, [containerRef.current]);

  // Function to check if a skill collides with any existing skills
  function checkCollision(newSkill, existingSkills) {
    for (const skill of existingSkills) {
      if (
        newSkill.x < skill.x + skillSize.width &&
        newSkill.x + skillSize.width > skill.x &&
        newSkill.y < skill.y + skillSize.height &&
        newSkill.y + skillSize.height > skill.y
      ) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  // Adjust skills to ensure they don't overlap on window resize
  function adjustSkillsOnResize() {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      setSkills(prevSkills => {
        const adjustedSkills = prevSkills.map(skill => ({
          ...skill,
          x: Math.min(skill.x, containerWidth - skillSize.width),
          y: Math.min(skill.y, containerHeight - skillSize.height),
        }));

        // Check and resolve overlaps
        let attempts = 0;
        while (attempts < 10) { // Retry up to 10 times to avoid infinite loop
          const hasOverlap = adjustedSkills.some((skill, index) => {
            return adjustedSkills.some((otherSkill, otherIndex) => {
              return index !== otherIndex && checkCollision(skill, [otherSkill]);
            });
          });

          if (!hasOverlap) break;

          adjustedSkills.forEach(skill => {
            if (attempts >= 10) return; // Exit if too many attempts
            let newSkill;
            do {
              newSkill = {
                ...skill,
                x: Math.random() * (containerWidth - skillSize.width),
                y: Math.random() * (containerHeight - skillSize.height),
              };
            } while (checkCollision(newSkill, adjustedSkills.filter(s => s.id !== skill.id)));
            skill.x = newSkill.x;
            skill.y = newSkill.y;
          });

          attempts++;
        }

        return adjustedSkills;
      });
    }
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      adjustSkillsOnResize();
      if (containerRef.current) {
        setEaterPosition(prevPosition => ({
          x: Math.min(prevPosition.x, containerRef.current.offsetWidth - 50),
          y: Math.min(prevPosition.y, containerRef.current.offsetHeight - 50)
        }));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef.current]);

  // Handle eater movement towards the target skill
  useEffect(() => {
    if (!targetSkill || isPaused) return;

    const moveEater = () => {
      if (containerRef.current) {
        const dx = targetSkill.x - eaterPosition.x;
        const dy = targetSkill.y - eaterPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          // Eater reached the skill
          setSkills(prevSkills => prevSkills.filter(skill => skill.id !== targetSkill.id));

          setIsPaused(true); // Pause the eater

          setTimeout(() => {
            // Respawn the skill after a random delay
            const respawnDelay = Math.random() * (8000 - 5000) + 5000;
            setTimeout(() => {
              let newSkill;
              do {
                newSkill = {
                  id: targetSkill.id,
                  name: targetSkill.name,
                  x: Math.random() * (containerRef.current.offsetWidth - skillSize.width),
                  y: Math.random() * (containerRef.current.offsetHeight - skillSize.height),
                };
              } while (checkCollision(newSkill, skills));

              setSkills(prevSkills => [...prevSkills, newSkill]);

              // Select a new random target that is different from the last one
              setTargetSkill(null); // Ensure no target is selected before pausing

              setTimeout(() => {
                setIsPaused(false); // Resume the eater
                selectNewTarget(newSkill.id); // Set new target after resuming
              }, 100); // Short delay to ensure skill is added to the list

            }, respawnDelay); // Random respawn delay

          }, 2000); // Pause for 2 seconds

          clearInterval(intervalRef.current); // Stop the movement until a new target is selected
        } else {
          const moveStep = 2;
          const moveX = (dx / distance) * moveStep;
          const moveY = (dy / distance) * moveStep;
          setEaterPosition(prev => ({ x: prev.x + moveX, y: prev.y + moveY }));
        }
      }
    };

    intervalRef.current = setInterval(moveEater, 20); // Move eater every 20ms

    return () => clearInterval(intervalRef.current);
  }, [eaterPosition, targetSkill, isPaused]);

  const selectNewTarget = (lastEatenSkillId = null) => {
    if (skills.length > 0) {
      const possibleTargets = skills.filter(skill => skill.id !== lastEatenSkillId);
      if (possibleTargets.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleTargets.length);
        setTargetSkill(possibleTargets[randomIndex]);
      }
    }
  };

  // Select the initial target when the component mounts
  useEffect(() => {
    selectNewTarget();
  }, [skills]);

  return (
    <div style={style} className="skills-container" ref={containerRef}>
      {skills.map(skill => (
        <React.Fragment key={skill.id}>
          <Skill
            skill={skill.name}
            position={{ x: skill.x, y: skill.y }}
          />
          <Line
            position={{ x: skill.x, y: skill.y }}
            size={skillSize}
            width={10} // Assuming line size is same as skill size
            height={2} // Set the height of the line here
          />
        </React.Fragment>
      ))}
      <Eater position={eaterPosition} />
    </div>
  );
};

export default SkillsContainer;
