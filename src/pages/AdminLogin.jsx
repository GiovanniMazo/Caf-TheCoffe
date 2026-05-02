import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { FaCoffee, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/pages/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin, admin } = useAdmin();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Si ya está logueado como admin, redirigir al dashboard
  if (admin && admin.rol === 'admin') {
    navigate('/admin');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginAdmin(formData);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <FaCoffee />
            </div>
            <h1>Panel de Administración</h1>
            <p>Coffee Club - Acceso exclusivo para administradores</p>
          </div>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="admin-email">
                <FaEnvelope className="input-icon" />
                Correo electrónico
              </label>
              <input
                type="email"
                id="admin-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@coffeeclub.com"
                autoComplete="email"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">
                <FaLock className="input-icon" />
                Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Tu contraseña de admin"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="admin-error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verificando...
                </>
              ) : (
                <>
                  <FaLock />
                  Ingresar al Panel
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <button
              className="back-to-site"
              onClick={() => navigate('/')}
            >
              ← Volver al sitio principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

