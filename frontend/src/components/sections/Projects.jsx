import React, { useState, useEffect } from 'react';
import API_BASE from '../../api';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ title, category = 'PROJECT', description, thumbnail, githubUrl, liveUrl, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl glass-morphism border-cyber-border aspect-square md:aspect-auto md:h-[500px] hover:border-cyber-primary/50 transition-all duration-500 shadow-[0_0_0_rgba(0,243,255,0)] hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]"
    >
      {/* Glitchy Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-secondary to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
      {/* Background Image Placeholder with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-cyber-accent/10 mix-blend-overlay group-hover:bg-cyber-primary/20 transition-all duration-700" />
      
      {/* Visual content area */}
      <div className="absolute inset-0">
        <img 
          src={thumbnail || "/project1.png"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full border border-cyber-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-[2px]"
          >
            <span className="text-5xl md:text-8xl font-black text-cyber-primary/5 select-none">{index + 1}</span>
          </motion.div>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
        <span className="text-[8px] md:text-xs font-mono text-cyber-primary tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2 block">{category}</span>
        <h3 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-3 group-hover:text-cyber-primary transition-colors duration-300 line-clamp-1">{title}</h3>
        
        <p className="text-white/60 md:text-white/70 text-[10px] md:text-sm mb-3 md:mb-6 line-clamp-2 md:line-clamp-3">
          {description}
        </p>

        <div className="flex gap-2 md:gap-4">
          <a href={githubUrl || '#'} target="_blank" rel="noreferrer" className="p-2 md:p-3 bg-white/10 hover:bg-cyber-primary hover:text-black rounded-full transition-all">
            <Github className="w-3 h-3 md:w-5 md:h-5" />
          </a>
          <a href={liveUrl || '#'} target="_blank" rel="noreferrer" className="p-2 md:p-3 bg-white/10 hover:bg-cyber-secondary hover:text-white rounded-full transition-all">
            <ExternalLink className="w-3 h-3 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects" className="min-h-screen section-padding">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 md:space-y-4">

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Recent <span className="text-cyber-secondary">Projects</span></h2>
          </div>
          <div className="pb-2">
            <a href="#" className="text-white/60 hover:text-cyber-primary font-mono text-xs md:text-sm tracking-widest transition-colors flex items-center gap-2">
              VIEW_ALL_REPOSITORIES <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-white/40 text-center py-20">No projects added yet. Add them in the Admin Dashboard.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project._id || index} {...project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
