import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="glass-morphism p-8 rounded-2xl border-cyber-border flex flex-col items-center justify-center space-y-2 group hover:border-cyber-primary transition-all duration-500"
  >
    <span className="text-4xl font-bold text-cyber-primary group-hover:neon-text transition-all">{value}</span>
    <span className="text-xs uppercase tracking-widest text-cyber-text/60 text-center">{label}</span>
  </motion.div>
);

const About = () => {
  const [aboutImage, setAboutImage] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop');
  const [stats, setStats] = useState({
    years: '4+',
    projects: '50+',
    clients: '30+',
    coffee: '1.2k'
  });

  useEffect(() => {
    // Fetch About Image
    fetch('http://localhost:5000/api/settings/portfolio_about_img')
      .then(res => res.json())
      .then(data => {
        if (data.value) setAboutImage(data.value);
      })
      .catch(err => console.error(err));

    // Fetch Stats
    fetch('http://localhost:5000/api/settings/portfolio_stats')
      .then(res => res.json())
      .then(data => {
        if (data.value) setStats(JSON.parse(data.value));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="about" className="min-h-screen section-padding flex flex-col">
      <div className="max-w-6xl mx-auto w-full space-y-24">
        
        {/* Main Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-cyber-secondary font-mono tracking-tighter uppercase">01 // ABOUT ME</h3>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Building Modern & <br /><span className="text-cyber-primary">Powerful Websites</span>
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-cyber-text/80 leading-relaxed font-light">
              I am a Full Stack Developer specializing in the MERN stack, with a passion for creating 
              visually stunning and highly interactive web applications. My approach combines 
              technical precision with artistic vision to deliver premium digital solutions.
            </p>
            
            <p className="text-cyber-text/60 leading-relaxed italic border-l-2 border-cyber-accent pl-6">
              "The best way to predict the future is to build it, line by line, pixel by pixel."
            </p>

            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Years Experience" value={stats.years} delay={0.2} />
              <StatCard label="Projects Completed" value={stats.projects} delay={0.4} />
              <StatCard label="Happy Clients" value={stats.clients} delay={0.6} />
              <StatCard label="Cups of Coffee" value={stats.coffee} delay={0.8} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative group hidden md:block"
          >
            <div className="absolute inset-0 bg-cyber-primary/20 blur-3xl rounded-full group-hover:bg-cyber-primary/40 transition-all duration-700" />
            <div className="relative glass-morphism aspect-square rounded-3xl overflow-hidden border-cyber-border">
              <img 
                src={aboutImage}
                alt="Kathiresan - Profile" 
                className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-500"
              /> <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-60" />
               
               {/* Floating HUD elements */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-6 left-6 p-3 border border-cyber-primary/30 rounded-lg backdrop-blur-md"
               >
                 <div className="w-6 h-1 bg-cyber-primary mb-1" />
                 <div className="w-10 h-1 bg-cyber-secondary opacity-50" />
               </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Content Section added for standalone page */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
              <span className="w-8 h-[2px] bg-cyber-primary"></span>
              Core Philosophy
            </h3>
            <p className="text-white/60 leading-relaxed">
              I believe that a truly premium web experience goes beyond just functional code. It requires an obsessive attention to detail regarding user interaction, performance optimization, and fluid animations. Every application I build is treated as a digital product designed to leave a lasting impression on the user.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
              <span className="w-8 h-[2px] bg-cyber-secondary"></span>
              Technical Approach
            </h3>
            <p className="text-white/60 leading-relaxed">
              My architecture is built on the foundation of the modern MERN stack. I leverage React and Framer Motion for cinematic, state-driven interfaces. On the backend, I design highly scalable, secure, and robust RESTful APIs using Node.js and Express, connected to efficient MongoDB architectures capable of handling complex data relationships.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
