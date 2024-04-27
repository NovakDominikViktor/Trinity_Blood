import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Box, Typography } from '@mui/material';
import { FaSadTear } from 'react-icons/fa'; // Importing Sad Tear icon
import ProductCard from '../component/ProductCard';

const AllProducts = ({ products, searchTerm }) => {
  const [sortType, setSortType] = useState('id'); // Default sorting type is by id
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction is ascending

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Sort products based on sort type and sort direction
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
      return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
    }
    return 0; // Default: no sorting
  });

  return (
    <div>
      {/* Sort options */}
      <Box mb={2} display="flex" justifyContent="center">
        <TextField
          select
          label="Sort by"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          sx={{ marginRight: 1, width: '200px' }}
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
          sx={{ marginLeft: 1, width: '200px' }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Box>

      {/* Display products */}
      {sortedProducts.length > 0 ? (
        <Grid container spacing={3}>
          {sortedProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <Box textAlign="center">
            <FaSadTear style={{ fontSize: '48px', marginBottom: '10px' }} />
            <Typography variant="h6">No products found.</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllProducts;
