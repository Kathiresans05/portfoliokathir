const mongoose = require('mongoose');
const { Project, Skill, Pricing } = require('./models');
require('dotenv').config();

const demoProjects = [
  {
    title: "Cyberpunk E-Commerce",
    description: "A high-performance e-commerce platform built with the MERN stack featuring real-time inventory and a futuristic dark mode UI.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    title: "AI Interior Design Tool",
    description: "Real-time AI rendering and drag-and-drop interfaces for interior designers to visualize spaces before building.",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    title: "Crypto Dashboard",
    description: "Live cryptocurrency tracking dashboard with WebSockets, Framer Motion animations, and advanced chart.js visualizations.",
    thumbnail: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002",
    videoUrl: "",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    title: "Temple Management System",
    description: "A comprehensive platform for administration, including donations, gallery management, and event scheduling.",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070",
    videoUrl: "",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

const demoSkills = [
  { name: 'MongoDB', icon: 'Database' },
  { name: 'Express.js', icon: 'Code' },
  { name: 'React.js', icon: 'Globe' },
  { name: 'Node.js', icon: 'Terminal' },
  { name: 'React Native', icon: 'Smartphone' },
  { name: 'Next.js', icon: 'Layers' },
  { name: 'Tailwind CSS', icon: 'Paintbrush' },
  { name: 'Cloud Architecture', icon: 'Cloud' }
];

const demoPricing = [
  { title: "Starter", price: "999", description: "Perfect for small businesses.", isPopular: false, features: ["Responsive Static Website", "Up to 5 Pages", "Basic SEO Setup"] },
  { title: "Professional", price: "2499", description: "Ideal for growing companies.", isPopular: true, features: ["Dynamic Web Application", "Unlimited Pages", "API Integrations", "CMS / Admin Dashboard"] },
  { title: "Enterprise", price: "4999", description: "Full-scale custom solutions.", isPopular: false, features: ["Full-Stack Application", "Cloud Architecture", "Complex Integrations", "E-commerce Functionality"] }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Pricing.deleteMany({});
    
    await Project.insertMany(demoProjects);
    await Skill.insertMany(demoSkills);
    await Pricing.insertMany(demoPricing);
    
    console.log('Successfully seeded projects, skills, and pricing!');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
