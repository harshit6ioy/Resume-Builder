import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Sparkles, TrendingUp, Loader2, MessageSquare, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resumes
        const { data: resumeData } = await api.get('/resumes');
        setResumes(resumeData.filter(r => r.user_id === user.id));

        // Fetch messages from recruiters
        const { data: messageData } = await api.get(`/contact/requests?email=${encodeURIComponent(user.email)}`);
        setMessages(messageData);
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
    { title: 'Recruiter Messages', value: messages.length.toString(), icon: MessageSquare, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333]' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's an overview of your resume building progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Recruiter Messages Block */}
        <div className="lg:col-span-2 glass p-8 rounded-xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-slate-500" />
              Inbox: Recruiter Outreach
            </h3>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                 <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <p>No messages yet. Make your resume public to get noticed by top recruiters!</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide max-h-96">
              {messages.map((msg) => (
                <div key={msg.id} className="p-5 bg-white dark:bg-[#0A0A0A] rounded-xl border border-slate-200 dark:border-[#333] hover:border-slate-300 dark:hover:border-[#444] transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{msg.recruiter_name}</h4>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <button className="mt-4 text-sm font-medium text-slate-900 dark:text-white hover:underline flex items-center">
                    Reply to Recruiter
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
