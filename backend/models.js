const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  videoUrl: String,
  githubUrl: String,
  liveUrl: String
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: String,
  icon: String
});

const pricingSchema = new mongoose.Schema({
  title: String,
  price: String,
  currency: { type: String, default: '$' },
  description: String,
  features: [String],
  isPopular: Boolean
});

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: String
}, { timestamps: true });

module.exports = {
  Project: mongoose.model('Project', projectSchema),
  Skill: mongoose.model('Skill', skillSchema),
  Pricing: mongoose.model('Pricing', pricingSchema),
  Message: mongoose.model('Message', messageSchema)
};
