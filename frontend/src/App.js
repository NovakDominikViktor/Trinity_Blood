// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './page/Header';
import Home from './page/Home';
import Category from './component/Category';
import Account from './page/Account';
import AccountSigning from './page/AccountSigning';
import Cart from './page/Cart';
import ProceedWithPayment from './page/ProceedWithPayment';
import ProductDetail from './page/ProductSinglePage';

function App() {
  const products = [
    { id: 1, name: 'Product 1', price: 22.99, category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 19.99, category: 'Category 2' },
    // Add more products as needed
  ];


  

  const addToCart = (product) => {
    console.log(`Add to cart: ${product.name}`);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <Router>
      <div>
        <Header categories={categories} />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/product/:productId" element={<ProductDetail products={products} addToCart={addToCart} />} />
          {categories.map((category) => (
            <Route
              key={category}
              path={`/${encodeURIComponent(category.toLowerCase())}`}
              element={<Category categoryName={category} products={products} />}
            />
          ))}
          <Route path="/account" element={<Account />} />
          <Route path="/account-sign-up" element={<AccountSigning />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/proceed-payment" element={<ProceedWithPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
