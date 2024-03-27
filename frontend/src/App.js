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
import Support from './Support/Support';
import AboutUs from './page/AboutUs';
import ContactUs from './page/ContactUs';
import AllProducts from './page/AllProducts';
import ResetPassword from './page/ResetPassword';


function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [supportOpen, setSupportOpen] = useState(false);

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
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    
    const storedAddedToCart = JSON.parse(localStorage.getItem('addedToCart')) || [];
    setAddedToCart(storedAddedToCart);
    
    const itemCount = storedCartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(itemCount);
  }, []);

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
    setCartItemCount(prevCount => prevCount + quantity);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...product, quantity }]));
    localStorage.setItem('addedToCart', JSON.stringify([...addedToCart, product.id]));
    console.log(`Added to cart: ${product.name}`);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    
    const updatedAddedToCart = addedToCart.filter(id => id !== productId);
    setAddedToCart(updatedAddedToCart);
    
    const itemCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(itemCount);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('addedToCart', JSON.stringify(updatedAddedToCart));
  };

  return (

    <Router>
      <div>
        <AccountMenu userProfile={token} setToken={setToken} setUserId={setUserId} />
        <Header onCategoryClick={setSelectedCategory} setSearchTerm={setSearchTerm} cartItemCount={cartItemCount} />
        <Routes>
          <Route path="/" element={<Home products={products} searchTerm={searchTerm} />} />
          <Route path="/product/:productId" element={<ProductDetail products={products} addToCart={addToCart} />} />
          <Route path="/account" element={token ? <Account token={token} setToken={setToken} /> : <Navigate to="/account-sign-up" />} />
          <Route path="/account-sign-up" element={<AccountSigning setToken={setToken} />} />
          <Route
            path="/cart"
            element={<Cart products={cartItems.filter(item => addedToCart.includes(item.id))} userId={userId} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/proceed-payment"
            element={<ProceedWithPayment userId={userId} products={cartItems.filter(item => addedToCart.includes(item.id))} onPaymentSuccess={() => console.log('Payment successful')} />}
          />
         <Route path="/category/:categoryName" element={<Category products={products} searchTerm={searchTerm} />} />
         <Route path="/support" element={<Support />} />
         <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/contactus" element={<ContactUs />} />
         <Route path="/allproducts" element={<AllProducts products={products} searchTerm={searchTerm} />} />
         <Route path="/resetpassword" element={<ResetPassword/>} />
        </Routes>
       
        <Footer/>
      </div>
    </Router>
   
  );
}

export default App;
