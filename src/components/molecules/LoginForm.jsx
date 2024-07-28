// src/components/molecules/LoginForm.js
import React from 'react';
import InputLogin from '../atoms/InputLogin';
import Button from '../atoms/Button';

const LoginForm = () => (
  <form className="space-y-4">
    <InputLogin type="email" placeholder="Email" />
    <InputLogin type="password" placeholder="Password" />
    <Button>Login</Button>
  </form>
);

export default LoginForm;
