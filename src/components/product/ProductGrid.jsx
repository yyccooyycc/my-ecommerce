import ProductCard from './ProductCard';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

const FIRST_SCREEN_PRIORITY_COUNT = 4;
const FIRST_PAGE_PRELOAD_COUNT = 6;

const ProductGrid = ({
  products = [],
  className = '',
  isLoading = false,
  emptyMessage = 'No products available.',
  currentPage = 1,
}) => {
  useEffect(() => {
    if (currentPage !== 1 || !products.length) return;

    const preloadImages = products
      .slice(0, FIRST_PAGE_PRELOAD_COUNT)
      .map((product) => product.images?.[0]?.image_url)
      .filter(Boolean)
      .map((url) => getOptimizedImageUrl(url, 600));

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [products, currentPage]);

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
    return <div className={theme.productGrid.emptyState}>{emptyMessage}</div>;
  }

  return (
    <div className={`${theme.productGrid.base} ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.product_id}
          product={product}
          priority={currentPage === 1 && index < FIRST_SCREEN_PRIORITY_COUNT}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
