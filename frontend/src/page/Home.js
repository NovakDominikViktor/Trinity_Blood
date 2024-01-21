// Home.jsx
import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../component/ProductCard';
import Footer from './Footer';

const Home = ({ products, selectedCategory }) => {
  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h2>Product List</h2>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
};

export default Home;
