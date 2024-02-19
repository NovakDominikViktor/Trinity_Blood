import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Divider, Grid, Typography, TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  // Dummy product data (replace this with your actual data)
  const products = [
    { id: 1, name: 'Termék 1', price: 22.99, quantity: 1 },
  ];

  const [promoCode, setPromoCode] = useState('');
  const [invalidPromoCode, setInvalidPromoCode] = useState(false);

  const removeProduct = (productId) => {
    // Implement your logic to remove the product from the cart
    console.log(`Termék eltávolítva azonosítóval: ${productId}`);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0; // Use 0 if product.price is undefined
      return total + productPrice * product.quantity;
    }, 0);
  };

  const applyPromoCode = () => {
    // Dummy logic for checking the promo code
    if (promoCode === 'FRENCHPHARMA') {
      setInvalidPromoCode(false);
    } else {
      setInvalidPromoCode(true);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          {products.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Termékek</Typography>
                    <Divider />
                    <List>
                      {products.map((product) => (
                        <React.Fragment key={product.id}>
                          <ListItem>
                            <ListItemText
                              primary={product.name}
                              secondary={`Mennyiség: ${product.quantity} - ${product.price.toFixed(2)} dollár`}
                            />
                            <DeleteOutlineIcon onClick={() => removeProduct(product.id)} />
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Összesen ({products.length} Tétel{products.length > 1 && 'ek'})</Typography>
                        <Typography>{calculateTotal().toFixed(2)} Ft</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Szállítás</Typography>
                        <Typography>6.95 Ft</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        <Typography variant="h6">Várható Összeg</Typography>
                        <Typography variant="h5">{(calculateTotal() + 6.95).toFixed(2)} dollár</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        <Typography variant="h6">Promóciós Kód</Typography>
                        <Box display="flex">
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <Button variant="contained" onClick={applyPromoCode} style={{ mt: 3, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>Hozzáadás</Button>
                        </Box>
                        {invalidPromoCode && (
                          <Box display="flex" alignItems="center" color="error.main" mt={1}>
                            <ErrorOutlineIcon />
                            <Typography variant="body2" ml={1}>
                              Érvénytelen promo kód
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        <Typography variant="subtitle1">
                          <b>Take advantage of our exclusive offers:</b>
                          <br />
                          FRENCHPHARMA - Ingyenes szállítás 49€ felett.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        <NavLink to="/proceed-payment" style={{ textDecoration: 'none' }}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
              Fizetés
            </Button>
                        </NavLink>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Box textAlign="center" p={3}>
              <Typography variant="h5">A kosarad üres</Typography>
              <Typography variant="subtitle1">
                Jelentkezz be, hogy láthasd, mit adtál a kosaradba.
              </Typography>
              <Button variant="contained" color="primary" href="/" style={{ backgroundColor: '#1976d2', color: 'white' }}>
                Vásárlás Kezdése
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Cart;
