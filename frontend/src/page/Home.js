// Home.jsx
import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../component/ProductCard';
import Footer from './Footer';

const Home = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <Grid container spacing={2}>
        {products.map((product) => (
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
