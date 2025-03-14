import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      {products.map((product, index) => (
        <ProductCard key={`${product.product_id}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
