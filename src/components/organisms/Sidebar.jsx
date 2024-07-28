// src/components/organisms/Sidebar.js
import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import MenuItem from '../molecules/MenuItem';

const menuItems = [
  { icon: FaHome, label: 'Home', to: '/' },
  { icon: FaUser, label: 'Profile', to: '/profile' },
  { icon: FaCog, label: 'Settings', to: '/settings' },
];

const Sidebar = () => (
  <div className="w-64 bg-[#FCFCFC] h-screen p-4">
    <h2 className="text-2xl font-bold mb-4">Menu</h2>
    <nav>
      {menuItems.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} to={item.to} />
      ))}
    </nav>
  </div>
);

export default Sidebar;
