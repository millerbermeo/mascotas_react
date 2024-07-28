// src/components/organisms/ImageGallery.js
import React from 'react';
import ImageCard from '../molecules/ImageCard';

const images = [
  { src: 'img2.jpeg', alt: 'Placeholder 1', size: 'large' },
  { src: 'img1.jpeg', alt: 'Placeholder 2', size: 'small' },
  { src: 'img7.jpeg', alt: 'Placeholder 3', size: 'large' },
  { src: 'img9.jpeg', alt: 'Placeholder 4', size: 'small' },
  { src: 'img8.jpeg', alt: 'Placeholder 5', size: 'small' },
  { src: 'img6.jpeg', alt: 'Placeholder 6', size: 'small' },
  { src: 'img4.jpeg', alt: 'Placeholder 7', size: 'small' },

];

const ImageGallery = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 scale-75 2xl:scale-100">
    {images.map((image, index) => (
      <ImageCard key={index} src={image.src} alt={image.alt} size={image.size} />
    ))}
  </div>
);

export default ImageGallery;
