// App.js
import React, { useState } from 'react';
import Header from './page/Header';
import Home from './page/Home';
import Account from './page/Account';
import AccountSigning from './page/AccountSigning';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './page/ProductSinglePage';
import Cart from './page/Cart';
import ProceedWithPayment from './page/ProceedWithPayment';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const products = [
    { id: 1, name: 'Product 1', price: 22.99, category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 19.99, category: 'Category 2' },
    { id: 4, name: 'Product 3', price: 51.99, category: 'Category 3' },
  
    // Add more products as needed with corresponding categories
  ];

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    console.log(`Add to cart: ${product.name}`);
  };

  return (
    <Router>
      <div>
        <Header
          categories={['All', 'Category 1', 'Category 2']}
          setSelectedCategory={setSelectedCategory}
        />
        <Routes>
          <Route
            path="/"
            element={<Home products={products} selectedCategory={selectedCategory} />}
          />
          <Route
            path="/product/:productId"
            element={<ProductDetail products={products} addToCart={addToCart} />}
          />
          <Route
            path="/account"
            element={<Account />}
          />
          <Route
            path="/account-sign-up"
            element={<AccountSigning />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/proceed-payment"
            element={<ProceedWithPayment />}
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
