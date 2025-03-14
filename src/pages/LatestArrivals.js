import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import theme from "../assets/styles/theme";


const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex justify-center items-center text-xl text-gray-500">
        No products available based on your filters.
      </div>
    );
  }

  return (
    <div className={theme.productGrid.container}>
      <div className={theme.productGrid.wrapper}>
        <div className={theme.productGrid.inner}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-between w-full">
              <span className={theme.productGrid.title}>Latest Arrivals</span>
              <button className={theme.productGrid.viewAllButton}>
                <span className={theme.productGrid.viewAllText}>View all</span>
              </button>
            </div>
          </div>

          <ProductGrid products={products} />

        </div>
      </div>
     </div>
  );
};

export default LatestArrivals;

