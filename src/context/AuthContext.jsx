import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
    loading: true, // Estado de carga inicial
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
        loading: false, // Carga completa
      });
    } else {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false, // Carga completa
      });
    }
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const response = await axiosClient.post('/auth/login', { correo, contrasena });
      const { token, nombre, id, rol } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, nombre, rol }));

      setAuthState({
        token,
        user: { id, nombre, rol },
        isAuthenticated: true,
        loading: false,
      });

      return { id, nombre, rol };
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
