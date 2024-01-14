import React from 'react';
import {Button,Card,CardContent,Container,Divider,Grid,List,ListItem,ListItemText,Typography,IconButton,Box,Link,Paper,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';

const Cart = () => {

  
  // Dummy product data (replace this with your actual data)
  const products = [
    { id: 1, name: 'Product 1', price: 22.99, quantity: 1 },
  ];

  const removeProduct = (productId) => {
    // Implement your logic to remove the product from the cart
    console.log(`Remove product with ID: ${productId}`);
  };
  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0; // Use 0 if product.price is undefined
      return total + productPrice * product.quantity;
    }, 0);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          {products.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <List>
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        <ListItem>
                          <ListItemText
                            primary={product.name}
                            secondary={`Mennyiség: ${product.quantity} - ${product.price.toFixed(2)} dollár`}
                          />
                          <IconButton onClick={() => removeProduct(product.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <Box textAlign="right">
                    <Typography variant="h6">Fizetés</Typography>
                    <Typography variant="subtitle1">
                      {/* Additional sections */}
                      <Divider />
                      <Typography variant="subtitle1">
                        Promo kód alkalmazása
                      </Typography>
                      {/* Additional sections for cost details */}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography>Összesen ({products.length} Tétel{products.length > 1 && 'ek'})</Typography>
                          <Typography>{calculateTotal().toFixed(2)} Ft</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>Szállítás</Typography>
                          <Typography>6.95 Ft</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography>Adó</Typography>
                          <Typography>0.00 Ft</Typography>
                        </Grid>
                      </Grid>
                      {/* Additional sections */}
                      <Divider />
                      <Typography variant="h6">Várható Összeg</Typography>
                      <Typography variant="h5">{(calculateTotal() + 6.95).toFixed(2)} dollár</Typography>
                      <Typography>Akedvezményed 0.00 Ft</Typography>
                      <Typography>Még 12.00 Ft a Free szállítástól?</Typography>
                      {/* Additional sections */}
                      <Divider />
                      <Typography>vagy 4 kamatmentes részletben: {(calculateTotal() / 4).toFixed(2)} dollár-ral</Typography>
                      <Typography variant="h6" component="span">
                        ⓘ
                      </Typography>
                      {/* Additional sections */}
                      <Divider />
                      <Typography variant="h6">Elfogadott Fizetési Módok</Typography>
                      {/* Additional sections */}
                      <Divider />
                      <NavLink to="/proceed-payment" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" fullWidth>
                          Fizetés
                        </Button>
                      </NavLink>
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Box textAlign="center" p={3}>
              <Typography variant="h5">A kosarad üres</Typography>
              <Typography variant="subtitle1">
                Jelentkezz be, hogy láthasd, mit adtál a kosaradba.
              </Typography>
              <Button variant="contained" color="primary" href="/">
                Vásárlás Kezdése
              </Button>
            </Box>
          )}
        </CardContent>
        {/* Other card content sections remain unchanged */}
        {/* ... */}
      </Card>
    </Container>
  );
};

export default Cart;
