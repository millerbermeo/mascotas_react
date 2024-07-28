// src/components/molecules/MenuItem.js
import React from 'react';
import Icon from '../atoms/Icon';
import TextSidebar from '../atoms/TextSidebar';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label, to }) => (
  <Link to={to} className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
    <Icon icon={icon} className="text-gray-600" />
    <TextSidebar className="text-gray-800">{label}</TextSidebar>
  </Link>
);

export default MenuItem;
