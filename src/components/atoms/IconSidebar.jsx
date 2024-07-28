// src/components/atoms/Icon.js
import React from 'react';

const IconSidebar = ({ icon: IconComponent, className }) => (
  <IconComponent className={`w-6 h-6 ${className}`} />
);

export default IconSidebar;
