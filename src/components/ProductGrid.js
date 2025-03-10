import React from "react";
import theme from "../assets/styles/theme";
import ProductCard from "./ProductCard";


const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center text-xl text-gray-500">
        No products available based on your filters.
      </div>
    );
  }

  return (
    <div className={`${theme.productGrid.container}`}>
      <h2 className={`${theme.productGrid.title}`}>Latest Arrivals</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
