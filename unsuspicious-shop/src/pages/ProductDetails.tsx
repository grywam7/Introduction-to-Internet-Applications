import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../data/Products'; // Import danych produktów
import { useReview } from '../context/ReviewContext'; // Import kontekstu opinii
import { useAuth } from '../context/AuthContext'; // Import kontekstu uwierzytelnienia
import { useCart } from '../context/CartContext'; // Import kontekstu koszyka

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const { reviews, addReview, hasReviewed } = useReview(); // Pobierz opinie i funkcję dodawania opinii
  const { user } = useAuth(); // Pobierz zalogowanego użytkownika
  const { addToCart } = useCart(); // Pobierz funkcję dodawania do koszyka
  const [reviewContent, setReviewContent] = useState('');
  const [email, setEmail] = useState(user?.username || ''); // Domyślnie e-mail użytkownika
  const [rating, setRating] = useState<number | null>(null); // Ocena w gwiazdkach
  const [quantity, setQuantity] = useState(1); // Stan dla ilości produktów do koszyka
  const [error, setError] = useState<string | null>(null);

  // Znajdź produkt w tablicy
  const product = allProducts.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <div>
        <h1>Nie znaleziono produktu</h1>
        <p>Brak produktu o ID {productId}</p>
        <Link to="/">← Wróć na stronę główną</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      alert(`${quantity} sztuk produktu "${product.name}" dodano do koszyka!`);
      setQuantity(1); // Zresetuj ilość
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

  // Filtruj opinie dla tego produktu
  const productReviews = reviews.filter((review) => review.productId === product.id);

  return (
    <div style={{ margin: '1rem' }}>
      <h1>{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '300px', display: 'block', margin: '1rem 0' }}
        />
      )}

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

      <h3>Opis</h3>
      <p>{product.description}</p>

      <h3>Szczegóły</h3>
      <p>{product.details}</p>

      <h3>Przykłady</h3>
      <ul>
        {product.examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>

      {/* Dodawanie do koszyka */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Dodaj do koszyka</h3>
        <label>
          Ilość:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
        <button
          onClick={handleAddToCart}
          style={{
            marginLeft: '10px',
            padding: '0.5rem 1rem',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Dodaj do koszyka
        </button>
      </div>

      {/* Opinie */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Opinie</h3>
        {productReviews.length === 0 ? (
          <p>Brak opinii. Bądź pierwszą osobą, która doda opinię!</p>
        ) : (
          <ul>
            {productReviews.map((review, index) => (
              <li key={index}>
                <strong>{review.author}</strong> ({review.rating}/5): {review.content}
              </li>
            ))}
          </ul>
        )}

        {/* Formularz dodawania opinii */}
        {!hasReviewed(product.id, email) && (
          <form onSubmit={handleAddReview} style={{ marginTop: '1rem' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <label>
                Twój e-mail:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
              </label>
            </div>
            <div>
              <label>
                Treść opinii:
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  required
                  style={{ width: '100%', height: '80px', marginBottom: '0.5rem' }}
                />
              </label>
            </div>
            <div>
              <label>
                Ocena (1-5):
                <input
                  type="number"
                  value={rating || ''}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min="1"
                  max="5"
                  required
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
              </label>
            </div>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                background: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
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
