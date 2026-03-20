import ProductCard from './ProductCard';
import { Skeleton } from '@mui/material';
import theme from '../../assets/styles/theme';

const ProductGrid = ({
  products = [],
  className = '',
  isLoading = false,
  emptyMessage = 'No products available.',
  currentPage = 1,
}) => {
  if (isLoading) {
    return (
      <div className={`${theme.productGrid.base} ${className}`}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className={theme.productGrid.card}>
            <div className={theme.productGrid.imageWrapper}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: '8px' }}
              />
            </div>

            <div className={theme.productGrid.details}>
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={20} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return <div className={theme.latestArrivals.noProducts}>{emptyMessage}</div>;
  }

  return (
    <div className={`${theme.productGrid.base} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} priority={currentPage === 1} />
      ))}
    </div>
  );
};

export default ProductGrid;
