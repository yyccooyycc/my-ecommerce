import { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import theme from '../assets/styles/theme';
import { useNavigate } from 'react-router-dom';
import useFetchProducts from '../components/hooks/useFetchProducts';

const FIRST_BATCH = 4;
const SECOND_BATCH = 4;

const LatestArrivals = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const {
    products: firstProducts,
    loading: firstLoading,
    error: firstError,
  } = useFetchProducts({
    page: 1,
    perPage: FIRST_BATCH,
    collection: 'latest',
    minLoadingMs: 350,
  });

  const {
    products: secondProducts,
    loading: secondLoading,
    error: secondError,
  } = useFetchProducts({
    page: 2,
    perPage: SECOND_BATCH,
    collection: 'latest',
    minLoadingMs: 0,
    enabled: showMore,
  });

  useEffect(() => {
    if (!firstLoading && firstProducts.length > 0) {
      const id = window.setTimeout(() => {
        setShowMore(true);
      }, 200);

      return () => window.clearTimeout(id);
    }
  }, [firstLoading, firstProducts]);

  const mergedProducts = useMemo(() => {
    return [...firstProducts, ...secondProducts];
  }, [firstProducts, secondProducts]);

  if (firstError) return <p>Error: {firstError}</p>;
  if (secondError) return <p>Error: {secondError}</p>;

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
          products={mergedProducts}
          isLoading={firstLoading}
          className={theme.productGrid.latestArrivalsCols}
          emptyMessage="No products available."
          currentPage={1}
          priorityCount={4}
        />
      </div>

      {showMore && secondLoading && (
        <div className="mt-4 text-sm text-neutral-500">Loading more...</div>
      )}
    </div>
  );
};

export default LatestArrivals;
