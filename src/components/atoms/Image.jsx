import React from 'react';

const Image = ({ src, alt, className }) => (
  <img src={`http://localhost:3000${src}`} alt={alt} className={`object-cover ${className}`} />
);

export default Image;
