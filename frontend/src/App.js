import React from 'react';
import Header from './page/Header';
import Home from './page/Home';
import Account from './page/Account';
import AccountSigning from './page/AccountSigning';
import { useState } from 'react';
import ProceedWithPayment from './page/ProceedWithPayment';  
import Cart from './page/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
