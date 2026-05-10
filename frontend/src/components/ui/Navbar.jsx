import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = ['Home', 'About', 'Skills', 'Gallery', 'Projects', 'Pricing'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#020205]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/50' 
            : 'py-6 bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-[110] cursor-pointer">
          <div className="flex items-center gap-2">
            <img src="/logo1.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <div className="text-xl md:text-2xl font-black tracking-tighter">
              <span className="text-cyber-primary">KATHIRESAN</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-12">
          {navItems.map((item, i) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}
              >
                <Link
                  to={path}
                  className={`group relative text-[11px] font-mono tracking-[0.35em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-cyber-primary' : 'text-white/60 hover:text-cyber-primary'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-cyber-primary transition-all duration-400 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 relative z-[110]">
          {/* CTA Button (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-block"
          >
            <Link
              to="/contact"
              className="interactive block px-7 py-3 bg-cyber-primary text-black font-black text-[10px] tracking-[0.25em] uppercase rounded-full hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300"
            >
              HIRE ME ⚡
            </Link>
          </motion.div>


          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 hover:text-cyber-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-[#020205] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navItems.map((item, i) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-black tracking-widest uppercase transition-colors ${
                        isActive ? 'text-cyber-primary' : 'text-white hover:text-cyber-primary'
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (navItems.length * 0.1) }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-block mt-8 px-12 py-4 bg-cyber-primary text-black font-black tracking-[0.2em] uppercase rounded-full"
                  >
                    HIRE ME ⚡
                  </Link>
                </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
