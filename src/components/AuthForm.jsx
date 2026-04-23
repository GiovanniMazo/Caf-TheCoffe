import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components/AuthForm.css';

const AuthForm = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { registerUser, loginUser } = useCart();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  });

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
      let userData;
      if (activeTab === 'register') {
        const registerData = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          telefono: formData.telefono,
          direccion: formData.direccion
        };
        await registerUser(registerData);
        // Auto-login después de registro exitoso
        userData = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        const loginData = {
          email: formData.email,
          password: formData.password
        };
        userData = await loginUser(loginData);
      }
      onSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Accede a tu cuenta</h2>
      <p className="auth-subtitle">Para continuar con tu compra</p>

      <div className="auth-tabs">
        <button 
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Registro
        </button>
        <button 
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Iniciar Sesión
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {activeTab === 'register' && (
          <>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tucorreo@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Tu contraseña"
          />
        </div>

        {activeTab === 'register' && (
          <>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="300 123 4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección de entrega</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Calle 123 #45-67"
              />
            </div>
          </>
        )}

        {error && (
          <div className="error-message">
            {error}
            {error.includes('no está registrado') && (
              <button 
                type="button"
                className="error-action-btn"
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
              >
                Crear cuenta ahora
              </button>
            )}
          </div>
        )}

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Procesando...' : activeTab === 'register' ? 'Crear cuenta y continuar' : 'Iniciar sesión y continuar'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

