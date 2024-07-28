import React from 'react';

const TextSidebar = ({ children, className }) => (
  <p className={`text-base ${className}`}>{children}</p>
);

export default TextSidebar