import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Plus, X, Loader2, Sparkles, CheckCircle, Save, Briefcase, PlusCircle, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ResumePreview from '../../components/ResumePreview';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateResume = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    full_name: '',
    email: '',
    phone: '',
    skills: [],
    education: '',
    experience: '',
    industry: '',
    summary: '',
    template: location.state?.selectedTemplate || 'modern',
    is_public: false
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState({ summary: false, skills: false, review: false, projects: false });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [aiProjects, setAiProjects] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(skill => skill !== skillToRemove) });
  };

  const generateAISummary = async () => {
    if (!formData.industry && !formData.experience) {
      toast.error('Please enter industry or experience first');
      return;
    }
    setIsGenerating({ ...isGenerating, summary: true });
    try {
      const { data } = await api.post('/ai/generate-summary', {
        industry: formData.industry,
        experience: formData.experience,
        skills: formData.skills.join(', ') // Backend expects a string
      });
      const summaryText = data.content;
      setFormData({ ...formData, summary: summaryText });
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to generate summary');
    } finally {
      setIsGenerating({ ...isGenerating, summary: false });
    }
  };

  const suggestSkills = async () => {
    if (!formData.industry) {
      toast.error('Please enter industry first');
      return;
    }
    setIsGenerating({ ...isGenerating, skills: true });
    try {
      const { data } = await api.post('/ai/suggest-skills', { industry: formData.industry });
      const skillsStr = data.content;
      // parse string to array (assuming comma separated)
      const parsedSkills = skillsStr.split(',').map(s => s.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
      setAiSuggestions(parsedSkills);
      toast.success('Skills suggested successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to suggest skills');
    } finally {
      setIsGenerating({ ...isGenerating, skills: false });
    }
  };

  const suggestProjects = async () => {
    if (formData.skills.length === 0) {
      toast.error('Please add some skills first');
      return;
    }
    setIsGenerating({ ...isGenerating, projects: true });
    try {
      const { data } = await api.post('/ai/suggest-projects', { skills: formData.skills.join(', ') });
      const projectsText = data.content;
      setAiProjects(projectsText);
      toast.success('Projects suggested successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to suggest projects');
    } finally {
      setIsGenerating({ ...isGenerating, projects: false });
    }
  };

  const reviewResume = async () => {
    setIsGenerating({ ...isGenerating, review: true });
    try {
      const resumeText = `
        Name: ${formData.full_name}
        Summary: ${formData.summary}
        Skills: ${formData.skills.join(', ')}
        Experience: ${formData.experience}
        Education: ${formData.education}
      `;
      const { data } = await api.post('/ai/review-resume', { resume_text: resumeText });
      // The API returns OpenAI choice structure. Parse it for UI if possible or just display text
      setAtsScore({
        score: 'AI Review Complete',
        details: data.content
      });
      toast.success('Resume reviewed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to review resume');
    } finally {
      setIsGenerating({ ...isGenerating, review: false });
    }
  };

  const saveResume = async () => {
    if(!formData.title || !formData.full_name) {
      toast.error('Please enter a title and full name');
      return;
    }
    setIsSaving(true);
    try {
      await api.post('/resume/create', {
        ...formData,
        user_id: user.id,
        skills: formData.skills.join(', ') // backend expects string
      });
      toast.success('Resume saved successfully!');
      navigate('/my-resumes');
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const renderProjects = (text) => {
    const projects = text.split(/\n\n+/).filter(p => p.trim().length > 10);
    return projects.map((proj, idx) => {
      let title = `Project ${idx + 1}`;
      let desc = proj.trim();
      const match = proj.match(/^[-*•]?\s*\**([^*:\n]+)\**[:\-]\s*(.*)$/ms);
      if (match) {
        title = match[1].trim();
        desc = match[2].trim();
      } else {
        const lines = proj.split('\n');
        if (lines.length > 1) {
          title = lines[0].replace(/^[-*•]\s*/, '').replace(/\*\*/g, '').trim();
          desc = lines.slice(1).join('\n').trim();
        }
      }
      return (
        <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <h5 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h5>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-wrap">{desc.replace(/\*\*/g, '')}</p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setFormData({...formData, experience: formData.experience + (formData.experience ? '\n\n' : '') + `${title}\n${desc.replace(/\*\*/g, '')}`});
              toast.success('Project added to experience!');
            }}
            className="flex items-center justify-center w-full text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 py-2 rounded-lg font-bold transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add to Resume
          </button>
        </div>
      );
    });
  };

  const renderAtsDetails = (text) => {
    const scoreMatch = text.match(/(?:score|ats).*?(?:out of 100|:|is|of)\s*(\d+)/i) || text.match(/(\d{2,3})\s*\/\s*100/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
    const sections = text.split(/\n\n+/).filter(s => s.trim().length > 0);

    return (
      <div className="space-y-4 mt-4">
        {score && (
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900">
              <span className={`text-xl font-black ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {score}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">ATS Compatibility Score</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Based on industry standards</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3">
          {sections.map((sec, idx) => {
            if (scoreMatch && sec.includes(scoreMatch[0]) && sec.length < 50) return null;
            return (
              <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{sec.replace(/\*\*/g, '')}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-6rem)]">
      {/* Editor Side */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-hide">
        <div className="glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Resume Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Software Engineer 2024" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Technology" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Professional Summary</h2>
            <button onClick={generateAISummary} disabled={isGenerating.summary} className="flex items-center text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300 dark:border dark:border-[#333] hover:bg-slate-200 dark:hover:bg-[#222] px-3 py-1.5 rounded-md transition-colors border border-slate-200">
              {isGenerating.summary ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Wand2 className="w-3.5 h-3.5 mr-2" />}
              AI Generate
            </button>
          </div>
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Skills</h2>
            <button onClick={suggestSkills} disabled={isGenerating.skills} className="flex items-center text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300 dark:border dark:border-[#333] hover:bg-slate-200 dark:hover:bg-[#222] px-3 py-1.5 rounded-md transition-colors border border-slate-200">
              {isGenerating.skills ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-2" />}
              Suggest Skills
            </button>
          </div>
          
          <form onSubmit={addSkill} className="flex gap-2 mb-4">
            <input type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Type a skill and press Enter" />
            <button type="submit" className="px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map(skill => (
              <span key={skill} className="flex items-center bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-medium">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-blue-800 dark:hover:text-blue-200"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>

          {aiSuggestions && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 border border-slate-200 dark:border-[#333] rounded-xl bg-slate-50 dark:bg-[#111]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-slate-500" /> Recommended Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map(skill => {
                  const isAdded = formData.skills.includes(skill);
                  return (
                    <button 
                      type="button" 
                      key={skill} 
                      onClick={() => { if(!isAdded) setFormData({...formData, skills: [...formData.skills, skill]})}} 
                      className={`text-xs px-3 py-1.5 rounded-md border transition-all duration-200 flex items-center ${isAdded ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white cursor-default opacity-50' : 'bg-white dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#1A1A1A] shadow-sm'}`}
                      disabled={isAdded}
                    >
                      {isAdded ? <Check className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Experience & Education</h2>
            <button onClick={suggestProjects} disabled={isGenerating.projects} className="flex items-center text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300 dark:border dark:border-[#333] hover:bg-slate-200 dark:hover:bg-[#222] px-3 py-1.5 rounded-md transition-colors border border-slate-200">
              {isGenerating.projects ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Briefcase className="w-3.5 h-3.5 mr-2" />}
              Suggest Projects
            </button>
          </div>
          
          {aiProjects && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-5 border border-slate-200 dark:border-[#333] rounded-xl bg-slate-50 dark:bg-[#111]">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-slate-500" /> Tailored Project Ideas
              </h4>
              <div className="max-h-80 overflow-y-auto pr-2 scrollbar-hide">
                {renderProjects(aiProjects)}
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Work Experience / Projects</label>
              <textarea name="experience" value={formData.experience} onChange={handleChange} rows="5" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Describe your work experience..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Education</label>
              <textarea name="education" value={formData.education} onChange={handleChange} rows="3" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Your educational background..."></textarea>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="font-bold">Public Visibility</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Allow recruiters to find this resume in searches</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="is_public" checked={formData.is_public} onChange={handleChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Preview Side */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="glass p-4 rounded-xl flex justify-between items-center">
          <h3 className="font-bold">Live Preview</h3>
          <div className="space-x-3 flex">
            <button onClick={reviewResume} disabled={isGenerating.review} className="px-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] text-slate-900 dark:text-slate-100 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-[#222] transition-colors flex items-center">
              {isGenerating.review ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              ATS Review
            </button>
            <button onClick={saveResume} disabled={isSaving} className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center shadow-sm">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Resume
            </button>
          </div>
        </div>
        
        {atsScore && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-5 rounded-xl max-h-[400px] overflow-y-auto scrollbar-hide">
            <h3 className="text-lg font-black mb-1 flex items-center text-slate-900 dark:text-white">
              <Sparkles className="w-5 h-5 mr-2 text-slate-500" /> ATS Analysis Report
            </h3>
            {renderAtsDetails(atsScore.details)}
          </motion.div>
        )}

        <div className="flex-1 overflow-auto bg-[#F4F4F5] dark:bg-[#000000] p-8 rounded-xl flex justify-center items-start border border-slate-200 dark:border-[#222]">
          <div className="scale-[0.8] origin-top shadow-md">
             <ResumePreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
