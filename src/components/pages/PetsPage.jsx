// src/components/pages/PetsPage.js
import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';

const PetsPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen flex flex-col bg-pastelBlue font-sans"
  >
    <MainLayout>
      <div className="flex-grow flex flex-col justify-center items-center h-screen p-4 relative">
        <h1 className="text-5xl font-bold mb-4">Mascotas</h1>
        <p className="mb-8 text-lg text-gray-800">
          Esta es la página de mascotas. Aquí puedes ver todas las mascotas disponibles para adopción.
        </p>
      </div>
    </MainLayout>
  </motion.div>
);

export default PetsPage;
