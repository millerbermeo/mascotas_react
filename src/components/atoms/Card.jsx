import React from 'react';

const Card = ({ title, content }) => (
  <div className="p-4 bg-white shadow-md rounded w-64">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p>{content}</p>
  </div>
);

export default Card;
