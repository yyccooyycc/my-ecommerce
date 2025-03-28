import React from "react";
import ProductCard from "./ProductCard";
import theme from "../../assets/styles/theme";
import { Skeleton } from "@mui/material";


const ProductGrid = ({ products , gridCols, isLoading}) => {

  const gridClass = gridCols === 4 ? "grid-cols-4" : "grid-cols-3";
  if (isLoading) {
    return (
      <div className={`grid ${gridClass} ${theme.productGrid.grid}`}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="product-card-skeleton">
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton width="80%" height={20} style={{ marginTop: 10 }} />
            <Skeleton width="60%" height={20} style={{ marginTop: 5 }} />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={`grid ${gridClass} ${theme.productGrid.grid}`}>
      {products.map((product, index) => (
        <ProductCard key={`${product.product_id}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
