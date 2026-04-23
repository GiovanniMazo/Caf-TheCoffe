import React, { useState } from 'react';
import useNewsletter from '../hooks/useNewsletter';
import { FaWhatsapp, FaTelegram, FaEnvelope } from 'react-icons/fa';
import '../styles/components/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { subscribe, loading, error, success } = useNewsletter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      if (!error) setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__left">
          <h2 className="footer__title">The Coffee Club</h2>
          <p>Café artesanal Gio.</p>
          <div className="social-links">
            <a href="https://wa.me/3249184892" className="social-icon" aria-label="WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="https://t.me/thecoffeeclub" className="social-icon" aria-label="Telegram" target="_blank" rel="noreferrer"><FaTelegram /></a>
            <a href="mailto:info@thecoffeeclub.com" className="social-icon" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>

        <div className="footer__newsletter">
          <h3>Suscríbete</h3>
          <form onSubmit={handleSubmit} className="footer__form">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="footer__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer__submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Suscribirse'}
            </button>
          </form>
          {error && <p className="footer__error">{error}</p>}
          {success && <p className="footer__success">¡Gracias por suscribirte!</p>}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Gio Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;