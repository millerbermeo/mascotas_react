import React from 'react';

const TextCard = ({ children, className }) => (
  <p className={`text-base ${className}`}>{children}</p>
);


export default TextCard