import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1>Strona Główna</h1>

      <div>
        <input
          type="text"
          placeholder="Wyszukaj produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <a
        href="/products.json" // Ścieżka do pliku w folderze public
        download="products.json" // Nazwa pliku podczas pobierania
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#007BFF',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Pobierz dane produktów
      </a>

      <ProductList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
