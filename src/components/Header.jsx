import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaCoffee, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { state } = useCart();
  const items = state?.items || [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <nav className="nav">
        <div className="nav__left">
          <Link to="/" className="nav__logo" onClick={closeMenu}>
            <span className="nav__logo-icon">
              <FaCoffee />
            </span>
            <h1 className="nav__title">Gio - The Coffee Club</h1>
          </Link>
        </div>

        <button
          className={`nav__toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav__menu ${isMenuOpen ? "active" : ""}`}>
          <li><NavLink to="/" end className="nav__link" onClick={closeMenu}>Inicio</NavLink></li>
          <li><NavLink to="/productos" className="nav__link" onClick={closeMenu}>Productos</NavLink></li>
          <li><NavLink to="/sobre-mi" className="nav__link" onClick={closeMenu}>Sobre mí</NavLink></li>
          <li><NavLink to="/contacto" className="nav__link" onClick={closeMenu}>Contacto</NavLink></li>
          <li><NavLink to="/blog" className="nav__link" onClick={closeMenu}>Blog</NavLink></li>
          <li><NavLink to="/recetas" className="nav__link" onClick={closeMenu}>Recetas</NavLink></li>

          <li>
            <NavLink to="/carrito" className="nav__link nav__link--cart" onClick={closeMenu}>
              <FaShoppingCart className="cart-icon" />
              {items.length > 0 && <span className="cart-badge">{items.length}</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/checkout" className="nav__link nav__link--cta" onClick={closeMenu}>
              Ordenar ahora
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
