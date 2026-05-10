import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Code, Globe, Terminal, Smartphone, Flame, Layers, Paintbrush, Server, Cpu, Layout, Box, Cloud, Monitor, Settings } from 'lucide-react';

const iconMap = {
  Database, Code, Globe, Terminal, Smartphone, Flame, Layers, Paintbrush, Server, Cpu, Layout, Box, Cloud, Monitor, Settings
};

const SkillCard = ({ name, icon, index }) => {
  const IconComponent = iconMap[icon] || Code;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="flex flex-col items-center justify-center p-7 rounded-[24px] bg-white/[0.03] border border-white/5 hover:border-cyber-primary/30 transition-all duration-500 group aspect-square relative"
    >
      <div className="text-cyber-primary mb-4 group-hover:scale-110 transition-transform duration-500">
        <IconComponent size={40} strokeWidth={1.5} />
      </div>
      <h4 className="text-white font-medium text-base tracking-tight text-center">{name}</h4>
      
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 bg-cyber-primary/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity rounded-full pointer-events-none" />
    </motion.div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="skills" className="min-h-screen section-padding bg-transparent flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tight"
          >
            My <span className="text-white/20">Skills</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.length === 0 ? (
            <div className="col-span-full text-center text-white/40 font-mono uppercase tracking-widest py-20">Initializing Stack...</div>
          ) : (
            skills.map((skill, index) => (
              <SkillCard key={skill._id || index} {...skill} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
