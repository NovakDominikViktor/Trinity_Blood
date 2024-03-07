import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Container, Grid, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../component/CommentList';

const ProductSinglePage = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [rating, setRating] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5098/api/Comment/ByProduct/${productId}`);
        const comments = response.data;

        if (comments.length > 0) {
          const totalRating = comments.reduce((sum, comment) => sum + comment.ratings, 0);
          const average = totalRating / comments.length;
          setAverageRating(average); // Ne kerekítsük az átlagos értékelést
          setTotalRatings(comments.length);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const interval = setInterval(fetchComments, 5000); // Frissítés 5 másodpercenként

    return () => clearInterval(interval); // Tisztítjuk az intervallumot a komponens megszűnésekor

  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} hozzáadva a kosárhoz: ${quantity} darab.`);
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

  const maxRating = 5;

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <span key={index} onClick={() => handleStarClick(index + 1)} style={{ cursor: 'pointer' }}>
      {index < averageRating && index + 1 > averageRating ? <StarHalfIcon fontSize="large" style={{ color: '#ff9800' }} /> : index < averageRating ? <StarIcon fontSize="large" style={{ color: '#ff9800' }} /> : <StarBorderIcon fontSize="large" style={{ color: '#ff9800' }} />}
    </span>
  ));

  return (
    <div>
      <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          alt={product && product.name}
          height="300"
          image={product && product.pictureUrl ? product.pictureUrl : 'https://pbs.twimg.com/profile_images/1032679134932160513/o2g4sp9G_400x400.jpg'}
          style={{ objectFit: 'cover', width: '40%' }}
        />
          <CardContent sx={{ width: '60%' }}>
            <Typography variant="h4" align="center" gutterBottom>
              {product && product.name}
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary">
              Ár: ${product ? product.price.toFixed(2) : '0.00'}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {product ? product.description || 'There is no description for this productd.' : 'Product not found'}
            </Typography>
            <TextField
              label="Mennyiség"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ mt: 2, mb: 2, width: '100%' }}
            />
            <Grid container justifyContent="center">
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                {stars}
              </div>
            </Grid>
            <Grid container justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 2, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
                Add to cart
              </Button>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
              {totalRatings !== 0 && (
                <Typography variant="subtitle1">({totalRatings})</Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
     
      <div style={{ marginTop: '20px' }}>
        <CommentList productId={productId} />
      </div>
    </div>
  );
};

export default ProductSinglePage;
