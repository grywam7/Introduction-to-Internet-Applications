import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importuj kontekst uwierzytelnienia

const Navbar: React.FC = () => {
  const { totalItems } = useCart(); // Pobieramy liczbę przedmiotów w koszyku
  const { user } = useAuth(); // Pobieramy zalogowanego użytkownika

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Strona główna</Link>
        {user ? (
          <>
            <Link to="/orders" style={{ marginLeft: '10px' }}>Twoje zamówienia</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: '10px' }}>Logowanie</Link>
            <Link to="/register" style={{ marginLeft: '10px' }}>Rejestracja</Link>
          </>
        )}
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
