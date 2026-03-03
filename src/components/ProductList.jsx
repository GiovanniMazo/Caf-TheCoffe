import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Café Colombiano Premium', description: 'Granos selectos de las montañas colombianas', price: 15.99, image: 'https://source.unsplash.com/800x600/?coffee,beans&sig=1' },
  { id: 2, name: 'Café Espresso Italiano', description: 'Mezcla perfecta para un espresso intenso', price: 18.99, image: 'https://source.unsplash.com/800x600/?espresso&sig=2' },
  { id: 3, name: 'Café de Guatemala', description: 'Sabor suave con notas de chocolate', price: 16.99, image: 'https://source.unsplash.com/800x600/?coffee,guatemala&sig=3' },
  { id: 4, name: 'Café Brasil Santos', description: 'Dulce y aromático con cuerpo medio', price: 17.99, image: 'https://source.unsplash.com/800x600/?coffee,brazil&sig=4' },
  { id: 5, name: 'Café Etiopía Yirgacheffe', description: 'Notas florales y cítricas', price: 19.99, image: 'https://source.unsplash.com/800x600/?ethiopia,coffee&sig=5' },
  { id: 6, name: 'Café Costa Rica Tarrazu', description: 'Brillante acidez con notas de frutas', price: 18.99, image: 'https://source.unsplash.com/800x600/?costarica,coffee&sig=6' },
  { id: 7, name: 'Café Kenya AA', description: 'Intenso con notas de frutas rojas', price: 20.99, image: 'https://source.unsplash.com/800x600/?kenya,coffee&sig=7' },
  { id: 8, name: 'Café Sumatra Mandheling', description: 'Terroso con notas especiadas', price: 19.99, image: 'https://source.unsplash.com/800x600/?sumatra,coffee&sig=8' },
  { id: 9, name: 'Café Jamaica Blue Mountain', description: 'Suave y perfectamente balanceado', price: 49.99, image: 'https://source.unsplash.com/800x600/?jamaica,coffee&sig=9' },
  { id: 10, name: 'Café Honduras SHG', description: 'Dulce con notas de caramelo', price: 16.99, image: 'https://source.unsplash.com/800x600/?honduras,coffee&sig=10' }
];

const ProductList = ({ viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Mostrar notificación
    setIsCartVisible(true);
    setTimeout(() => setIsCartVisible(false), 2000);
  };

  return (
    <section className="products-section" id="products">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <div className={`cart-notification ${isCartVisible ? 'active' : ''}`}>
        ¡Producto agregado al carrito!
      </div>
    </section>
  );
};

export default ProductList;
