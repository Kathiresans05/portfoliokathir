import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please check if backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen section-padding bg-transparent relative flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
        
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">Get In <br/> <span className="text-white/20">Touch</span></h2>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-primary group-hover:bg-cyber-primary group-hover:text-black transition-all duration-500">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Email Me</p>
                <p className="text-white font-bold text-lg">hello@kathiresan.dev</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-primary group-hover:bg-cyber-primary group-hover:text-black transition-all duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Location</p>
                <p className="text-white font-bold text-lg">Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-cyber-primary/20 via-transparent to-cyber-secondary/20 blur-2xl opacity-20" />
          
          <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[400px] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-cyber-primary/10 flex items-center justify-center text-cyber-primary">
                  <CheckCircle size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm font-mono uppercase tracking-widest leading-relaxed">Thank you for your message. <br/> I will get back to you very soon.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-cyber-primary font-mono text-xs uppercase tracking-widest hover:underline"
                >
                  Send Another Message_
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] ml-2">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyber-primary transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] ml-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyber-primary transition-colors"
                      placeholder="contact@mail.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] ml-2">Subject_</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyber-primary transition-colors"
                    placeholder="Message Subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] ml-2">Message_</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyber-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyber-primary text-black font-black py-5 rounded-xl uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
