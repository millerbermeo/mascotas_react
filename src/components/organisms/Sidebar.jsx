import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import MenuItem from '../molecules/MenuItem';

const menuItems = [
  { icon: FaHome, label: 'Home', to: '/dashboard' },
  { icon: FaUser, label: 'Adopciones', to: '/adopciones' },
  { icon: FaCog, label: 'Usuarios', to: '/usuarios' },
];

const Sidebar = () => (
  <div className="w-64 z-50 min-w-64 bg-[#AEC6CF] fixed h-screen shadow-lg p-4">
    <h2 className="text-2xl font-bold mb-4">Menu</h2>
    <nav>
      {menuItems.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} to={item.to} />
      ))}
    </nav>
  </div>
);

export default Sidebar;
