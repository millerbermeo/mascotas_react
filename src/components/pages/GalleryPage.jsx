// src/components/pages/GalleryPage.js
import React from 'react';
import ImageGallery from '../organisms/ImageGallery';
import MainLayout from '../layouts/MainLayout';


const GalleryPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <MainLayout>
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        <ImageGallery />
      </div>
    </MainLayout>
  </div>
);

export default GalleryPage;
