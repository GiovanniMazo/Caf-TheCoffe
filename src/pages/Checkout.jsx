import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import AuthForm from "../components/AuthForm";
import "../styles/pages/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, user, getCartTotal, clearCart, createOrder } = useCart();
  const [step, setStep] = useState(user ? 'form' : 'auth'); // 'auth' | 'form' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [tempUserData, setTempUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    metodoPago: "tarjeta",
    nota: "",
  });

  // Skip auth if user logged in and prefill form
  useEffect(() => {
    if (user) {
      setStep('form');
      setTempUserData(null); // Use real user
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || '',
        email: user.email || '',
        telefono: user.telefono || '',
        direccion: user.direccion || ''
      }));
    }
  }, [user]);

  const handleAuthSuccess = (userData) => {
    setTempUserData(userData);
    setFormData(prev => ({
      ...prev,
      nombre: userData.nombre || userData.nombre || '',
      email: userData.email || '',
      telefono: userData.telefono || '',
      direccion: userData.direccion || ''
    }));
    setStep('form');
  };

  const handleBackToAuth = () => {
    setTempUserData(null);
    setStep('auth');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de finalizar el pedido.");
      return;
    }

    // OBLIGATORIO: debe estar autenticado para pagar
    if (!user) {
      alert("Debes iniciar sesión o registrarte para completar tu compra.");
      setStep('auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customer: {
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          address: formData.direccion
        },
        paymentMethod: formData.metodoPago,
        note: formData.nota,
        status: "pending",
      });

      setOrderId(order);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      alert("Hubo un error al procesar tu pedido. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h1 className="checkout-title">¡Pedido Confirmado!</h1>
          <p className="checkout-subtitle">
            Gracias por tu compra, {formData.nombre}!
          </p>
          <p className="order-number">
            Número de pedido: <strong>#{orderId || Date.now()}</strong>
          </p>
          <p className="success-message">
            Hemos enviado los detalles de tu pedido a tu correo electrónico.
            <br />
            Prepararemos tu café con mucho cariño ☕
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="checkout-button"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {step === 'auth' ? (
        <>
          <button 
            onClick={() => navigate('/carrito')} 
            className="back-button"
            style={{marginBottom: '1rem'}}
          >
            ← Volver al carrito
          </button>
          <AuthForm onSuccess={handleAuthSuccess} />
        </>
      ) : (
        <>
          <div className="checkout-header">
            <h1 className="checkout-title">
              {step === 'form' ? 'Finaliza tu pedido' : ''}
            </h1>
            
            <div className="account-banner">
              <div className="account-info">
                <span className="account-avatar">☕</span>
                <span className="account-name">
                  {user?.nombre || tempUserData?.nombre || 'Invitado'}
                </span>
                <span className="account-label">
                  {user ? 'Cuenta activa' : 'Sesión de invitado'}
                </span>
              </div>
              <button 
                onClick={handleBackToAuth}
                className="change-account-btn"
              >
                🔄 Cambiar cuenta
              </button>
            </div>

            <p className="checkout-subtitle">
              Completa tus datos para que podamos preparar tu café con amor 
            </p>
          </div>

          <div className="checkout-layout">
            {/* Summary */}
            <div className="checkout-summary">
              <h2 className="summary-title">Tu Pedido</h2>
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item__image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="summary-item__details">
                      <h4 className="summary-item__name">{item.name}</h4>
                      <p className="summary-item__quantity">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="summary-item__price">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <strong>{formatCurrency(getCartTotal())}</strong>
              </div>
            </div>

            {/* Form */}
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
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

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
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
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
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
                  required
                  placeholder="Calle 123 #45-67, Medellín"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nota">Nota adicional (opcional)</label>
                <textarea
                  id="nota"
                  name="nota"
                  value={formData.nota}
                  onChange={handleChange}
                  placeholder="Alguna indicación especial..."
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Método de pago</label>
                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                >
                  <option value="tarjeta">Tarjeta de crédito / débito</option>
                  <option value="efectivo">Pago en efectivo</option>
                  <option value="transferencia">Transferencia bancaria</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="checkout-button"
                disabled={isSubmitting || items.length === 0}
              >
                {isSubmitting ? "Procesando..." : `Confirmar pedido - ${formatCurrency(getCartTotal())}`}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

