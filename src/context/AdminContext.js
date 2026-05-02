import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLoginAdmin } from '../services/api';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load admin from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        localStorage.removeItem('admin');
      }
    }
    setLoading(false);
  }, []);

  // Persist admin to localStorage
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }
  }, [admin]);

  const loginAdmin = async (credentials) => {
    try {
      const response = await apiLoginAdmin(credentials);
      const adminData = response.user;
      setAdmin(adminData);
      return adminData;
    } catch (error) {
      throw error;
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  const isAdmin = () => {
    return admin && admin.rol === 'admin';
  };

  const value = {
    admin,
    loading,
    loginAdmin,
    logoutAdmin,
    isAdmin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

