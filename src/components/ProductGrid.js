import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
      {products.map((product, index) => (
        <ProductCard key={`${product.product_id}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
