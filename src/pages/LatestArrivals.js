import ProductGrid from "../components/product/ProductGrid";
import theme from "../assets/styles/theme";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../components/hooks/useFetchProducts";

const LatestArrivals = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useFetchProducts({
    collection: "latest",
  });

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
          View all
        </button>
      </div>

      <div className={theme.latestArrivals.gridWrapper}>
        <ProductGrid
          products={products}
          className={theme.latestArrivals.grid}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default LatestArrivals;
