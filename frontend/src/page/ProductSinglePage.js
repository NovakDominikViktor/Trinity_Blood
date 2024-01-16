import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Card, CardContent, CardMedia, Container } from '@mui/material';

const ProductDetail = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to the cart!`);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          alt={product.name}
          height="200"
          width="200"
          src={product.imageUrl} // Replace with the actual property name for the image URL in your product data
          style={{ objectFit: 'cover', width: '100%', maxWidth: '200px' }}
        />
        <CardContent sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description || 'No description available for this product.'}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
