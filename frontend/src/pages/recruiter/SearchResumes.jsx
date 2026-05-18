import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, FileText, X, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SearchResumes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const { data } = await api.get(`/recruiter/search-resumes?skill=${encodeURIComponent(searchTerm)}`);
      setCandidates(data);
    } catch (error) {
      toast.error('Failed to search resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsSending(true);
    try {
      await api.post('/contact/send', {
        recruiter_name: user.name,
        candidate_email: selectedCandidate.email,
        message: message
      });
      toast.success('Message sent successfully!');
      setSelectedCandidate(null);
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Search Candidates</h1>
        <p className="text-slate-500 dark:text-slate-400">Find the perfect match for your open positions.</p>
      </div>

      <form onSubmit={handleSearch} className="glass p-4 rounded-2xl flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by skill (e.g. React, Python, UI Design)"
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center shadow-lg shadow-blue-500/30"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Search'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-2xl flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{candidate.full_name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{candidate.title}</p>
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {candidate.skills && candidate.skills.split(',').slice(0, 4).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded-md">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 mb-6 line-clamp-3">
              {candidate.experience}
            </p>

            <button 
              onClick={() => setSelectedCandidate(candidate)}
              className="w-full py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-xl font-medium transition-colors"
            >
              Contact Candidate
            </button>
          </motion.div>
        ))}
      </div>

      {candidates.length === 0 && !isLoading && searchTerm && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No candidates found for "{searchTerm}"</p>
        </div>
      )}

      {/* Contact Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-xl font-bold">Contact {selectedCandidate.full_name}</h3>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi, I saw your resume and would like to discuss an opportunity..."
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button 
                    onClick={() => setSelectedCandidate(null)}
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleContact}
                    disabled={isSending}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/30"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResumes;
