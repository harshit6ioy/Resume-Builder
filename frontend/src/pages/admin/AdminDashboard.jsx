import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Loader2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const { data } = await api.get('/admin/pending-users');
      setPendingUsers(data);
    } catch (error) {
      toast.error('Failed to fetch pending users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleVerify = async (id) => {
    try {
      await api.put(`/admin/verify-user/${id}`);
      toast.success('User verified successfully');
      setPendingUsers(pendingUsers.filter(u => u.id !== id));
    } catch (error) {
      toast.error('Failed to verify user');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Platform overview and user verification.</p>
      </div>

      <div className="glass p-8 rounded-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold">Pending Approvals</h3>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : pendingUsers.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No pending users to verify.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map(user => (
              <div key={user.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.email} • Role: {user.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleVerify(user.id)}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-lg font-medium transition-colors flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
