import React from 'react';

const ImageGalery = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`object-cover ${className}`} />
);

export default ImageGalery