import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import "../styles/pages/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, createOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    metodoPago: "tarjeta",
    nota: "",
  });

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

    setIsSubmitting(true);

    try {
      // Create order with form data and cart items
      const order = await createOrder({
        customer: {
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          address: formData.direccion,
        },
        paymentMethod: formData.metodoPago,
        note: formData.nota,
        status: "pending",
      });

      setOrderId(order);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
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
      <h1 className="checkout-title">Finaliza tu pedido</h1>
      <p className="checkout-subtitle">
        Completa tus datos para que podamos preparar tu café con amor 
      </p>

      <div className="checkout-layout">
        {/* Carrito Items Summary */}
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

        {/* Checkout Form */}
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
    </div>
  );
}
