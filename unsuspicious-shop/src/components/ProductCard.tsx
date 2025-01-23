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
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '300px',
        margin: '1rem auto',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)') }
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)') }
    >
      {/* Ikona produktu */}
      {product.icon && (
        <img
          src={product.icon}
          alt={product.name}
          style={{
            width: '230px',
            height: '230px',
            objectFit: 'cover',
            marginTop: '0.5rem',
            borderRadius: '8px',
          }}
        />
      )}

      {/* Nazwa produktu */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
        {product.name}
      </h2>

      {/* Szczegóły produktu */}
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
        <strong>Cena:</strong> {product.price} zł
      </p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
        <strong>Koszt:</strong> {product.cost} zł
      </p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
        <strong>Ryzyko śmierci:</strong> {product.death}/10
      </p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
        <strong>Szacowane ofiary:</strong> {product.kills}
      </p>

      {/* Akcje */}
      <div style={{ marginTop: '1rem' }}>
        {/* Przycisk Szczegóły */}
        <Link to={`/product/${product.id}`}>
          <button
            style={{
              padding: '0.5rem 1rem',
              marginRight: '10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              alignItems: 'center',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0056b3') }
            onMouseLeave={(e) => (e.currentTarget.style.background = '#007BFF') }
          >
            <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>
            Szczegóły
          </button>
        </Link>

        {/* Przycisk Dodaj do koszyka */}
        <button
          style={{
            padding: '0.5rem 1rem',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignItems: 'center',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1e7e34') }
          onMouseLeave={(e) => (e.currentTarget.style.background = '#28a745') }
          onClick={() => addToCart(product, 1)}
        >
          <i className="fas fa-shopping-cart" style={{ marginRight: '0.5rem' }}></i>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
