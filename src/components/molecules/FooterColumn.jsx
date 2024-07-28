import React from 'react';
import Text from '../atoms/Text';
import Link from '../atoms/Link';

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold mb-4 text-white">{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;
