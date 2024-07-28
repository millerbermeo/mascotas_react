// src/components/atoms/Text.js
import React from 'react';

const Text = ({ children, className }) => (
  <p className={`text-base text-white ${className}`}>{children}</p>
);

export default Text;
