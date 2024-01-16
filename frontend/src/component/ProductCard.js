// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const ProductCard = ({ product }) => {
  const defaultImage = 'defaultImage.jpg'; // Replace with your default image path or URL

  return (
    <Card>
      <img
        src={"https://pbs.twimg.com/profile_images/1032679134932160513/o2g4sp9G_400x400.jpg"}
        alt={product.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
