import { useEffect, useMemo, useRef, useState } from 'react';
import theme from '../../assets/styles/theme';
import { useNavigate } from 'react-router-dom';
import { getOptimizedImageUrl } from '../../components/common/utils/imageUtils';

const imageCache = new Set();
const MIN_SKELETON_MS = 150;

function ProductCard({ product, priority = false, shouldReveal = true }) {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [renderedImage, setRenderedImage] = useState('');
  const [hasError, setHasError] = useState(false);

  const requestIdRef = useRef(0);
  const loadStartRef = useRef(0);

  useEffect(() => {
    setSelectedColor(product.colors?.[0] || '');
  }, [product.product_id, product.colors]);

  const handleColorSelect = (event, color) => {
    event.stopPropagation();
    if (color === selectedColor) return;
    setSelectedColor(color);
  };

  const filteredImages = useMemo(() => {
    return product.images?.filter((img) => img.color === selectedColor) || [];
  }, [product.images, selectedColor]);

  const targetImage = filteredImages[0]?.image_url
    ? getOptimizedImageUrl(filteredImages[0].image_url, 600)
    : '';

  const selectedInventory = useMemo(() => {
    return product.inventory?.find((inv) => inv.color === selectedColor) || {};
  }, [product.inventory, selectedColor]);

  const getCurrentPrice = () => {
    return selectedInventory.discount_percentage
      ? selectedInventory.sale_price
      : selectedInventory.list_price;
  };

  const isOutOfStock = (color) => {
    return !product.inventory?.find((inv) => inv.color === color && inv.stock - inv.sold > 0);
  };

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setHasError(false);

    if (!targetImage) {
      setRenderedImage('');
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setRenderedImage(targetImage);

    if (!shouldReveal) {
      setIsLoading(true);
      return;
    }

    if (imageCache.has(targetImage)) {
      setIsLoading(false);
      return;
    }

    loadStartRef.current = Date.now();
    setIsLoading(true);

    const img = new Image();
    img.src = targetImage;

    const finishLoading = async () => {
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch (error) {
        // ignore decode failure
      }

      if (requestId !== requestIdRef.current) return;

      imageCache.add(targetImage);

      const elapsed = Date.now() - loadStartRef.current;
      const remaining = Math.max(0, MIN_SKELETON_MS - elapsed);

      setTimeout(() => {
        if (requestId !== requestIdRef.current) return;
        setIsLoading(false);
      }, remaining);
    };

    if (img.complete) {
      finishLoading();
    } else {
      img.onload = finishLoading;
      img.onerror = () => {
        if (requestId !== requestIdRef.current) return;
        setHasError(true);
        setIsLoading(false);
      };
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [targetImage, shouldReveal]);

  return (
    <div
      className={`${theme.productGrid.card} ${isHovered ? theme.productCard.hoverShadow : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${theme.productGrid.imageWrapper} relative overflow-hidden`}>
        {(!shouldReveal || isLoading) && (
          <div className={`${theme.productCard.skeleton} absolute inset-0 z-10`} />
        )}

        {shouldReveal && renderedImage && (
          <img
            key={`${product.product_id}-${selectedColor}-${renderedImage}`}
            src={renderedImage}
            alt={`${product.name} - ${selectedColor}`}
            className={`${theme.productGrid.image} transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => {
              imageCache.add(renderedImage);
              setIsLoading(false);
            }}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}

        {shouldReveal && !renderedImage && hasError && (
          <div className={theme.productCard.noImage}>No Image Available</div>
        )}

        {isOutOfStock(selectedColor) && (
          <div className={theme.productCard.outOfStockOverlay} aria-label="Out of stock">
            Out of Stock
          </div>
        )}
      </div>

      <div
        className={theme.productGrid.details}
        onClick={() => navigate(`/product/${product.product_id}`)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate(`/product/${product.product_id}`);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${product.name}`}
      >
        <div className={theme.productCard.color}>{selectedColor}</div>
        <h3 className={theme.productCard.name}>{product.name}</h3>

        <div className="flex items-center">
          {selectedInventory.discount_percentage ? (
            <>
              <span className={`${theme.productCard.price} line-through px-2`}>
                ${selectedInventory.list_price}
              </span>
              <span className={`${theme.productCard.price} ${theme.productCard.priceDiscount}`}>
                ${getCurrentPrice()}
              </span>
            </>
          ) : (
            <span className={`${theme.productCard.price} px-2`}>
              ${selectedInventory.list_price}
            </span>
          )}
        </div>

        <div className={theme.productCard.colorOptions}>
          {product.colors?.map((color, index) => (
            <button
              key={color || index}
              type="button"
              style={{ backgroundColor: color }}
              onClick={(event) => handleColorSelect(event, color)}
              aria-label={`Select ${color} color`}
              className={`${theme.productCard.colorButton} ${
                isOutOfStock(color) ? theme.productCard.colorButtonOutOfStock : ''
              } ${color === selectedColor ? theme.productCard.colorButtonSelected : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
