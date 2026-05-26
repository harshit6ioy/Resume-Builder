import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Plus, X, Loader2, Sparkles, CheckCircle, Save, Briefcase, PlusCircle, Check, Eye, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ResumePreview from '../../components/ResumePreview';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateResume = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const editingResume = location.state?.mode === 'edit' ? location.state.resume : null;
  const editingResumeId = editingResume?.id || editingResume?._id;
  const toSkillArray = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(',').map(skill => skill.trim()).filter(Boolean);
    }
    return [];
  };
  const [formData, setFormData] = useState({
    title: editingResume?.title || '',
    full_name: editingResume?.full_name || user?.name || '',
    email: editingResume?.email || user?.email || '',
    phone: editingResume?.phone || '',
    skills: toSkillArray(editingResume?.skills),
    education: editingResume?.education || '',
    experience: editingResume?.experience || '',
    projects: editingResume?.projects || '',
    activity_type: editingResume?.activity_type || 'achievements',
    activity_details: editingResume?.activity_details || '',
    industry: editingResume?.industry || '',
    summary: editingResume?.summary || '',
    template: editingResume?.template || location.state?.selectedTemplate || 'modern',
    font_size: (editingResume?.font_size && !['default', 'small', 'medium', 'large'].includes(editingResume?.font_size)) ? editingResume.font_size : '14',
    font_sizes: editingResume?.font_sizes || {},
    font_style: editingResume?.font_style || 'default',
    font_weight: editingResume?.font_weight || 'default'
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState({ summary: false, skills: false, review: false, projects: false });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [aiProjects, setAiProjects] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [previewMode, setPreviewMode] = useState('preview');
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validatePhone = (phone) => {
    if (!phone) return '';
    if (!/^\d+$/.test(phone)) return 'Phone number must contain digits only.';
    if (phone.length < 7 || phone.length > 15) return 'Phone number must be 7 to 15 digits.';
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFontSizeChange = (field, value) => {
    setFormData({
      ...formData,
      font_sizes: {
        ...formData.font_sizes,
        [field]: value
      }
    });
  };

  const LabelWithFontSize = ({ label, field }) => (
    <div className="flex justify-between items-end mb-1">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex items-center space-x-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Size:</span>
        <input 
          type="number" 
          value={formData.font_sizes?.[field] || ''} 
          onChange={(e) => handleFontSizeChange(field, e.target.value)}
          placeholder="px"
          min="8" max="48"
          className="w-12 px-1 py-0.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center"
        />
      </div>
    </div>
  );

  const HeadingWithFontSize = ({ title, field }) => (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center space-x-1.5 opacity-60 hover:opacity-100 transition-opacity ml-4">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Size:</span>
        <input 
          type="number" 
          value={formData.font_sizes?.[field] || ''} 
          onChange={(e) => handleFontSizeChange(field, e.target.value)}
          placeholder="px"
          min="8" max="48"
          className="w-12 px-1 py-0.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center font-normal"
        />
      </div>
    </div>
  );

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 15);
    const error = rawValue !== digitsOnly ? 'Phone number must contain digits only.' : '';

    setFormData({ ...formData, phone: digitsOnly });
    setFormErrors({ ...formErrors, phone: error });
  };

  const handlePhoneBlur = () => {
    setFormErrors({ ...formErrors, phone: validatePhone(formData.phone) });
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
        Projects: ${formData.projects}
        Education: ${formData.education}
        ${formData.activity_type === 'co_curricular' ? 'Co-curricular Activities' : 'Achievements'}: ${formData.activity_details}
      `;
      const { data } = await api.post('/ai/review-resume', { resume_text: resumeText });
      // The API returns OpenAI choice structure. Parse it for UI if possible or just display text
      setAtsScore({
        score: 'AI Review Complete',
        details: data.content
      });
      setPreviewMode('ats');
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
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setFormErrors({ ...formErrors, phone: phoneError });
      toast.error(phoneError);
      return;
    }
    if (!user?.id && !user?._id) {
      toast.error('Please sign in again before saving your resume');
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        email: formData.email || user.email,
        user_id: user.id || user._id,
        skills: formData.skills.join(', ') // backend expects string
      };

      if (editingResumeId) {
        await api.put(`/resume/update/${editingResumeId}`, payload);
        toast.success('Resume updated successfully!');
      } else {
        await api.post('/resume/create', payload);
        toast.success('Resume saved successfully!');
      }
      navigate('/my-resumes');
    } catch (error) {
      const errors = error.response?.data?.errors;
      const firstError = errors && Object.values(errors)[0]?.[0];
      toast.error(firstError || error.response?.data?.message || 'Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const renderProjects = (text) => {
    const projects = text.split(/\n\n+/).filter(p => p.trim().length > 10);
    return projects.map((proj, idx) => {
      let title = `Project ${idx + 1}`;
      let desc = proj.trim();
      const match = proj.match(/^[-*•]?\s*\**([^*:\n]+)\**[:-]\s*(.*)$/ms);
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
              setFormData({...formData, projects: formData.projects + (formData.projects ? '\n\n' : '') + `${title}\n${desc.replace(/\*\*/g, '')}`});
              toast.success('Project added to projects!');
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
          <h2 className="text-2xl font-bold mb-6">{editingResumeId ? 'Edit Resume' : 'Basic Information'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <LabelWithFontSize label="Resume Title" field="title" />
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Software Engineer 2024" />
            </div>
            <div>
              <LabelWithFontSize label="Full Name" field="full_name" />
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <LabelWithFontSize label="Email" field="email" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <LabelWithFontSize label="Phone" field="phone" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="15"
                className={`w-full p-3 bg-white dark:bg-slate-800 border rounded-xl focus:ring-2 outline-none ${
                  formErrors.phone
                    ? 'border-red-400 focus:ring-red-500 dark:border-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
                placeholder="Digits only"
                aria-invalid={Boolean(formErrors.phone)}
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs font-medium text-red-500">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <LabelWithFontSize label="Industry" field="industry" />
              <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Technology" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Template Style</label>
              <select name="template" value={formData.template} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="modern">Modern Minimal</option>
                <option value="corporate">Corporate Standard</option>
                <option value="creative">Creative Portfolio</option>
                <option value="executive">Executive Suite</option>
                <option value="tech">Tech Innovator</option>
                <option value="startup">Startup Hustler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Font Style</label>
              <select name="font_style" value={formData.font_style} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="default">Default</option>
                <option value="sans">Modern Sans</option>
                <option value="serif">Classic Serif</option>
                <option value="mono">Monospace</option>
                <option value="calibri">Calibri</option>
                <option value="times-new-roman">Times New Roman</option>
                <option value="arial">Arial</option>
                <option value="georgia">Georgia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Font Weight</label>
              <select name="font_weight" value={formData.font_weight} onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="default">Default</option>
                <option value="light">Light</option>
                <option value="regular">Regular</option>
                <option value="medium">Medium</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 w-full">
            <div className="flex-1 min-w-[250px]">
              <HeadingWithFontSize title="Professional Summary" field="summary" />
            </div>
            <button onClick={generateAISummary} disabled={isGenerating.summary} className="flex items-center text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300 dark:border dark:border-[#333] hover:bg-slate-200 dark:hover:bg-[#222] px-3 py-1.5 rounded-md transition-colors border border-slate-200">
              {isGenerating.summary ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Wand2 className="w-3.5 h-3.5 mr-2" />}
              AI Generate
            </button>
          </div>
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 w-full">
            <div className="flex-1 min-w-[250px]">
              <HeadingWithFontSize title="Skills" field="skills" />
            </div>
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
          </div>

          <div className="space-y-4">
            <div>
              <LabelWithFontSize label="Work Experience" field="experience" />
              <textarea name="experience" value={formData.experience} onChange={handleChange} rows="5" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Describe your work experience..."></textarea>
            </div>
            <div>
              <LabelWithFontSize label="Education" field="education" />
              <textarea name="education" value={formData.education} onChange={handleChange} rows="3" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Your educational background..."></textarea>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 w-full">
            <div className="flex-1 min-w-[250px]">
              <HeadingWithFontSize title="Projects" field="projects" />
            </div>
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

          <textarea name="projects" value={formData.projects} onChange={handleChange} rows="4" className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Highlight academic, personal, freelance, or portfolio projects..."></textarea>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 w-full">
            <div className="flex-1 min-w-[250px]">
              <HeadingWithFontSize title="Additional Section" field="activity_details" />
            </div>
            <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-[#333] dark:bg-[#111]">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, activity_type: 'achievements' })}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.activity_type === 'achievements'
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Achievements
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, activity_type: 'co_curricular' })}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.activity_type === 'co_curricular'
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Co-curricular
              </button>
            </div>
          </div>
          <textarea
            name="activity_details"
            value={formData.activity_details}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder={formData.activity_type === 'co_curricular' ? 'Add clubs, events, volunteering, sports, or campus activities...' : 'Add awards, certifications, rankings, scholarships, or measurable wins...'}
          ></textarea>
        </div>


      </div>

      {/* Preview Side */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="glass p-4 rounded-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="font-bold">Resume Workspace</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {previewMode === 'ats' ? 'Review ATS suggestions, then switch modes when you need the resume preview.' : 'See your resume exactly as it updates.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-[#333] dark:bg-[#111]">
                <button
                  type="button"
                  onClick={() => setPreviewMode('preview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    previewMode === 'preview'
                      ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Live Preview
                </button>
                {atsScore && (
                  <button
                    type="button"
                    onClick={() => setPreviewMode('ats')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      previewMode === 'ats'
                        ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black'
                        : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    ATS Report
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <button
                  onClick={reviewResume}
                  disabled={isGenerating.review}
                  className="px-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] text-slate-900 dark:text-slate-100 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-[#222] transition-colors flex items-center"
                >
                  {isGenerating.review ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  ATS Review
                </button>
                <button
                  onClick={saveResume}
                  disabled={isSaving}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center shadow-sm"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {editingResumeId ? 'Update Resume' : 'Save Resume'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {previewMode === 'ats' && atsScore ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass flex-1 p-5 rounded-xl overflow-y-auto scrollbar-hide">
            <div className="border-b border-slate-200 pb-4 dark:border-[#333]">
              <h3 className="text-lg font-black flex items-center text-slate-900 dark:text-white">
                <Sparkles className="w-5 h-5 mr-2 text-slate-500" /> ATS Analysis Report
              </h3>
            </div>
            {renderAtsDetails(atsScore.details)}
          </motion.div>
        ) : (
          <div className="flex-1 overflow-auto bg-[#F4F4F5] dark:bg-[#000000] p-6 rounded-xl flex justify-center items-start border border-slate-200 dark:border-[#222]">
            <div className="w-full max-w-[640px] min-w-[520px] origin-top shadow-md">
              <ResumePreview data={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateResume;
