import ProductGrid from '../components/product/ProductGrid';
import theme from '../assets/styles/theme';
import { useNavigate } from 'react-router-dom';
import useFetchProducts from '../components/hooks/useFetchProducts';

const LATEST_ARRIVALS_COUNT = 8;

const LatestArrivals = () => {
  const navigate = useNavigate();

  const { products, loading, error } = useFetchProducts({
    page: 1,
    perPage: LATEST_ARRIVALS_COUNT,
    collection: 'latest',
    minLoadingMs: 250,
  });

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
          products={products}
          isLoading={loading}
          className={theme.productGrid.latestArrivalsCols}
          emptyMessage="No products available."
          currentPage={1}
        />
      </div>
    </div>
  );
};

export default LatestArrivals;
