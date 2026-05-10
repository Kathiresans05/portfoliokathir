import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ year, title, company, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group flex flex-col md:flex-row gap-4 md:gap-16 py-12 border-b border-white/10 hover:border-cyber-primary/50 transition-colors duration-500"
    >
      <div className="md:w-1/4 shrink-0 pt-1">
        <span className="text-cyber-primary font-mono text-sm tracking-[0.2em]">{year}</span>
      </div>
      
      <div className="md:w-3/4 space-y-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyber-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase mt-2">
            {company}
          </p>
        </div>
        <p className="text-white/60 leading-relaxed text-base max-w-3xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const data = [
    {
      year: "2023 - PRESENT",
      title: "Senior Full Stack Engineer",
      company: "NEOTECH SYSTEMS",
      description: "Leading the development of cloud-native applications and mentoring junior developers in MERN stack best practices."
    },
    {
      year: "2021 - 2023",
      title: "MERN Developer",
      company: "DIGITAL FRONTIER",
      description: "Built scalable e-commerce solutions and integrated complex payment gateways with real-time inventory tracking."
    },
    {
      year: "2020 - 2021",
      title: "Junior Web Developer",
      company: "CYBER CORE",
      description: "Developed interactive UI components and optimized frontend performance for high-traffic media sites."
    }
  ];

  return (
    <section id="experience" className="min-h-screen section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Professional <span className="text-cyber-primary">Journey</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            A chronological look at my career path and the companies I've helped grow.
          </p>
        </motion.div>

        <div className="flex flex-col border-t border-white/10">
          {data.map((item, index) => (
            <ExperienceItem key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
