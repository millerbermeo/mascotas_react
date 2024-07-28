// src/components/atoms/Icon.js
import React from 'react';

const Icon = ({ name, className }) => (
  <i className={`icon-${name} ${className}`}></i>
);

export default Icon;
