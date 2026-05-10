import React, { useState, useEffect } from 'react';
import API_BASE from '../../api';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Crown } from 'lucide-react';

const PricingCard = ({ title, price, currency, description, features, isPopular, index }) => {
  const Icon = index === 0 ? Zap : index === 1 ? Crown : Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group rounded-3xl p-8 transition-all duration-500 ${
        isPopular 
          ? 'bg-cyber-primary/10 border-2 border-cyber-primary shadow-[0_0_40px_rgba(0,243,255,0.1)]' 
          : 'bg-white/5 border border-white/10 hover:border-white/20'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.5)]">
          Most Popular
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-white/5 text-cyber-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white">{currency || '$'}{price}</span>
          <span className="text-white/40 text-sm font-mono uppercase tracking-widest">/ Project</span>
        </div>

        <div className="space-y-4 pt-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 group/item">
              <div className="w-5 h-5 rounded-full bg-cyber-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-cyber-primary/20 transition-colors">
                <Check size={12} className="text-cyber-primary" />
              </div>
              <span className="text-sm text-white/70 group-hover/item:text-white transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 mt-4 ${
          isPopular
            ? 'bg-cyber-primary text-black hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}>
          Select Plan
        </button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/pricing`)
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="pricing" className="min-h-screen section-padding bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tight"
          >
            Service <span className="text-cyber-primary">Plans</span>
          </motion.h2>
          <p className="text-white/40 max-w-2xl font-mono text-xs md:text-sm uppercase tracking-widest"> Transparent pricing for all types of web development projects. </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan._id || index} {...plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
