import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const passwordHint = 'Use 8+ characters with letters, numbers, and a special character. Example: Resume@2026';
  const isStrongPassword = (value) =>
    value.length >= 8 &&
    /[A-Za-z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value);

  const requestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/forgot-password', { email });
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      toast.error(passwordHint);
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/reset-password', { email, otp, password });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      const errors = error.response?.data?.errors;
      const firstError = errors && Object.values(errors)[0]?.[0];
      toast.error(firstError || error.response?.data?.message || 'Could not reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-2">Reset Password</h2>
          <p className="text-slate-500 dark:text-slate-400">We will send a 6-digit OTP to your account email.</p>
        </div>

        <form onSubmit={otpSent ? resetPassword : requestOtp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {otpSent && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">OTP</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Resume@2026"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{passwordHint}</p>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : otpSent ? 'Reset Password' : 'Send OTP'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          Remember your password?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
