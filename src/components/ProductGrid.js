import React from "react";
import ProductCard from "./ProductCard";
import theme from "../assets/styles/theme";

const ProductGrid = ({ products }) => {
  return (
    <div className={theme.productGrid.grid}>
      {products.map((product, index) => (
        <ProductCard key={`${product.product_id}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
