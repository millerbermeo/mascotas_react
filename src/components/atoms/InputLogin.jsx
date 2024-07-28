import React from 'react';

const InputLogin = ({ type, placeholder, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full p-2 border rounded ${className}`}
  />
);

export default InputLogin