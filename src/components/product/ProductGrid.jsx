import ProductCard from './ProductCard';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

const IMAGE_SIZE = 600;
const FIRST_SCREEN_COUNT = 6;

const preloadedImages = new Set();

const loadImage = (src) =>
  new Promise((resolve) => {
    if (!src) return resolve(false);

    if (preloadedImages.has(src)) {
      return resolve(true);
    }

    const img = new Image();
    img.src = src;

    const done = () => {
      preloadedImages.add(src);
      resolve(true);
    };

    img.onload = done;
    img.onerror = () => resolve(false);

    if (img.decode) {
      img
        .decode()
        .then(done)
        .catch(() => {});
    }
  });

const ProductGrid = ({
  products = [],
  className = '',
  isLoading = false,
  emptyMessage = 'No products available.',
  currentPage = 1,
}) => {
  const isFirstBatch = currentPage === 1;

  const [isFirstScreenReady, setIsFirstScreenReady] = useState(!isFirstBatch);

  const firstScreenImages = useMemo(() => {
    if (!isFirstBatch || !products.length) return [];

    return products
      .slice(0, FIRST_SCREEN_COUNT)
      .map((product) => product.images?.[0]?.image_url)
      .filter(Boolean)
      .map((url) => getOptimizedImageUrl(url, IMAGE_SIZE));
  }, [products, isFirstBatch]);

  useEffect(() => {
    let cancelled = false;

    if (!isFirstBatch || !firstScreenImages.length) {
      setIsFirstScreenReady(true);
      return;
    }

    setIsFirstScreenReady(false);

    const preload = async () => {
      const timeout = new Promise((resolve) => setTimeout(resolve, 700));

      const preloadTask = Promise.all(firstScreenImages.map((src) => loadImage(src)));

      await Promise.race([preloadTask, timeout]);

      if (!cancelled) {
        setIsFirstScreenReady(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [firstScreenImages, isFirstBatch]);

  // 🔹 loading skeleton
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
      {products.map((product, index) => {
        const isFirstScreen = index < FIRST_SCREEN_COUNT;

        return (
          <ProductCard
            key={product.product_id}
            product={product}
            priority={isFirstScreen}
            shouldReveal={!isFirstScreen || isFirstScreenReady}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
