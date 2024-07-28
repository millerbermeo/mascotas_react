// src/components/organisms/LoginContainer.js
import React from 'react';
import LoginForm from '../molecules/LoginForm';
import img from '../../assets/fondo2.png';

const LoginContainer = () => (
  <div className="flex flex-col md:flex-row bg-white rounded shadow-lg max-w-4xl mx-auto my-20">
    <div className="p-6 md:w-1/2">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p className="mb-4">If you are already a member, easily log in</p>
      <LoginForm />
      <div className="flex justify-between mt-4">
        <a href="#" className="text-blue-500">Forgot your password?</a>
        <a href="#" className="text-blue-500">Register</a>
      </div>
    </div>
    <div className="md:w-1/2 hidden md:block bg-blue-100 rounded-r">
      <img src={img} alt="Login Illustration" className="h-full w-full object-cover rounded-r" />
    </div>
  </div>
);

export default LoginContainer;
