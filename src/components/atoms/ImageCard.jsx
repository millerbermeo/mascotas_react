// src/components/atoms/Image.js
import React from 'react';

const ImageCard = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`object-cover ${className}`} />
);


export default ImageCard