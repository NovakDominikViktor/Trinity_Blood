import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../component/ProductCard';

const Home = ({ products, searchTerm }) => {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      {filteredProducts.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};


export default Home;
