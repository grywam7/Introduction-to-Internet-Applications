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

      <ProductList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
