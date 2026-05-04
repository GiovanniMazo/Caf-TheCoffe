import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import { FaCoffee, FaShoppingCart, FaBars, FaTimes, FaCog } from "react-icons/fa";
import "../styles/components/Header.css";

export default function Header({ currentPath = "/" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { getItemCount } = useCart();
  const { isAdmin } = useAdmin();
  const [cartBounce, setCartBounce] = useState(false);
  const itemCount = getItemCount();

  useEffect(() => {
    if (itemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Determinar el tipo de página para aplicar estilos diferentes
  const isHomePage = currentPath === "/";
  const isProductsPage = currentPath === "/productos";
  const isAboutPage = currentPath === "/sobre-mi";
  const isContactPage = currentPath === "/contacto";
  const isBlogPage = currentPath === "/blog";
  const isRecipesPage = currentPath === "/recetas";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Construir clases dinámicas
  const headerClasses = [
    "header",
    isScrolled ? "header--scrolled" : "",
    isHomePage ? "header--home" : "",
    isProductsPage ? "header--products" : "",
    isAboutPage ? "header--about" : "",
    isContactPage ? "header--contact" : "",
    isBlogPage ? "header--blog" : "",
    isRecipesPage ? "header--recipes" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClasses}>
      <nav className="nav">
        <div className="nav__left">
          <Link to="/" className="nav__logo" onClick={closeMenu}>
            <span className="nav__logo-icon">
              <FaCoffee />
              <span className="steam steam-1"></span>
              <span className="steam steam-2"></span>
              <span className="steam steam-3"></span>
            </span>
            <h1 className="nav__title">Coffe Club</h1>
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
            <NavLink to="/carrito" className={`nav__link nav__link--cart ${cartBounce ? 'cart-bounce' : ''}`} onClick={closeMenu}>
              <FaShoppingCart className="cart-icon" />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/login" className="nav__link nav__link--admin" onClick={closeMenu}>
              <FaCog className="admin-icon" />
              {isAdmin() ? 'Panel Admin' : 'Admin'}
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
