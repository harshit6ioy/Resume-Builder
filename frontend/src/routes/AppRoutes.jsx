import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../pages/LandingPage';

import UserDashboard from '../pages/user/UserDashboard';
import CreateResume from '../pages/user/CreateResume';
import MyResumes from '../pages/user/MyResumes';
import Templates from '../pages/user/Templates';

import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import SearchResumes from '../pages/recruiter/SearchResumes';

import AdminDashboard from '../pages/admin/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/create-resume" element={<CreateResume />} />
          <Route path="/my-resumes" element={<MyResumes />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Route>

      {/* Recruiter Routes */}
      <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/recruiter/search" element={<SearchResumes />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
