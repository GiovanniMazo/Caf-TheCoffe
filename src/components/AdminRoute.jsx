import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminRoute = ({ children }) => {
  const { admin, loading, isAdmin } = useAdmin();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loader"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!admin || !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;

