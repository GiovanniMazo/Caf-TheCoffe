import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShoppingBag, FaBox, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { fetchUsers, fetchOrders, fetchProducts } from '../services/api';
import { useAdmin } from '../context/AdminContext';
import '../styles/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const { admin } = useAdmin();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentUsers: [],
    recentOrders: [],
    loading: true
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [users, orders, products] = await Promise.all([
          fetchUsers(),
          fetchOrders(),
          fetchProducts()
        ]);

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalProducts: products.length,
          recentUsers: users.slice(0, 5),
          recentOrders: orders.slice(0, 5),
          loading: false
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Usuarios Registrados',
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      link: '/admin/usuarios'
    },
    {
      title: 'Órdenes Totales',
      value: stats.totalOrders,
      icon: <FaShoppingBag />,
      color: '#10b981',
      bgColor: '#ecfdf5',
      link: '/admin/ordenes'
    },
    {
      title: 'Productos',
      value: stats.totalProducts || '-',
      icon: <FaBox />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      link: '/admin/productos'
    },
    {
      title: 'Visitas Hoy',
      value: '1,245',
      icon: <FaChartLine />,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      link: null
    }
  ];

  if (stats.loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="admin-spinner"></div>
        <p>Cargando panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Bienvenido de vuelta, <strong>{admin?.nombre || 'Administrador'}</strong></p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="admin-stat-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="admin-stat-icon" style={{ background: card.bgColor, color: card.color }}>
              {card.icon}
            </div>
            <div className="admin-stat-info">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
            {card.link && (
              <Link to={card.link} className="admin-stat-link">
                <FaArrowRight />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="admin-dashboard-sections">
        {/* Recent Users */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <h2><FaUsers /> Últimos Usuarios</h2>
            <Link to="/admin/usuarios" className="admin-section-link">
              Ver todos <FaArrowRight />
            </Link>
          </div>
          <div className="admin-section-content">
            {stats.recentUsers.length === 0 ? (
              <p className="admin-empty-state">No hay usuarios registrados aún.</p>
            ) : (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-table-avatar">
                            {user.nombre?.charAt(0)?.toUpperCase()}
                          </div>
                          <span>{user.nombre}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`admin-badge ${user.rol === 'admin' ? 'admin-badge-admin' : 'admin-badge-cliente'}`}>
                          {user.rol}
                        </span>
                      </td>
                      <td>{user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <h2><FaShoppingBag /> Últimas Órdenes</h2>
            <Link to="/admin/ordenes" className="admin-section-link">
              Ver todas <FaArrowRight />
            </Link>
          </div>
          <div className="admin-section-content">
            {stats.recentOrders.length === 0 ? (
              <p className="admin-empty-state">No hay órdenes registradas aún.</p>
            ) : (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.cliente}</td>
                      <td className="admin-price">${order.total}</td>
                      <td>{order.fecha ? new Date(order.fecha).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

