import React, { useState } from "react";
import "../styles/pages/Checkout.css";

export default function Checkout() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    metodoPago: "tarjeta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`☕ Pedido confirmado para ${formData.nombre}!`);
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Finaliza tu pedido</h1>
      <p className="checkout-subtitle">
        Completa tus datos para que podamos preparar tu café con amor 
      </p>

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
          <label htmlFor="direccion">Dirección</label>
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

        <button type="submit" className="checkout-button">
          Confirmar pedido
        </button>
      </form>
    </div>
  );
}
