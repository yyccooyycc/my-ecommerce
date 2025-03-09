import React from "react";
import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "商品 1", price: 100, image: "https://via.placeholder.com/150" },
  { id: 2, name: "商品 2", price: 200, image: "https://via.placeholder.com/150" },
  { id: 3, name: "商品 3", price: 300, image: "https://via.placeholder.com/150" },
  { id: 4, name: "商品 4", price: 400, image: "https://via.placeholder.com/150" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-auto-fit gap-5">
      {products.map((product) => (
        <ProductCard class = "bg-primary text-white p-4" key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
