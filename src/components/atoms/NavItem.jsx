import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ label, to }) => (
  <Link to={to}>
    <li className="nav-item">
    <div to={to} className="text-navy  text-lg hover:text-gray-400">
      {label}
    </div>
  </li>
  </Link>
);

export default NavItem;
