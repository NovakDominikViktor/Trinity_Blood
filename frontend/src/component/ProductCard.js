import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions } from '@mui/material';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const trimmedName = product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name;

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          transition: 'transform 0.3s',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
          borderTop: '1px solid rgba(0, 0, 0, 1)',
          borderBottom: '1px solid rgba(0, 0, 0, 1)',
          borderLeft: '1px solid rgba(0, 0, 0, 1)',
          borderRight: isHovered ? 'none' : '1px solid rgba(0, 0, 0, 1)',
          borderRadius: '0',
          marginLeft: isHovered ? '-1px' : '0',
          marginRight: '0',
        }}
      >
        <img
          src={product.pictureUrl ? product.pictureUrl : 'https://pbs.twimg.com/profile_images/1032679134932160513/o2g4sp9G_400x400.jpg'}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          width="100%" // Explicit width
          height="200px" // Explicit height
          loading="lazy" // Lazy loading
        />
        <CardActions
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          }}
        ></CardActions>
        <CardContent style={{ padding: '16px' }}>
          <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: '8px', color: 'inherit', transition: 'color 0.3s ease' }}>
            {trimmedName}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
