import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importuj kontekst uwierzytelnienia

const Navbar: React.FC = () => {
  const { totalItems } = useCart(); // Pobieramy liczbę przedmiotów w koszyku
  const { user } = useAuth(); // Pobieramy zalogowanego użytkownika

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: '#f5f5f5',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            marginRight: '1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#007BFF',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <i className="fas fa-home" style={{ marginRight: '0.5rem' }}></i> Strona główna
        </Link>
        {user ? (
          <Link
            to="/orders"
            style={{
              marginLeft: '10px',
              fontWeight: 'bold',
              textDecoration: 'none',
              color: '#007BFF',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <i className="fas fa-box" style={{ marginRight: '0.5rem' }}></i> Twoje zamówienia
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginLeft: '10px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#007BFF',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <i className="fas fa-sign-in-alt" style={{ marginRight: '0.5rem' }}></i> Logowanie
            </Link>
            <Link
              to="/register"
              style={{
                marginLeft: '10px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#007BFF',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <i className="fas fa-user-plus" style={{ marginRight: '0.5rem', marginLeft: '1rem' }}></i> Rejestracja
            </Link>
          </>
        )}
      </div>
      <div>
        <Link
          to="/cart"
          style={{
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#007BFF',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <i className="fas fa-shopping-cart" style={{ marginRight: '0.5rem' }}></i> Koszyk ({totalItems})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
