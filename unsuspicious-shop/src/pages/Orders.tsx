import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data/Products'; // Import pełnej listy produktów

const Orders: React.FC = () => {
  const { orders } = useCart();
  const { user } = useAuth();

  // Filtrowanie zamówień użytkownika
  const userOrders = orders.filter((order) => order.username === user?.username);

  // Funkcja eksportująca historię zamówień jako plik JSON
  const handleExportOrders = () => {
    if (userOrders.length === 0) {
      alert('Nie masz zamówień do eksportu.');
      return;
    }

    const dataStr = JSON.stringify(userOrders, null, 2); // Formatowanie JSON
    const blob = new Blob([dataStr], { type: 'application/json' }); // Tworzenie obiektu Blob
    const url = URL.createObjectURL(blob); // Generowanie adresu URL do pobrania

    const link = document.createElement('a'); // Tworzenie elementu <a>
    link.href = url;
    link.download = `orders_${user?.username}.json`; // Ustawienie nazwy pliku
    document.body.appendChild(link);
    link.click(); // Kliknięcie linku
    document.body.removeChild(link); // Usunięcie linku po kliknięciu
  };

  // Funkcja eksportująca pojedyncze zamówienie z pełnymi szczegółami produktów
  const handleExportSingleOrder = (orderIndex: number) => {
    const order = userOrders[orderIndex];
    if (!order) return;

    // Wzbogacenie zamówienia o pełne szczegóły produktów
    const detailedOrder = {
      username: order.username,
      total: order.total,
      items: order.items.map((item) => {
        const productDetails = allProducts.find((product) => product.id === item.productId);
        return {
          ...productDetails, // Dodaj wszystkie szczegóły produktu
          quantity: item.quantity, // Dodaj ilość
        };
      }),
    };

    // Tworzenie pliku JSON
    const dataStr = JSON.stringify(detailedOrder, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Pobieranie pliku
    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${orderIndex + 1}_${user?.username}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Twoje zamówienia</h1>
      {userOrders.length === 0 ? (
        <p>Brak zamówień.</p>
      ) : (
        <>
          {userOrders.map((order, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h2>Zamówienie #{index + 1}</h2>
              <p>Łączna cena: {order.total} zł</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    Produkt ID: {item.productId}, Ilość: {item.quantity}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleExportSingleOrder(index)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Pobierz zamówienie
              </button>
            </div>
          ))}

          {/* Przycisk do eksportu wszystkich zamówień */}
          <button
            onClick={handleExportOrders}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#28A745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Eksportuj historię zamówień
          </button>
        </>
      )}
    </div>
  );
};

export default Orders;
