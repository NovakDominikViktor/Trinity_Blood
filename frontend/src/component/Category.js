import React from 'react';

const Category = ({ categoryName, products }) => {
  // Implement logic to filter and display products based on the categoryName
  const filteredProducts = products.filter((product) => product.category === categoryName);

  return (
    <div>
      <h2>{categoryName}</h2>
      {/* Display products for the selected category */}
      {filteredProducts.map((product) => (
        <div key={product.id}>
          {/* Display product details as needed */}
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
