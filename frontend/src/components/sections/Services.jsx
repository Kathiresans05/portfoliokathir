import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Layout } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
      className="interactive relative group glass-morphism p-10 rounded-3xl border-cyber-border overflow-hidden perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Hologram Effect Layer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyber-primary shadow-[0_0_15px_#00f3ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      <div className="relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyber-bg border border-cyber-primary/30 flex items-center justify-center group-hover:neon-border transition-all duration-500">
           <Icon className="w-8 h-8 text-cyber-primary group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyber-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-cyber-text/60 leading-relaxed group-hover:text-cyber-text/80 transition-colors">
          {description}
        </p>

        <div className="pt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-cyber-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
          <span>INITIALIZING_INTERFACE</span>
          <div className="w-1 h-1 bg-cyber-secondary animate-ping" />
        </div>
      </div>

      {/* Decorative scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Website Development",
      icon: Layout,
      description: "High-performance, responsive websites built with modern frameworks to ensure a premium user experience and seamless navigation."
    },
    {
      title: "Web App Development",
      icon: Globe,
      description: "Complex, scalable web applications powered by the MERN stack, featuring real-time data processing and advanced state management."
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Native-quality mobile experiences for iOS and Android using React Native, designed with performance and aesthetics in mind."
    }
  ];

  return (
    <section id="services" className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h3 className="text-cyber-accent font-mono tracking-widest uppercase">03 // SOLUTIONS</h3>
          <h2 className="text-5xl font-bold tracking-tight neon-text-pink">Strategic Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
