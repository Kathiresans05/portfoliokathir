import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="home" className="w-full flex flex-col items-center relative overflow-hidden px-4 md:px-10 pt-32 pb-20">
      <motion.div
        style={{ y: y1, opacity }}
        className="text-center z-10 max-w-4xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 bg-cyber-primary/50" />
          <h2 className="text-cyber-primary text-sm md:text-base font-mono tracking-[0.3em] uppercase">
            Hello, I am
          </h2>
          <div className="h-[1px] w-12 bg-cyber-primary/50" />
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-[8rem] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-[#b055ff] to-cyber-accent relative z-10 drop-shadow-[0_0_30px_rgba(0,243,255,0.3)] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Kathiresan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-10"
        >
          <div className="inline-block border border-cyber-primary/60 text-cyber-primary font-mono text-xs md:text-sm tracking-[0.25em] px-6 py-3 rounded-full bg-cyber-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.1)]">
            FULL STACK MERN DEVELOPER
          </div>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#e2e8f0] mb-8 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="whitespace-nowrap">Building the <span className="text-cyber-primary">Future</span> of the</span>
          <br />
          Web.
        </motion.h2>

        <motion.p 
          className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          I develop modern Websites, Web Applications, and Mobile Applications with surgical precision and cinematic user experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <a href="#projects" className="interactive px-8 py-4 bg-cyber-primary text-black font-mono tracking-[0.15em] uppercase text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="interactive px-8 py-4 bg-transparent text-white border border-white/20 font-mono tracking-[0.15em] uppercase text-sm hover:border-white hover:bg-white/5 transition-all">
            HIRE ME
          </a>
        </motion.div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono text-white/30 tracking-[0.5em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
