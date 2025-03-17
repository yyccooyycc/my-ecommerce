import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import theme from "../assets/styles/theme";
import { useNavigate } from "react-router-dom";


const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
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
      <div className={theme.latestArrivals.noProducts}>
        No products available based on your filters.
      </div>
    );
  }

  return (
    <div className={theme.latestArrivals.container}>
      <div className={theme.latestArrivals.header}>              
        <span className={theme.latestArrivals.title}>Latest Arrivals</span>
        <button 
          className={theme.latestArrivals.viewAllButton}
          onClick={() => navigate("/products")} 
        >
        <span className={theme.latestArrivals.viewAllText}>View all</span>
        </button>
      </div>

      <div className={theme.latestArrivals.gridWrapper}>
        <ProductGrid products={products} />
      </div>
     </div>
  );
};

export default LatestArrivals;

