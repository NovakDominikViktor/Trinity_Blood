import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const Category = ({ products }) => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(product => product.category.name.toLowerCase() === categoryName.toLowerCase());
    setCategoryProducts(filteredProducts);
  }, [categoryName, products]);

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
