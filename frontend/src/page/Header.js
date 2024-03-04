import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase, Menu, MenuItem } from '@mui/material';
import axios from 'axios';

const Navbar = ({ onCategoryClick, setSearchTerm, cartItemCount }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [currentCartItemCount, setCurrentCartItemCount] = useState(cartItemCount);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5098/api/Category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentCartItemCount(cartItemCount);
  }, [cartItemCount]);

  const handleSearchButtonClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
    setSearchOpen(!searchOpen);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);
  };

  const handleCategorySelect = (category) => {
    onCategoryClick(category.name);
    navigate(`/category/${encodeURIComponent(category.name.toLowerCase())}`);
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
              key={category.id}
              variant="text"
              color="inherit"
              onClick={() => handleCategorySelect(category)}
              style={{ color: '#333' }}
            >
              {category.name}
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
                onChange={handleSearchChange}
              />
              <Button style={{ marginLeft: '10px' }} onClick={handleSearchClose}>Search</Button>
            </MenuItem>
          </Menu>
          <IconButton component={Link} to="/cart">
            <FaShoppingBasket />
            {currentCartItemCount > 0 && <Typography variant="body2">{currentCartItemCount}</Typography>}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
