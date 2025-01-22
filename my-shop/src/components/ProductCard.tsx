import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/Products'; // Importuj dane produktów
import { useCart } from '../context/CartContext'; // Importuj kontekst koszyka

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart(); // Pobierz funkcję addToCart z kontekstu

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      {/* Ikona lub obrazek, jeśli jest dostępna */}
      {product.icon && (
        <img
          src={product.icon}
          alt={product.name}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      )}

      <h2>{product.name}</h2>
      <p>Cena planu: {product.price} zł</p>
      <p>Koszt wykonania: {product.cost} zł</p>
      <p>Ryzyko śmierci (0-10): {product.death}</p>
      <p>Szacowane ofiary: {product.kills}</p>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/product/${product.id}`}>
          <button>Szczegóły</button>
        </Link>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => addToCart(product)} // Dodaj produkt do koszyka
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
