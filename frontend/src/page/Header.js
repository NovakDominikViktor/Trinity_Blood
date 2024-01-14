import React from 'react';
import { FaSearch, FaUser, FaShoppingBasket } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ hasDummyProfile }) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (hasDummyProfile) {
      navigate('/account-sign-up');
    } else {
      navigate('/account');
    }
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '15px', color: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/">
            <img
              src="https://cdn.ebaumsworld.com/mediaFiles/picture/1151541/84693449.png"
              alt="Logo"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }}>
            <input type="text" placeholder="Keresés" style={{ padding: '8px', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
            <button style={{ fontSize: '1.2rem', backgroundColor: '#555', border: 'none', color: 'white', borderRadius: '5px', padding: '8px', cursor: 'pointer' }}>
              <FaSearch />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={handleAccountClick}>
              Fiók <FaUser />
            </div>
            <div style={{ marginLeft: '20px', cursor: 'pointer' }}>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                Kosár <FaShoppingBasket />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
