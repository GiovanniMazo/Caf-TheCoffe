import React, { useState } from 'react';
import '../styles/pages/Contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        setError(data.error || 'Error al enviar el mensaje.');
      }
    } catch (err) {
      setError('❌ No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <h1>Contacto</h1>
        <p>¿Tienes preguntas? Escríbenos</p>
      </div>
      <div className="contact-page__content">
        <div className="contact-container">
          {success && <p className="contact-success">✅ Mensaje enviado con éxito!</p>}
          {error && <p className="contact-error">{error}</p>}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                placeholder="Tu mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="contact-btn">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
