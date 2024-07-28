import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './components/pages/HomePage';
import PetsPage from './components/pages/PetsPage';
import LoginPage from './components/pages/LoginPage';



const App = () => {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
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
      </Routes>
    </AnimatePresence>
  );
};

export default App;
