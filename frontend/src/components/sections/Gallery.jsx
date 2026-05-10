import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Gallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      const withVideos = parsed.filter(p => p.videoUrl);
      setVideos(withVideos);
    }
  }, []);

  return (
    <section id="gallery" className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-cyber-accent font-mono tracking-widest uppercase">PORTFOLIO</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Project <span className="text-cyber-primary">Gallery</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Watch interactive demos of my recent builds and platform developments.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center text-white/40 py-20">No videos uploaded yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyber-primary/50 transition-colors bg-[#0f1115]"
              >
                <div className="aspect-video relative bg-black">
                  <video 
                    src={video.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-primary transition-colors mb-2">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
