import React, { useState } from 'react';
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase, Menu, MenuItem } from '@mui/material';


const Navbar = ({ hasDummyProfile, categories }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);

  const handleSearchButtonClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
    setSearchOpen(!searchOpen);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleCategorySelect = (category) => {
    navigate(`/${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f2f2f2', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" style={{ marginLeft: '20px', fontWeight: 'bold', color: '#333' }}>
            Logo
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant="text"
              color="inherit"
              onClick={() => handleCategorySelect(category)}
              style={{ color: '#333' }}
            >
              {category}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleSearchButtonClick}>
            <FaSearch />
          </IconButton>
          <Menu
            id="search-menu"
            anchorEl={searchAnchorEl}
            open={searchOpen}
            onClose={handleSearchClose}
          >
            <MenuItem>
              <InputBase
                placeholder="Search..."
                style={{ padding: '8px', border: 'none', borderRadius: '5px', fontSize: '14px' }}
              />
              <Button style={{ marginLeft: '10px' }}>Search</Button>
            </MenuItem>
          </Menu>
          <IconButton component={Link} to="/cart">
            <FaShoppingBasket />
          </IconButton>
        </div>
       
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
