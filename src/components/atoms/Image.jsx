import React from 'react';

const Image = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`object-cover ${className}`} />
);

export default Image;
