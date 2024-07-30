import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import Button from '../atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("login", formValues.password, formValues.email);
      const user = await login(formValues.email, formValues.password);
      
      if (user.rol === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/pets');
      }
    } catch (error) {
      console.error('Failed to login', error);
      alert('Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
