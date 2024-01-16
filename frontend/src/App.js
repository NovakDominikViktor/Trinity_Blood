import React from 'react';
import Header from './page/Header';
import Home from './page/Home';
import Account from './page/Account';
import AccountSigning from './page/AccountSigning';
import { useState } from 'react';
import ProceedWithPayment from './page/ProceedWithPayment';  
import Cart from './page/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './page/ProductSinglePage';

function App() {
  const products = [
    { id: 1, name: 'Product 1', price: 22.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    // Add more products as needed
  ];

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    console.log(`Add to cart: ${product.name}`);
  };
  

  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<Home products={products} />} />
          <Route path="/product/:productId" element={<ProductDetail products={products} addToCart={addToCart} />} />
         
          <Route
            path="/account"
            element={<Account />}
          />
          <Route
            path="/account-sign-up"
            element={<AccountSigning  />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="proceed-payment" element={<ProceedWithPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
