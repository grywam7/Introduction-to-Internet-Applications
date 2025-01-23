import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ padding: '1rem' }}>
      {/* Pasek wyszukiwania i przycisk pobierania */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {/* Pole wyszukiwania */}
        <input
          type="text"
          placeholder="Wyszukaj produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '1rem',
          }}
        />

        {/* Przycisk pobierania */}
        <a
          href="/products.json"
          download="products.json"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            background: '#007BFF',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = '#0056b3')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = '#007BFF')
          }
        >
          <i
            className="fas fa-download"
            style={{ marginRight: '0.5rem' }}
          ></i>
          Pobierz dane produktów
        </a>
      </div>

      {/* Lista produktów */}
      <ProductList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
