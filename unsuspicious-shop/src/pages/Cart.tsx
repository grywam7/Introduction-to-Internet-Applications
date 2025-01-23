import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, totalItems, totalPrice, removeFromCart, placeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (user) {
      placeOrder(user.username); // Zatwierdź zamówienie z nazwą użytkownika
      alert('Zamówienie zostało złożone!');
      navigate('/'); // Przekierowanie na stronę główną
    } else {
      alert('Musisz być zalogowany, aby złożyć zamówienie.');
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          textAlign: 'center',
        }}
      >
        <h1>Koszyk jest pusty</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '1.5rem',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Twój koszyk</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '1rem' }}>
        Liczba produktów: <strong>{totalItems}</strong>
      </p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 0',
              borderBottom: '1px solid #ddd',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: '86px',
                    height: '86px',
                    marginRight: '1rem',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              )}
              <div>
                <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h2>
                <p style={{ margin: '0.2rem 0' }}>Ilość: {item.quantity}</p>
                <p style={{ margin: '0.2rem 0' }}>Cena: {item.price} zł</p>
                <p style={{ margin: '0.2rem 0' }}>
                  Łączna cena: <strong>{item.price * item.quantity} zł</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c82333')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#dc3545')}
            >
              <i className="fas fa-trash"></i> Usuń
            </button>
          </li>
        ))}
      </ul>
      <h3
        style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '1.5rem',
          color: '#28a745',
        }}
      >
        Łączna cena: {totalPrice} zł
      </h3>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={handlePlaceOrder}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0056b3')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#007BFF')}
        >
          <i className="fas fa-check"></i> Zatwierdź zamówienie
        </button>
      </div>
    </div>
  );
};

export default Cart;
