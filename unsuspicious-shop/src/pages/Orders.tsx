import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data/Products'; // Import pełnej listy produktów

const Orders: React.FC = () => {
  const { orders } = useCart();
  const { user } = useAuth();

  const userOrders = orders.filter((order) => order.username === user?.username);

  const handleExportOrders = () => {
    if (userOrders.length === 0) {
      alert('Nie masz zamówień do eksportu.');
      return;
    }

    const dataStr = JSON.stringify(userOrders, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `orders_${user?.username}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSingleOrder = (orderIndex: number) => {
    const order = userOrders[orderIndex];
    if (!order) return;

    const detailedOrder = {
      username: order.username,
      total: order.total,
      items: order.items.map((item) => {
        const productDetails = allProducts.find((product) => product.id === item.productId);
        return {
          ...productDetails,
          quantity: item.quantity,
        };
      }),
    };

    const dataStr = JSON.stringify(detailedOrder, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${orderIndex + 1}_${user?.username}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Twoje zamówienia</h1>

      {userOrders.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Brak zamówień.</p>
      ) : (
        <>
          {userOrders.map((order, index) => (
            <div
              key={index}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Zamówienie #{index + 1}
              </h2>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Łączna cena:</strong> {order.total} zł
              </p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: idx < order.items.length - 1 ? '1px solid #ddd' : 'none',
                    }}
                  >
                    <span>
                      Produkt ID: {item.productId}, Ilość: {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleExportSingleOrder(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  background: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#0056b3')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#007BFF')}
              >
                <i className="fas fa-file-download" style={{ marginRight: '0.5rem' }}></i>
                Pobierz zamówienie
              </button>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={handleExportOrders}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem 1.5rem',
                background: '#28A745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#218838')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#28A745')}
            >
              <i className="fas fa-file-download" style={{ marginRight: '0.5rem' }}></i>
              Eksportuj historię zamówień
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
