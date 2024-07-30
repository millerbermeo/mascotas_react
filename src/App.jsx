import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/pages/HomePage';
import PetsPage from './components/pages/PetsPage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import UserPage from './components/pages/UserPage';
import PrivateRoute from './services/PrivateRoute';
import AdopPage from './components/pages/AdopPage';
import AdopcionPage from './components/pages/AdopcionPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <RoutesWrapper />
      </Router>
    </AuthProvider>
  );
};

const RoutesWrapper = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adop" element={<AdopPage />} />

        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/usuarios" element={<PrivateRoute element={<UserPage />} />} />
        <Route path="/adopciones" element={<PrivateRoute element={<AdopcionPage />} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
