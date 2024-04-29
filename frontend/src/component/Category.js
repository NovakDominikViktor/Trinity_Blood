import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { FaSadTear } from 'react-icons/fa';

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
        {categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="100%">
            <Box textAlign="center">
              <FaSadTear style={{ fontSize: '48px', marginBottom: '10px' }} />
              <Typography variant="h6">No products found in {categoryName} category.</Typography>
            </Box>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default Category;
