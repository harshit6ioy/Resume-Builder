import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const stats = [
    { title: 'Resumes Viewed', value: '142', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Saved Candidates', value: '28', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Messages Sent', value: '45', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Find top talent and manage your candidate pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-2xl flex items-center justify-between"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Find Candidates</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
            Search our database of public resumes by skills, industry, or experience.
          </p>
          <Link 
            to="/recruiter/search"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Search Now
          </Link>
        </div>

        <div className="glass p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Contacts</h3>
            <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                   <Users className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">John Doe {i}</h4>
                  <p className="text-xs text-slate-500">React Developer</p>
                </div>
                <div className="text-xs text-slate-400">
                  2 days ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
