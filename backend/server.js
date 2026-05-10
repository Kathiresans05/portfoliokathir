const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Project, Skill, Pricing, Message, Settings } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('Cloudinary Config:', { 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing' 
});

const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- Projects ---
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});
app.post('/api/projects', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/projects/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// --- Skills ---
app.get('/api/skills', async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});
app.post('/api/skills', async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.json(skill);
});
app.delete('/api/skills/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/skills/:id', async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(skill);
});

// --- Pricing ---
app.get('/api/pricing', async (req, res) => {
  const pricing = await Pricing.find();
  res.json(pricing);
});
app.post('/api/pricing', async (req, res) => {
  const pricing = new Pricing(req.body);
  await pricing.save();
  res.json(pricing);
});
app.put('/api/pricing/:id', async (req, res) => {
  console.log('Update Pricing Body:', req.body);
  const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pricing);
});
app.delete('/api/pricing/:id', async (req, res) => {
  await Pricing.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Messages ---
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});
app.post('/api/messages', async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.json(message);
});
app.delete('/api/messages/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Settings ---
app.get('/api/settings/:key', async (req, res) => {
  const setting = await Settings.findOne({ key: req.params.key });
  res.json(setting || { value: '' });
});
app.post('/api/settings', async (req, res) => {
  const { key, value } = req.body;
  const setting = await Settings.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true }
  );
  res.json(setting);
});

// --- Cloudinary Upload ---
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: resourceType,
      folder: "portfolio"
    });
    
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
