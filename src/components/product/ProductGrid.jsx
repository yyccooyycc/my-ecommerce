import ProductCard from './ProductCard';
import { Skeleton } from '@mui/material';
import theme from '../../assets/styles/theme';

const ProductGrid = ({ products, className = '', isLoading }) => {
  return (
    <div className={`${theme.productGrid.container} ${className}`}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={theme.productGrid.card}>
              {/* Skeleton Image */}
              <div className={theme.productGrid.imageWrapper}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: '8px' }}
                />
              </div>

              {/* Skeleton Text */}
              <div className={theme.productGrid.details}>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
              </div>
            </div>
          ))
        : products.map((product, index) => (
            <ProductCard key={`${product.product_id}-${index}`} product={product} />
          ))}
    </div>
  );
};

export default ProductGrid;
