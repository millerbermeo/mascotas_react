import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import {Button} from "@nextui-org/button";
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



  const atras = () => {
    navigate('/pets')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
      size='lg'
        type="email"
        placeholder="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <Input
       size='lg'
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange}
      />
<div className='flex gap-2'>
<Button color='primary' type="submit">Login</Button>
<Button  onClick={atras}>Atras</Button>
</div>
    </form>
  );
};

export default LoginForm;
