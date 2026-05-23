import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_TEMPLATES = [
  { id: 't1', name: 'Modern Minimal', industry: 'Technology', layout: 'Minimal', preview_image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80', colors: ['#ffffff', '#000000'] },
  { id: 't2', name: 'Corporate Standard', industry: 'Finance', layout: 'Traditional', preview_image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=500&q=80', colors: ['#f8fafc', '#1e293b'] },
  { id: 't3', name: 'Executive Suite', industry: 'Management', layout: 'Classic', preview_image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&q=80', colors: ['#f1f5f9', '#0f172a'] },
  { id: 't4', name: 'Startup Hustler', industry: 'Entrepreneurship', layout: 'Bold', preview_image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80', colors: ['#fff7ed', '#c2410c'] },
  { id: 't5', name: 'Creative Portfolio', industry: 'Design', layout: 'Two-Column', preview_image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&q=80', colors: ['#fdf4ff', '#701a75'] },
];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await api.get('/templates');
        // Merge backend templates with our beautiful defaults
        setTemplates(data && data.length > 0 ? [...data, ...DEFAULT_TEMPLATES] : DEFAULT_TEMPLATES);
      } catch (error) {
        // Fallback gracefully to default templates if backend fails
        setTemplates(DEFAULT_TEMPLATES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resume Templates</h1>
        <p className="text-slate-500 dark:text-slate-400">Choose a layout that fits your style and industry. Select to apply it to your next resume.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => navigate('/create-resume', { state: { selectedTemplate: template.name } })}
            >
              <div className="aspect-[1/1.414] rounded-2xl mb-4 bg-slate-200 dark:bg-slate-800 border-2 border-transparent group-hover:border-blue-500 transition-colors shadow-lg relative overflow-hidden flex items-center justify-center">
                {template.preview_image ? (
                  <img 
                    src={template.preview_image} 
                    alt={template.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&q=80'; }} 
                  />
                ) : (
                  <span className="text-slate-400 font-bold tracking-widest uppercase">{template.layout || 'Template'}</span>
                )}
                 <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                   <span className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     Use Template
                   </span>
                 </div>
              </div>
              <div className="px-2">
                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">{template.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">{template.industry}</p>
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                    {template.layout}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;
