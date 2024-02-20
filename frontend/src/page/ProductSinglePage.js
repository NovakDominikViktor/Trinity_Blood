import React from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Container, Grid, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';

const StarRating = ({ rating, onChangeRating }) => {
  const maxRating = 5;

  const handleStarClick = (clickedRating) => {
    onChangeRating(clickedRating);
  };

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <span key={index} onClick={() => handleStarClick(index + 1)} style={{ cursor: 'pointer' }}>
      {index < rating ? <StarIcon fontSize="large" style={{ color: '#ff9800' }} /> : <StarBorderIcon fontSize="large" style={{ color: '#ff9800' }} />}
    </span>
  ));

  return (
    <div style={{ textAlign: 'center', marginTop: '8px' }}>
      {stars}
    </div>
  );
};

const ProductDetail = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [rating, setRating] = React.useState(3); // Initial rating (you can get it from your product data)
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to the cart with a rating of ${rating} stars and ${quantity} quantity!`);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image="/path/to/your/image.jpg" // Replace with the actual path to your image
          style={{ objectFit: 'cover', width: '40%' }}
        />
        <CardContent sx={{ width: '60%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {product.description || 'No description available for this product.'}
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ mt: 2, mb: 2, width: '100%' }}
          />
          <Grid container justifyContent="center">
            <StarRating rating={rating} onChangeRating={handleRatingChange} />
          </Grid>
          <Grid container justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 2, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
              Add to Cart
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
