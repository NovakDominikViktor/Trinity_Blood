import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import ProductCard from '../component/ProductCard';
import Footer from './Footer';

const Home = ({ products, selectedCategory }) => {
  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Explore Our Products
      </Typography>
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No products found in the selected category.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Footer />
    </Container>
  );
};

export default Home;
