import React from 'react';
import ProductCard from './ProductCard';
import { allProducts } from '../data/Products'; // Import danych

interface Props {
  searchTerm: string;
}

const ProductList: React.FC<Props> = ({ searchTerm }) => {
  // Filtrowanie po nazwie
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginTop: '1rem',
  };

  return (
    <div style={gridStyle}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;