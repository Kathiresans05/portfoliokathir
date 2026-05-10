import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Image, Code, FolderOpen, DollarSign, MessageSquare, Trash2, Plus, Save, Video, UploadCloud, Loader, Edit } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const availableIcons = ['Code', 'Database', 'Globe', 'Terminal', 'Smartphone', 'Flame', 'Layers', 'Paintbrush', 'Server', 'Cpu', 'Layout', 'Box', 'Cloud', 'Monitor', 'Settings'];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // State
  const [aboutImage, setAboutImage] = useState('');
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    years: '4+',
    projects: '50+',
    clients: '30+',
    coffee: '1.2k'
  });

  // Form States
  const [newProject, setNewProject] = useState({ title: '', description: '', thumbnail: '', videoUrl: '', githubUrl: '', liveUrl: '' });
  const [newSkill, setNewSkill] = useState({ name: '', icon: 'Code' });
  const [newPricing, setNewPricing] = useState({ title: '', price: '', currency: '$', description: '', features: '', isPopular: false });

  // Upload States
  const [isUploadingVid, setIsUploadingVid] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);

  const [editingPricingId, setEditingPricingId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, skillRes, priceRes, msgRes] = await Promise.all([
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/skills`),
        fetch(`${API_BASE}/pricing`),
        fetch(`${API_BASE}/messages`)
      ]);

      const [projData, skillData, priceData, msgData] = await Promise.all([
        projRes.json(),
        skillRes.json(),
        priceRes.json(),
        msgRes.json()
      ]);

      setProjects(projData);
      setSkills(skillData);
      setPricing(priceData);
      setMessages(msgData);
      
      // Fetch Settings
      const [settingAboutRes, settingStatsRes] = await Promise.all([
        fetch(`${API_BASE}/settings/portfolio_about_img`),
        fetch(`${API_BASE}/settings/portfolio_stats`)
      ]);
      
      const [settingAboutData, settingStatsData] = await Promise.all([
        settingAboutRes.json(),
        settingStatsRes.json()
      ]);

      setAboutImage(settingAboutData.value || '');
      if (settingStatsData.value) {
        setStats(JSON.parse(settingStatsData.value));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSaveAbout = async () => {
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'portfolio_about_img', value: aboutImage })
      });
      alert('About image saved!');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleSaveStats = async () => {
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'portfolio_stats', value: JSON.stringify(stats) })
      });
      alert('Stats updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const uploadToBackend = async (file, setUrlState, setLoadingState) => {
    setLoadingState(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setUrlState(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed check console');
    } finally {
      setLoadingState(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProjectId) {
        const res = await fetch(`${API_BASE}/projects/${editingProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        });
        const updated = await res.json();
        setProjects(projects.map(p => p._id === editingProjectId ? updated : p));
        setEditingProjectId(null);
        alert('Project updated successfully!');
      } else {
        const res = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        });
        const saved = await res.json();
        setProjects([saved, ...projects]);
        alert('Project added successfully!');
      }
      setNewProject({ title: '', description: '', thumbnail: '', videoUrl: '', githubUrl: '', liveUrl: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to save project');
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project._id);
    setNewProject({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      videoUrl: project.videoUrl,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl
    });
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
      alert('Project deleted');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkillId) {
        const res = await fetch(`${API_BASE}/skills/${editingSkillId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSkill)
        });
        const updated = await res.json();
        setSkills(skills.map(s => s._id === editingSkillId ? updated : s));
        setEditingSkillId(null);
        alert('Skill updated!');
      } else {
        const res = await fetch(`${API_BASE}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSkill)
        });
        const saved = await res.json();
        setSkills([...skills, saved]);
        alert('Skill added!');
      }
      setNewSkill({ name: '', icon: 'Code' });
    } catch (err) {
      console.error(err);
      alert('Failed to save skill');
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkillId(skill._id);
    setNewSkill({ name: skill.name, icon: skill.icon });
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE' });
      setSkills(skills.filter(s => s._id !== id));
      alert('Skill deleted');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleAddPricing = async (e) => {
    e.preventDefault();
    const featureArray = typeof newPricing.features === 'string' 
      ? newPricing.features.split(',').map(f => f.trim())
      : newPricing.features;
    
    const payload = { ...newPricing, features: featureArray };

    try {
      if (editingPricingId) {
        const res = await fetch(`${API_BASE}/pricing/${editingPricingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const updated = await res.json();
        setPricing(pricing.map(p => p._id === editingPricingId ? updated : p));
        setEditingPricingId(null);
        alert('Pricing plan updated!');
      } else {
        const res = await fetch(`${API_BASE}/pricing`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const saved = await res.json();
        setPricing([...pricing, saved]);
        alert('Pricing plan added!');
      }
      setNewPricing({ title: '', price: '', currency: '$', description: '', features: '', isPopular: false });
    } catch (err) {
      console.error(err);
      alert('Failed to save pricing');
    }
  };

  const handleEditPricing = (plan) => {
    setEditingPricingId(plan._id);
    setNewPricing({
      title: plan.title,
      price: plan.price,
      description: plan.description,
      features: plan.features.join(', '),
      isPopular: plan.isPopular,
      currency: plan.currency || '$'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePricing = async (id) => {
    if (!confirm('Delete this pricing plan?')) return;
    try {
      await fetch(`${API_BASE}/pricing/${id}`, { method: 'DELETE' });
      setPricing(pricing.filter(p => p._id !== id));
      alert('Pricing plan deleted');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`${API_BASE}/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m._id !== id));
      alert('Message deleted');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const tabs = [
    { id: 'projects', icon: FolderOpen, label: 'My Portfolio' },
    { id: 'about', icon: Image, label: 'Profile Photo' },
    { id: 'skills', icon: Code, label: 'My Skills' },
    {id: 'pricing', icon: DollarSign, label: 'Service Plans' },
    { id: 'stats', icon: Settings, label: 'My Stats' },
    { id: 'messages', icon: MessageSquare, label: 'Client Messages' },
  ];

  return (
    <section className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <h2 className="text-2xl font-bold text-white mb-6 flex flex-col gap-1 px-4">
          <div className="flex items-center gap-2">
            <Settings className="text-cyber-primary" /> 
            <span>Dashboard</span>
          </div>
          <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Manage Your Site</span>
        </h2>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-cyber-primary text-black font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon size={20} />
              {tab.label}
              {tab.id === 'messages' && messages.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#0f1115] border border-white/10 rounded-3xl p-6 md:p-8 min-h-[600px]">
        <AnimatePresence mode="wait">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">My Portfolio</h3>
                <p className="text-white/40 text-sm mt-1">Add or edit projects that show up on your main website.</p>
              </div>
              
              <form onSubmit={handleAddProject} className="space-y-4 bg-black/30 p-6 rounded-2xl border border-white/5">
                <p className="text-cyber-primary text-xs font-mono uppercase tracking-wider mb-2">Project Details</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  
                  {/* Thumbnail Upload */}
                  <div className="flex gap-2 relative">
                    <input type="url" required placeholder="Thumbnail Image URL" value={newProject.thumbnail} onChange={e => setNewProject({...newProject, thumbnail: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 p-2 rounded-xl flex items-center justify-center border border-white/10">
                      {isUploadingImg ? <Loader className="animate-spin text-cyber-primary" size={20} /> : <UploadCloud size={20} className="text-white" />}
                      <input type="file" accept="image/*" className="hidden" onChange={e => uploadToBackend(e.target.files[0], (url) => setNewProject({...newProject, thumbnail: url}), setIsUploadingImg)} />
                    </label>
                  </div>

                  {/* Video Upload */}
                  <div className="flex gap-2 relative">
                    <input type="url" placeholder="Video Demo URL" value={newProject.videoUrl} onChange={e => setNewProject({...newProject, videoUrl: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 p-2 rounded-xl flex items-center justify-center border border-white/10">
                      {isUploadingVid ? <Loader className="animate-spin text-cyber-primary" size={20} /> : <Video size={20} className="text-white" />}
                      <input type="file" accept="video/*" className="hidden" onChange={e => uploadToBackend(e.target.files[0], (url) => setNewProject({...newProject, videoUrl: url}), setIsUploadingVid)} />
                    </label>
                  </div>

                  <input type="url" placeholder="GitHub Link" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  <input type="url" placeholder="Live Host Link" value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} className="col-span-2 md:col-span-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                </div>
                <textarea required placeholder="Project Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white h-20" />
                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-2 bg-cyber-primary text-black font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center gap-2">
                    {editingProjectId ? <><Save size={18} /> Update Project</> : <><Plus size={18} /> Add Project</>}
                  </button>
                  {editingProjectId && (
                    <button type="button" onClick={() => { setEditingProjectId(null); setNewProject({ title: '', description: '', thumbnail: '', videoUrl: '', githubUrl: '', liveUrl: '' }); }} className="px-6 py-2 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20">
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 gap-4">
                    <div className="flex items-center gap-4">
                      {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="w-20 h-14 object-cover rounded-md" />}
                      <div>
                        <p className="font-bold text-white flex items-center gap-2">{p.title} {p.videoUrl && <Video size={14} className="text-cyber-primary" />}</p>
                        <p className="text-xs text-white/40 max-w-sm truncate">{p.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProject(p)} className="text-cyber-primary p-2 hover:bg-cyber-primary/20 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteProject(p._id)} className="text-red-500 p-2 hover:bg-red-500/20 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">Profile Photo</h3>
                <p className="text-white/40 text-sm mt-1">Update the main photo used in your "About Me" section.</p>
              </div>
              <div className="space-y-4">
                <label className="text-white/60 text-sm">Upload your photo or paste an image link</label>
                <div className="flex gap-4">
                  <input type="url" value={aboutImage} onChange={e => setAboutImage(e.target.value)} placeholder="https://..." className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  
                  <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 rounded-xl flex items-center justify-center border border-white/10 gap-2">
                    {isUploadingAbout ? <Loader className="animate-spin text-cyber-primary" size={20} /> : <UploadCloud size={20} className="text-white" />}
                    <span className="text-white text-sm hidden sm:block">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => uploadToBackend(e.target.files[0], setAboutImage, setIsUploadingAbout)} />
                  </label>

                  <button onClick={handleSaveAbout} className="px-6 py-2 bg-cyber-primary text-black font-bold rounded-lg flex items-center gap-2"><Save size={18} /> Save</button>
                </div>
                {aboutImage && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl inline-block border border-white/10">
                    <img src={aboutImage} alt="Preview" className="h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">My Expertise</h3>
                <p className="text-white/40 text-sm mt-1">List the technologies and tools you are proficient in.</p>
              </div>
              <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-4 bg-black/30 p-6 rounded-2xl border border-white/5">
                <input type="text" required placeholder="Skill Name (e.g. React.js)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                <select value={newSkill.icon} onChange={e => setNewSkill({...newSkill, icon: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white">
                  {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
                <button type="submit" className="px-6 py-2 bg-cyber-primary text-black font-bold rounded-lg">
                  {editingSkillId ? 'Update Skill' : 'Add Skill'}
                </button>
                {editingSkillId && (
                  <button type="button" onClick={() => { setEditingSkillId(null); setNewSkill({ name: '', icon: 'Code' }); }} className="px-6 py-2 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20">
                    Cancel
                  </button>
                )}
              </form>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map(s => (
                  <div key={s._id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-white">{s.name}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditSkill(s)} className="text-cyber-primary p-1 hover:bg-cyber-primary/20 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteSkill(s._id)} className="text-red-500 p-1 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">Service Plans</h3>
                <p className="text-white/40 text-sm mt-1">Manage the different pricing tiers and services you offer.</p>
              </div>
              <form onSubmit={handleAddPricing} className="space-y-4 bg-black/30 p-6 rounded-2xl border border-white/5">
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" required placeholder="Plan Title" value={newPricing.title} onChange={e => setNewPricing({...newPricing, title: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  <div className="flex gap-2">
                    <select value={newPricing.currency} onChange={e => setNewPricing({...newPricing, currency: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-2 py-2 text-white w-20">
                      <option value="$">$ USD</option>
                      <option value="₹">₹ INR</option>
                    </select>
                    <input type="number" required placeholder="Price" value={newPricing.price} onChange={e => setNewPricing({...newPricing, price: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isPopular" checked={newPricing.isPopular} onChange={e => setNewPricing({...newPricing, isPopular: e.target.checked})} className="w-5 h-5 accent-cyber-primary" />
                    <label htmlFor="isPopular" className="text-white text-sm">Most Popular</label>
                  </div>
                  <input type="text" required placeholder="Short Description" value={newPricing.description} onChange={e => setNewPricing({...newPricing, description: e.target.value})} className="col-span-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  <input type="text" required placeholder="Features (comma separated)" value={newPricing.features} onChange={e => setNewPricing({...newPricing, features: e.target.value})} className="col-span-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-2 bg-cyber-primary text-black font-bold rounded-lg">
                    {editingPricingId ? 'Update Plan' : 'Add Plan'}
                  </button>
                  {editingPricingId && (
                    <button type="button" onClick={() => { setEditingPricingId(null); setNewPricing({ title: '', price: '', description: '', features: '', isPopular: false }); }} className="px-6 py-2 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20">
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="grid md:grid-cols-2 gap-4">
                {pricing.map(p => (
                  <div key={p._id} className="p-4 bg-white/5 rounded-xl border border-white/5 relative">
                    {p.isPopular && <span className="absolute top-2 right-2 text-[10px] bg-cyber-primary text-black px-2 py-1 rounded">POPULAR</span>}
                    <h4 className="font-bold text-white text-xl">{p.title} - {p.currency || '$'}{p.price}</h4>
                    <p className="text-sm text-white/50 mb-2">{p.description}</p>
                    <ul className="text-xs text-white/70 space-y-1 mb-4">
                      {p.features.map((f, i) => <li key={i}>• {f}</li>)}
                    </ul>
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => handleEditPricing(p)} className="text-cyber-primary text-sm flex items-center gap-1 hover:text-cyber-primary/80"><Edit size={14} /> Edit</button>
                      <button onClick={() => handleDeletePricing(p._id)} className="text-red-500 text-sm flex items-center gap-1 hover:text-red-400"><Trash2 size={14} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">Experience Stats</h3>
                <p className="text-white/40 text-sm mt-1">Manage the numbers shown in your Experience/About section.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 bg-black/30 p-8 rounded-2xl border border-white/5">
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-mono uppercase tracking-widest">Years of Experience</label>
                  <input type="text" value={stats.years} onChange={e => setStats({...stats, years: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-cyber-primary font-bold text-xl" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-mono uppercase tracking-widest">Projects Completed</label>
                  <input type="text" value={stats.projects} onChange={e => setStats({...stats, projects: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-cyber-primary font-bold text-xl" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-mono uppercase tracking-widest">Happy Clients</label>
                  <input type="text" value={stats.clients} onChange={e => setStats({...stats, clients: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-cyber-primary font-bold text-xl" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-mono uppercase tracking-widest">Cups of Coffee</label>
                  <input type="text" value={stats.coffee} onChange={e => setStats({...stats, coffee: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-cyber-primary font-bold text-xl" />
                </div>

                <div className="col-span-full pt-4">
                  <button onClick={handleSaveStats} className="w-full md:w-auto px-10 py-3 bg-cyber-primary text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2">
                    <Save size={20} /> Update All Stats
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white">Client Enquiries</h3>
                <p className="text-white/40 text-sm mt-1">Read and manage messages sent by potential clients from your website.</p>
              </div>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-white/40">No messages yet.</p>
                ) : (
                  messages.map(m => (
                    <div key={m._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
                      <button onClick={() => handleDeleteMessage(m._id)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      <h4 className="font-bold text-cyber-primary text-lg">{m.subject}</h4>
                      <p className="text-xs text-white/40 mb-4">{m.name} ({m.email}) - {m.date}</p>
                      <p className="text-white/80">{m.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default Admin;
