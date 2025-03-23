import React from "react";
import ProductCard from "./ProductCard";
import theme from "../../assets/styles/theme";

const ProductGrid = ({ products , gridCols}) => {

  const gridClass = gridCols === 4 ? "grid-cols-4" : "grid-cols-3";
  
  return (
    <div className={`grid ${gridClass} ${theme.productGrid.grid}`}>
      {products.map((product, index) => (
        <ProductCard key={`${product.product_id}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
