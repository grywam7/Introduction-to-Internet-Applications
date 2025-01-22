import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalItems } = useCart();

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
      <p>Łączna liczba produktów: {totalItems}</p>
      <button onClick={clearCart}>Wyczyść koszyk</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Cena: {item.price} zł</p>
            <p>Ilość: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Usuń 1 sztukę</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
