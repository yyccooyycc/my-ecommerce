import React, { useState, useEffect } from 'react';
import theme from "../assets/styles/theme";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data)
        setProducts(data.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

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
          <ProductCard key={`${product.product_id}-${index}`}  product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
