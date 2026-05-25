import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  Wand2, 
  LayoutTemplate, 
  UserCircle, 
  Home,
  LogOut,
  Search,
  MessageSquare,
  Users,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/');
    await logout();
  };

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Resume', path: '/create-resume', icon: FileText },
    { name: 'My Resumes', path: '/my-resumes', icon: Files },
    { name: 'Templates', path: '/templates', icon: LayoutTemplate },
  ];

  const links = userLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-[var(--card-bg)] lg:border-r border-slate-200 dark:border-[#222] flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ResumePro</h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="mt-4">
            <ul className="space-y-1 px-4">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2.5 rounded-md transition-all duration-200 group text-sm font-bold tracking-wide ${
                        isActive 
                          ? 'bg-slate-100 dark:bg-[#1A1A1A] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-[#333]' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111] hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
                      }`
                    }
                  >
                    <link.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-4 space-y-2 border-t border-slate-200 dark:border-[#222]">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/');
            }}
            className="flex items-center w-full px-4 py-2.5 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 rounded-md hover:bg-slate-50 dark:hover:bg-[#111] transition-colors group"
          >
            <Home className="w-4 h-4 mr-3" />
            Home Page
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-4 py-2.5 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 rounded-md hover:bg-slate-50 dark:hover:bg-[#111] transition-colors group"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 mr-3 text-slate-400 group-hover:text-slate-200 transition-colors" /> : <Moon className="w-4 h-4 mr-3 text-slate-500 group-hover:text-slate-700 transition-colors" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-bold tracking-wide text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
