import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../data/Products'; // Import danych

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

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

  return (
    <div style={{ margin: '1rem' }}>
      <Link to="/">← Wróć na stronę główną</Link>
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
        <strong>Ryzyko zgonu(0-10):</strong> {product.death}
      </p>
      <p>
        <strong>Szacowane ofiary:</strong> {product.kills}
      </p>
      <p>
        <strong>Szansa na sukces(0-10):</strong> {10 - product.interception}
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
    </div>
  );
};

export default ProductDetails;
