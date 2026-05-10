import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Scene from './components/3d/Scene';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Pricing from './components/sections/Pricing';
import Gallery from './components/sections/Gallery';
import Admin from './components/sections/Admin';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#020205] flex flex-col items-center justify-center space-y-8"
    >
      <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute h-full bg-cyber-primary shadow-[0_0_15px_#00f3ff]"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-white font-mono text-xs tracking-[0.5em] uppercase animate-pulse">
          INITIALIZING_SYSTEM_CORE
        </h1>
        <p className="text-cyber-primary font-mono text-[10px]">{progress}%</p>
      </div>
    </motion.div>
  );
};

// ScrollToTop component to ensure we start at the top when navigating to a new page
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Gallery />
    <Projects />
    <Pricing />
    <Contact />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative bg-[#020205] text-white selection:bg-cyber-primary selection:text-black min-h-screen flex flex-col">
      <ScrollToTop />
      
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex flex-col"
        >
          <Navbar />
          <Scene />
          
          <div className="relative z-10 pt-20 flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </AnimatePresence>
          </div>
          
          <Footer />
        </motion.div>
      )}
    </main>
  );
}

export default App;
