import React from 'react';
import './ProjectCardVideo.css'; // Import the CSS file for styling

function ProjectCardVideo({ src, link, h3, p }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="project-card">
      <div className="video-container">
        <video 
          className="video-player" 
          src={src} 
          alt={`${h3} video`} 
          controls
          // loop 
          // muted 
          // autoPlay 
        />
        <div className="circle-mask"></div>
      </div>
      <h3>{h3}</h3>
      <p>{p}</p>
    </a>
  );
}

export default ProjectCardVideo;
