
/*import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductCard from '../component/ProductCard';

const Home = ({ products, searchTerm }) => {
  const sortedProducts = products.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate('/allproducts');
  };

  const slideshowProducts = sortedProducts
    .filter(product => product.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .slice(0, 8);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {slideshowProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleViewAllProducts} style={{ backgroundColor: "#333" }}>
          All products
        </Button>
      </div>
    </div>
  );
};

export default Home;
*/