import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Container, Grid, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';
import CommentForm from '../component/Comment';
import CommentList from '../component/CommentList';

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

const ProductSinglePage = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [rating, setRating] = useState(3);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Termék nem található</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity); // A `quantity` érték átadása is
    alert(`${product.name} hozzáadva a kosárhoz: ${quantity} darab, ${rating} csillaggal!`);
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
    <div>
    <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image={product.imageUrl || 'https://pbs.twimg.com/profile_images/1032679134932160513/o2g4sp9G_400x400.jpg'}
          style={{ objectFit: 'cover', width: '40%' }}
        />
        <CardContent sx={{ width: '60%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Ár: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {product.description || 'Nincs leírás elérhető erre a termékre.'}
          </Typography>
          <TextField
            label="Mennyiség"
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
              Kosárba
            </Button>
          </Grid>
        </CardContent>
      </Card>
      
    </Container>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CommentForm productId={productId} />
      </div>

      <div style={{ marginTop: '20px' }}>
        {/* CommentList komponens */}
        <CommentList productId={productId} />
      </div>
    </div>
    
  );
};

export default ProductSinglePage;
