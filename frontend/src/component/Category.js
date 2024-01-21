// Category.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();

  // Implement logic to fetch and display products for the selected category

  return (
    <div>
      <h2>{`Products in ${category}`}</h2>
      {/* Display products for the selected category */}
    </div>
  );
};

export default Category;
