'use client';

import { useEffect, useMemo, useState } from 'react';
import theme from '../../assets/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getOptimizedImageUrl } from '../../components/common/utils/imageUtils';

const imageCache = new Set();

function ProductCard({ product, priority = false }) {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [renderedImage, setRenderedImage] = useState('');
  const [hasError, setHasError] = useState(false);

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

  const productUrl = `/product/${product.product_id}`;

  const primeProductDetails = () => {
    try {
      sessionStorage.setItem(`stylenest:product:${product.product_id}`, JSON.stringify(product));
    } catch {
      // Browsers can deny storage; navigation should still work.
    }

    router.prefetch(productUrl);
  };

  const goToProductDetails = () => {
    primeProductDetails();
    router.push(productUrl);
  };

  useEffect(() => {
    setHasError(false);

    if (!targetImage) {
      setRenderedImage('');
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setRenderedImage(targetImage);

    if (imageCache.has(targetImage)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [targetImage]);

  return (
    <div
      className={`${theme.productGrid.card} ${isHovered ? theme.productCard.hoverShadow : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        primeProductDetails();
      }}
      onFocus={primeProductDetails}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${theme.productGrid.imageWrapper} relative overflow-hidden`}>
        {isLoading && <div className={`${theme.productCard.skeleton} absolute inset-0`} />}

        {renderedImage && (
          <Image
            key={`${product.product_id}-${selectedColor}-${renderedImage}`}
            src={renderedImage}
            alt={`${product.name} - ${selectedColor}`}
            className={`${theme.productGrid.image} relative z-10`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
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

        {!renderedImage && hasError && (
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
        onClick={goToProductDetails}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goToProductDetails();
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
