import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Target, ShieldCheck, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    { icon: Sparkles, title: 'AI-Powered Builder', desc: 'Generate professional summaries and skill suggestions instantly.' },
    { icon: Target, title: 'ATS Optimized', desc: 'Our templates are proven to pass Applicant Tracking Systems.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-[var(--card-bg)] fixed w-full top-0 z-50 border-b border-slate-200 dark:border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ResumePro</h1>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="px-4 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-black rounded-md font-medium transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 dark:text-white leading-tight">
              Build your next <br />
              <span className="text-slate-500 dark:text-slate-400">dream resume.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Create ATS-friendly, beautifully designed resumes in minutes using our advanced AI builder. Connect directly with top recruiters.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="px-8 py-3.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-black rounded-md font-bold text-lg transition-all shadow-sm flex items-center">
                Create My Resume <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-white dark:bg-[#0A0A0A] p-8 rounded-xl text-left border border-slate-200 dark:border-[#333] hover:border-slate-300 dark:hover:border-[#555] transition-colors duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] rounded-md flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
