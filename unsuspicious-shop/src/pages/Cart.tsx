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
      <div>
        <h1>Twój koszyk</h1>
        <p>Koszyk jest pusty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Twój koszyk</h1>
      <p>Liczba produktów: {totalItems}</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Ilość: {item.quantity}</p>
            <p>Cena: {item.price} zł</p>
            <p>Łączna cena: {item.price * item.quantity} zł</p>
            <button onClick={() => removeFromCart(item.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <h3>Łączna cena: {totalPrice} zł</h3>
      <button onClick={handlePlaceOrder} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Zatwierdź zamówienie
      </button>
    </div>
  );
};

export default Cart;
