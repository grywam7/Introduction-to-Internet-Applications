import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart(); // Pobieramy liczbę przedmiotów w koszyku

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Strona główna</Link>
        <Link to="/login">Zaloguj</Link>
      </div>
      <div>
        <Link to="/cart">
          Koszyk ({totalItems}) {/* Wyświetlamy liczbę przedmiotów w koszyku */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
