import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
 
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  console.log('Product:', product); // Console log hozzáadása

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        sx={{ position: 'relative', width: '100%', '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={product.pictureUrl? product.pictureUrl : 'https://pbs.twimg.com/profile_images/1032679134932160513/o2g4sp9G_400x400.jpg'}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <CardActions
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Button variant="contained" onClick={handleAddToCart} style={{ width: '100%', borderRadius: 0, backgroundColor: '#000', color: '#fff', padding: '8px 16px', opacity: 0.8 }}>
            Add to Cart
          </Button>
        </CardActions>
        <CardContent style={{ padding: '16px' }}>
          <Typography variant="h5" component="div" style={{ marginBottom: '8px', color: 'inherit', transition: 'color 0.3s ease' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
