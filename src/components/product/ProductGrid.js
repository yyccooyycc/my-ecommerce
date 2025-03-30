import React from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "@mui/material";

const ProductGrid = ({ products, className, isLoading }) => {
  return (
    <div className={`grid ${className}`}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="product-card-skeleton">
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton width="80%" height={20} style={{ marginTop: 10 }} />
              <Skeleton width="60%" height={20} style={{ marginTop: 5 }} />
            </div>
          ))
        : products.map((product, index) => (
            <ProductCard key={`${product.product_id}-${index}`} product={product} />
          ))}
    </div>
  );
};

export default ProductGrid;
