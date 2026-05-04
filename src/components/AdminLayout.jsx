import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import {
  FaCoffee,
  FaTachometerAlt,
  FaUsers,
  FaShoppingBag,
  FaBox,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import '../styles/components/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { admin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { to: '/admin/usuarios', icon: <FaUsers />, label: 'Usuarios' },
    { to: '/admin/ordenes', icon: <FaShoppingBag />, label: 'Órdenes' },
    { to: '/admin/productos', icon: <FaBox />, label: 'Productos' },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <button className="admin-menu-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="admin-mobile-brand">
          <FaCoffee />
          <span>Coffee Club Admin</span>
        </div>
        <div className="admin-mobile-spacer"></div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon">
            <FaCoffee />
          </div>
          <div className="admin-brand-text">
            <h3>Coffee Club</h3>
            <span>Panel Admin</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {admin?.nombre?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-name">{admin?.nombre || 'Admin'}</span>
              <span className="admin-user-role">Administrador</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

