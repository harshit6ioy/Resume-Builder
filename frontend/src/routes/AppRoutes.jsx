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



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/create-resume" element={<CreateResume />} />
          <Route path="/my-resumes" element={<MyResumes />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Route>


    </Routes>
  );
};

export default AppRoutes;
