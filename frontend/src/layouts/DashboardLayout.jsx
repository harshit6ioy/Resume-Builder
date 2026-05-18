import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-[var(--card-bg)] border-b border-slate-200 dark:border-[#222] p-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ResumePro</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">{user?.name}</span>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-slate-100 dark:bg-[#1A1A1A] rounded-md border border-slate-200 dark:border-[#333] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#222] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
