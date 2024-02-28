import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from './page/Header';
import Home from './page/Home';
import Account from './page/Account';
import AccountSigning from './page/AccountSigning';
import Cart from './page/Cart';
import ProceedWithPayment from './page/ProceedWithPayment';
import ProductDetail from './page/ProductSinglePage';
import AccountMenu from './page/AccountMenu';
import Category from './component/Category';
import Footer from './page/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Token beállítása a localStorage-ból
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5098/api/Product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);
    }
  }, [token]);

  useEffect(() => {
    console.log("User ID:", userId);
  }, [userId]);

  const addToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  
    setAddedToCart([...addedToCart, product.id]); 
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    
    <Router>
      <div>
        <AccountMenu userProfile={token} setToken={setToken} setUserId={setUserId} />
        <Header onCategoryClick={setSelectedCategory}  setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Home products={products} searchTerm={searchTerm} />} />
          <Route path="/product/:productId" element={<ProductDetail products={products} addToCart={addToCart} />} />
          <Route path="/account" element={token ? <Account token={token} setToken={setToken} /> : <Navigate to="/account-sign-up" />} />
          <Route path="/account-sign-up" element={<AccountSigning setToken={setToken} />} />
          <Route
            path="/cart"
            element={<Cart products={cartItems.filter(item => addedToCart.includes(item.id))} userId={userId} />}
          />
          <Route
            path="/proceed-payment"
            element={<ProceedWithPayment userId={userId} products={cartItems.filter(item => addedToCart.includes(item.id))} onPaymentSuccess={() => console.log('Payment successful')} />}
          />
         <Route path="/category/:categoryName" element={<Category products={products} />}/>

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
