import React from 'react';

const Link = ({ href, children, className }) => (
  <a href={href} className={`text-white text-opacity-40 hover:underline ${className}`}>
    {children}
  </a>
);

export default Link;
