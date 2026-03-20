import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import theme from '../assets/styles/theme';
import { useNavigate } from 'react-router-dom';

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
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

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={theme.latestArrivals.container}>
      <div className={theme.latestArrivals.header}>
        <span className={theme.latestArrivals.title}>Latest Arrivals</span>
        <button
          className={theme.latestArrivals.viewAllButton}
          onClick={() => navigate('/product-listing')}
        >
          <span className={theme.latestArrivals.viewAllText}>View all</span>
        </button>
      </div>

      <div className="mt-4">
        <ProductGrid
          products={loading ? [] : products}
          isLoading={loading}
          className={theme.productGrid.latestArrivalsCols}
          emptyMessage="No products available based on your filters."
        />
      </div>
    </div>
  );
};

export default LatestArrivals;
