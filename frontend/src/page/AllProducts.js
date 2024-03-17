import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import ProductCard from '../component/ProductCard';

const AllProducts = ({ products, searchTerm }) => {
  const [sortType, setSortType] = useState('id'); // Rendezés típusa (alapértelmezetten az "id" alapján)
  const [sortDirection, setSortDirection] = useState('asc'); // Rendezés iránya (alapértelmezetten növekvő)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Rendezés általános rendezési típus és irány alapján
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortType === 'price') {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
    } else if (sortType === 'name') {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortType === 'id') {
      return sortDirection === 'asc' ? a.id - b.id : b.id - a.id; // "id" szerinti rendezés
    }
    return 0; // Alapértelmezett: nem rendezés
  });

  return (
    <div>
      {/* Szűrők */}
      <Box mb={2} display="flex" justifyContent="center">
        <TextField
          select
          label="Sort by"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          sx={{ marginRight: 1, width: '200px' }} // Hosszabb TextField
        >
          <MenuItem value="id">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </TextField>

        <TextField
          select
          label="Sort direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          sx={{ marginLeft: 1, width: '200px' }} // Hosszabb TextField
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Box>

      {/* Termékek megjelenítése */}
      <Grid container spacing={3}>
        {sortedProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;
