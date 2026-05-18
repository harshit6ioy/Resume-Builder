import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit2, Trash2, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resumes');
      // Filter resumes for the current user since getUserResumes isn't in api.php
      const userResumes = data.filter(r => r.user_id === user.id);
      setResumes(userResumes);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user.id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await api.delete(`/resume/delete/${id}`);
      toast.success('Resume deleted successfully');
      setResumes(resumes.filter(r => r.id !== id));
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const handleDownload = (id) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    window.open(`${baseUrl}/resume/download/${id}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and download your generated resumes.</p>
        </div>
        <Link to="/create-resume" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
          + Create New
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="glass p-8 text-center rounded-2xl">
           <p className="text-slate-500 mb-4">You haven't created any resumes yet.</p>
           <Link to="/create-resume" className="text-blue-500 font-medium hover:underline">Start building now</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-x-4 backdrop-blur-sm">
                  <button className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-xl">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDownload(resume.id)} className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-xl">
                    <Download className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(resume.id)} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg truncate pr-2">{resume.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${resume.is_public ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {resume.is_public ? 'public' : 'private'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                  Updated: {new Date(resume.updated_at).toLocaleDateString()}
                </p>
                {resume.is_public && (
                   <p className="text-xs text-blue-500 mt-2 truncate">
                      Share: /public/resume/{resume.share_link}
                   </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResumes;
