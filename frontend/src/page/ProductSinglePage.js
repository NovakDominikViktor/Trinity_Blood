import React from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Container, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';

const StarRating = ({ rating, onChangeRating }) => {
  const maxRating = 5;

  const handleStarClick = (clickedRating) => {
    onChangeRating(clickedRating);
  };

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <span key={index} onClick={() => handleStarClick(index + 1)}>
      {index < rating ? <StarIcon color="primary" /> : <StarBorderIcon color="primary" />}
    </span>
  ));

  return <div>{stars}</div>;
};

const ProductDetail = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [rating, setRating] = React.useState(3); // Initial rating (you can get it from your product data)

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to the cart with a rating of ${rating} stars!`);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image={product.imageUrl} // Replace with the actual property name for the image URL in your product data
          style={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContent sx={{ width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {product.description || 'No description available for this product.'}
          </Typography>
          <StarRating rating={rating} onChangeRating={handleRatingChange} />
          <Grid container justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
