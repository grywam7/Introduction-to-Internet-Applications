import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from '../data/Products'; // Import danych produktów
import { useReview } from '../context/ReviewContext'; // Import kontekstu opinii
import { useAuth } from '../context/AuthContext'; // Import kontekstu uwierzytelnienia
import { useCart } from '../context/CartContext'; // Import kontekstu koszyka

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const { reviews, addReview, hasReviewed } = useReview();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [reviewContent, setReviewContent] = useState('');
  const [email, setEmail] = useState(user?.username || '');
  const [rating, setRating] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const product = allProducts.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Nie znaleziono produktu</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      alert(`${quantity} sztuk produktu "${product.name}" dodano do koszyka!`);
      setQuantity(1);
    } else {
      alert('Wprowadź poprawną ilość!');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !reviewContent.trim() || rating === null) {
      setError('Wszystkie pola muszą być wypełnione.');
      return;
    }

    if (hasReviewed(product.id, email)) {
      setError('Już dodałeś opinię dla tego produktu.');
      return;
    }

    addReview(product.id, email, reviewContent, rating);
    alert('Dziękujemy za dodanie opinii!');
    setReviewContent('');
    setRating(null);
    setError(null);
  };

  const productReviews = reviews.filter((review) => review.productId === product.id);

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
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <p>
            <strong>Cena:</strong> {product.price} zł
          </p>
          <p>
            <strong>Koszt:</strong> {product.cost} zł
          </p>
          <p>
            <strong>Ryzyko zgonu (0-10):</strong> {product.death}
          </p>
          <p>
            <strong>Szacowane ofiary:</strong> {product.kills}
          </p>
          <p>
            <strong>Szansa na sukces (0-10):</strong> {10 - product.interception}
          </p>
        </div>
      </div>

      <h3>Opis</h3>
      <p style={{ marginBottom: '1.5rem' }}>{product.description}</p>

      <h3>Szczegóły</h3>
      <p style={{ marginBottom: '1.5rem' }}>{product.details}</p>

      <h3>Przykłady</h3>
      <ul style={{ marginBottom: '1.5rem' }}>
        {product.examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Dodaj do koszyka</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <label style={{ marginRight: '1rem' }}>Ilość:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            style={{
              width: '60px',
              marginRight: '1rem',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <button
            onClick={handleAddToCart}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1e7e34')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#28a745')}
          >
            <i className="fas fa-shopping-cart" style={{ marginRight: '0.5rem' }}></i>
            Dodaj do koszyka
          </button>
        </div>
      </div>

      <div>
        <h3>Opinie</h3>
        {productReviews.length === 0 ? (
          <p>Brak opinii. Bądź pierwszą osobą, która doda opinię!</p>
        ) : (
          <ul style={{ marginBottom: '1.5rem' }}>
            {productReviews.map((review, index) => (
              <li key={index}>
                <strong>{review.author}</strong> ({review.rating}/5): {review.content}
              </li>
            ))}
          </ul>
        )}

        {!hasReviewed(product.id, email) && (
          <form onSubmit={handleAddReview}>
            {error && (
              <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label>
                Twój e-mail:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>
                Treść opinii:
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '80px',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>
                Ocena (1-5):
                <input
                  type="number"
                  value={rating || ''}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min="1"
                  max="5"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Dodaj opinię
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
