import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = ({ items }) => (
  <div className="flex space-x-4 w-96 justify-center">
    {items.map((item, index) => (
      <Link key={index} to={item.to} className="text-black hover:text-gray-300">
        {item.label}
      </Link>
    ))}
  </div>
);

export default NavMenu;
