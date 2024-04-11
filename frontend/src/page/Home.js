import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // importáljuk a useNavigate hook-ot
import ProductCard from '../component/ProductCard';

const Home = ({ products, searchTerm}) => {
  // Rendezés időbélyeg alapján csökkenő sorrendben
  const sortedProducts = products.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
  
  // A legújabb 8 termék kiválasztása és szűrése a keresési kifejezés alapján
  const newestFilteredProducts = sortedProducts
    .filter(product => product.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .slice(0, 8); // Csak az első 8 elem

  const navigate = useNavigate(); // useNavigate hook

  const handleViewAllProducts = () => {
    navigate('/allproducts'); // navigálás az összes terméket megjelenítő oldalra
  };

  return (
    <div>
    <Grid container spacing={3}>
      {newestFilteredProducts.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product}/>
        </Grid>
      ))}
    </Grid>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button variant="contained" onClick={handleViewAllProducts} style={{ backgroundColor: "#333" }}>
        All products
      </Button>
    </div>
  </div>
  );
};

export default Home;
