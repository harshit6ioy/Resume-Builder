import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resumeData } = await api.get('/resumes');
        setResumes(resumeData.filter(r => r.user_id === user.id));
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user.id, user.email]);

  const stats = [
    { title: 'Total Resumes', value: resumes.length.toString(), icon: FileText, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333]' },
    { title: 'Profile Views', value: '24', icon: TrendingUp, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333]' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's an overview of your resume building progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-xl flex items-center justify-between hover:border-slate-300 dark:hover:border-[#444] transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        {/* Quick Actions Block */}
        <div className="glass p-8 rounded-xl flex flex-col items-center justify-center text-center border-dashed border-slate-300 dark:border-[#333] hover:border-slate-400 dark:hover:border-[#555] transition-colors group">
          <div className="w-16 h-16 bg-slate-100 dark:bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 group-hover:bg-slate-200 dark:group-hover:bg-[#222] transition-colors border border-slate-200 dark:border-[#333]">
            <Plus className="w-8 h-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Create New Resume</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Use our AI-powered builder to create a professional resume.
          </p>
          <Link 
            to="/create-resume"
            className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-md font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
          >
            Get Started
          </Link>
          <Link to="/my-resumes" className="mt-4 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white transition-colors">View My Resumes</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
