// src/components/molecules/ImageCard.js
import React from 'react';
import ImageGalery from '../atoms/ImageGalery';

const ImageCard = ({ src, alt, size }) => {
  const sizeClasses = size === 'large' ? 'row-span-2' : 'row-span-1';

  return (
    <div className={`p-1 ${sizeClasses}`}>
      <ImageGalery src={src} alt={alt} className="w-full h-full" />
    </div>
  );
};

export default ImageCard;
