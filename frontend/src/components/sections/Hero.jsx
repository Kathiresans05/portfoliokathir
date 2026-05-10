import React, { useState, useEffect } from 'react';
import API_BASE from '../../api';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Custom Icons to avoid lucide-react versioning/export errors
const CustomGithub = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const CustomLinkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Hero = () => {
  const [aboutImage, setAboutImage] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop');

  useEffect(() => {
    fetch(`${API_BASE}/settings/portfolio_about_img`)
      .then(res => res.json())
      .then(data => {
        if (data.value) setAboutImage(data.value);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="home" className="min-h-[75vh] flex flex-col items-center justify-center relative overflow-hidden px-6 pt-16 pb-12">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-cyber-primary/10 blur-[150px] rounded-full opacity-50 pointer-events-none" />
      
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
        
        {/* Text Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-4 text-cyber-primary font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase"
          >
            <div className="w-8 h-[1px] bg-cyber-primary/30" />
            <span>Hello, I am</span>
            <div className="w-8 h-[1px] bg-cyber-primary/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.8]"
          >
            KATHI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">RESAN</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block"
          >
            <div className="border border-cyber-primary/60 text-cyber-primary font-mono text-[10px] md:text-xs tracking-[0.3em] px-6 py-2 rounded-full bg-cyber-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.1)] uppercase">
              Full Stack MERN Developer
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#e2e8f0] leading-[1.1]"
          >
            Building the <span className="text-cyber-primary">Future</span> of the Web.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            I develop modern Websites, Web Applications, and Mobile Applications with surgical precision and cinematic user experiences.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <a href="#projects" className="group px-10 py-5 bg-cyber-primary text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_40px_rgba(0,243,255,0.4)] transition-all flex items-center gap-3">
            View My Work <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
          
          <div className="flex items-center gap-4">
            <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-cyber-primary hover:border-cyber-primary/50 transition-all">
              <CustomGithub size={24} />
            </a>
            <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-cyber-secondary hover:border-cyber-secondary/50 transition-all">
              <CustomLinkedin size={24} />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </section>
  );
};

export default Hero;
