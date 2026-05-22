'use client';

import ProductCard from './ProductCard';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo } from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

const IMAGE_SIZE = 600;
const requestedImages = new Set();

const preloadImage = (src) => {
  if (!src || requestedImages.has(src)) return;

  requestedImages.add(src);

  const img = new Image();
  img.decoding = 'async';
  img.src = src;

  img.onerror = () => {
    requestedImages.delete(src);
  };
};

const ProductGrid = ({
  products = [],
  className = '',
  isLoading = false,
  emptyMessage = 'No products available.',
  currentPage = 1,
  priorityCount = 4,
  skeletonCount = 6,
}) => {
  const isFirstPage = currentPage === 1;

  const priorityImageUrls = useMemo(() => {
    if (!isFirstPage || !products.length) return [];

    return products
      .slice(0, priorityCount)
      .map((product) => product.images?.[0]?.image_url)
      .filter(Boolean)
      .map((url) => getOptimizedImageUrl(url, IMAGE_SIZE));
  }, [products, isFirstPage, priorityCount]);

  useEffect(() => {
    if (!priorityImageUrls.length) return undefined;

    const runPreload = () => {
      priorityImageUrls.forEach(preloadImage);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(runPreload, { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = window.setTimeout(runPreload, 100);
    return () => window.clearTimeout(timeoutId);
  }, [priorityImageUrls]);

  if (isLoading) {
    return (
      <div className={`${theme.productGrid.base} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
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
        const isPriorityImage = isFirstPage && index < priorityCount;

        return (
          <ProductCard
            key={product.product_id}
            product={product}
            priority={isPriorityImage}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
