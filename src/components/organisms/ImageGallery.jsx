// src/components/organisms/ImageGallery.js
import React from 'react';
import ImageCard from '../molecules/ImageCard';
import img1 from '../../assets/img1.jpeg'
import img2 from '../../assets/img2.jpeg'
import img7 from '../../assets/img7.jpeg'
import img9 from '../../assets/img9.jpeg'
import img8 from '../../assets/img8.jpeg'
import img6 from '../../assets/img6.jpeg'
import img4 from '../../assets/img4.jpeg'

const images = [
  { src: img2, alt: 'Placeholder 1', size: 'large' },
  { src: img1, alt: 'Placeholder 2', size: 'small' },
  { src: img7, alt: 'Placeholder 3', size: 'large' },
  { src: img9, alt: 'Placeholder 4', size: 'small' },
  { src: img8, alt: 'Placeholder 5', size: 'small' },
  { src: img6, alt: 'Placeholder 6', size: 'small' },
  { src: img4, alt: 'Placeholder 7', size: 'small' },

];

const ImageGallery = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 scale-75 2xl:scale-100">
    {images.map((image, index) => (
      <ImageCard key={index} src={image.src} alt={image.alt} size={image.size} />
    ))}
  </div>
);

export default ImageGallery;
