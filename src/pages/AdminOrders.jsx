import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaSearch, FaCalendarAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import { fetchOrders } from '../services/api';
import '../styles/pages/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error cargando órdenes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(order.id).includes(searchTerm)
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <h1><FaShoppingBag /> Historial de Órdenes</h1>
        <p>Total de órdenes: <strong>{orders.length}</strong></p>
      </div>

      <div className="admin-orders-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar por cliente o número de orden..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="admin-orders-loading">
          <div className="admin-spinner"></div>
          <p>Cargando órdenes...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="admin-orders-empty">
          <FaShoppingBag className="empty-icon" />
          <h3>No hay órdenes registradas</h3>
          <p>Las órdenes de compra aparecerán aquí cuando los clientes realicen pedidos.</p>
        </div>
      ) : (
        <div className="admin-orders-table-container">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Orden #</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td>
                    <div className="order-client">
                      <FaUser className="client-icon" />
                      <span>{order.cliente}</span>
                    </div>
                  </td>
                  <td className="order-total">
                    <FaDollarSign className="price-icon" />
                    {formatPrice(order.total)}
                  </td>
                  <td>
                    <div className="order-date">
                      <FaCalendarAlt className="date-icon" />
                      {formatDate(order.fecha)}
                    </div>
                  </td>
                  <td>
                    <div className="order-items">
                      {order.items && order.items.length > 0 ? (
                        <span>{order.items.length} producto(s)</span>
                      ) : (
                        <span className="no-items">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

