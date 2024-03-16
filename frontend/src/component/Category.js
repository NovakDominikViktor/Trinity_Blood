import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const Category = ({ products, searchTerm }) => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(product => 
      product.category.name.toLowerCase() === categoryName.toLowerCase() &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCategoryProducts(filteredProducts);
  }, [categoryName, products, searchTerm]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 style={{ textAlign: 'center' }}>{categoryName}</h2>
        </Grid>
        {categoryProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Category;
