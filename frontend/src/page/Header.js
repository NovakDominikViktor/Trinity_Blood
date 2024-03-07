import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingBasket, FaQuestionCircle, FaAngleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase, Menu, MenuItem, Select} from '@mui/material';
import axios from 'axios';

const Navbar = ({ setSearchTerm, cartItemCount }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentCartItemCount, setCurrentCartItemCount] = useState(cartItemCount);
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    setSelectedCategory(categoryName);
    navigate(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f2f2f2', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" style={{ marginLeft: '20px', fontWeight: 'bold', color: '#333' }}>
            Logo
          </Typography>
        </Link>
        <Button
          aria-controls="category-menu"
          aria-haspopup="true"
          onClick={(event) => setSelectedCategory(event.currentTarget)}
          variant="contained"
          style={{ marginLeft: '20px' }}  sx={{ mt: 3, mb: 2, backgroundColor: '#333', color: '#fff' }}
        >
          Kategóriák <FaAngleDown />
        </Button>
        <Menu
          id="category-menu"
          anchorEl={selectedCategory}
          open={Boolean(selectedCategory)}
          onClose={() => setSelectedCategory(null)}
        >
          <MenuItem value="" disabled>
            Kategóriák
          </MenuItem>
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => {
                setSelectedCategory(null);
                handleCategoryChange({ target: { value: category.name } });
              }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
        <div style={{ flexGrow: 1 }} />
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
          <IconButton onClick={handleSupportClick}>
            <FaQuestionCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
