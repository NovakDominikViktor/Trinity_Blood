import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Divider, Grid, List, ListItem, ListItemText, IconButton, Button, TextField, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Cart = ({ products }) => {
  const [removedProducts, setRemovedProducts] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [invalidPromoCode, setInvalidPromoCode] = useState(false);

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0;
      const productQuantity = product.quantity || 1;
      return total + productPrice * productQuantity;
    }, 0);
  };

  const shippingCost = (Math.random() * (10 - 5) + 5).toFixed(2);

  const handleRemoveProduct = (productId) => {
    const updatedRemovedProducts = [...removedProducts, productId];
    setRemovedProducts(updatedRemovedProducts);
  };

  const applyPromoCode = () => {
    if (promoCode === 'FRENCHPHARMA') {
      setInvalidPromoCode(false);
    } else {
      setInvalidPromoCode(true);
    }
  };

  const filteredProducts = products.filter((product) => !removedProducts.includes(product.id));

  return (
    <Container>
      <Card>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Termékek</Typography>
                    <Divider />
                    <List>
                      {filteredProducts.map((product) => (
                        <React.Fragment key={product.id}>
                          <ListItem>
                            <ListItemText
                              primary={product.name}
                              secondary={`Ár: ${product.price.toFixed(2)} dollár | Mennyiség: ${product.quantity || 1}`}
                            />
                            <IconButton onClick={() => handleRemoveProduct(product.id)} aria-label="remove">
                              <DeleteOutlineIcon />
                            </IconButton>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Fizetés</Typography>
                    <Divider />
                    <Typography>Összesen ({filteredProducts.length} Tétel)</Typography>
                    <Typography>{calculateTotal().toFixed(2)} dollár</Typography>
                    <Typography>Szállítás</Typography>
                    <Typography>{shippingCost} dollár</Typography>
                    <Divider />
                    <Typography variant="h6">Várható Összeg</Typography>
                    <Typography variant="h5">{(parseFloat(calculateTotal()) + parseFloat(shippingCost)).toFixed(2)} dollár</Typography>
                    
                    <Typography variant="h6">Promóciós Kód</Typography>
                    <Box display="flex">
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="contained" onClick={applyPromoCode}>Hozzáadás</Button>
                    </Box>
                    {invalidPromoCode && (
                      <Box display="flex" alignItems="center" color="error.main">
                        <ErrorOutlineIcon />
                        <Typography variant="body2" ml={1}>
                          Érvénytelen promo kód
                        </Typography>
                      </Box>
                    )}

                    <Divider />
                    <Typography variant="subtitle1">
                      <b>Take advantage of our exclusive offers:</b>
                      <br />
                      FRENCHPHARMA - Ingyenes szállítás 49€ felett.
                    </Typography>
                    <Divider />
                    <NavLink
  to={{
    pathname: "/proceed-payment",
    state: { products: filteredProducts } // Átadja a szűrt termékeket a ProceedWithPayment komponensnek
  }}
  style={{ textDecoration: 'none' }}
>
  <Button
    type="submit"
    fullWidth
    variant="contained"
  >
    Fizetés
  </Button>
</NavLink>

                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
              A kosarad üres
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Cart;
