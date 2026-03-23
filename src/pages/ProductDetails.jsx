import { useParams, useNavigate } from 'react-router-dom';
import theme, { COLOR_CLASS_MAP } from '../assets/styles/theme';
import { useState, useEffect, useMemo } from 'react';
import { fallbackSizes } from '../components/filters/filterOptions';
import { addToCart } from '../components/common/utils/cartUtils';

function getSizeLabel(size) {
  if (!size) return '';

  const key = String(size).toLowerCase();
  const match = fallbackSizes.find((item) => item.code === key);
  if (match?.code === key) {
    return match.label;
  }

  const s = String(size);
  return /^[a-zA-Z]+$/.test(s) ? s.toUpperCase() : s;
}

function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`Failed to load product: ${res.status}`);
        }

        const data = await res.json();
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return;
        console.error(err);
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [productId]);

  return { product, loading, error };
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useProduct(id);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openSectionTitle, setOpenSectionTitle] = useState('Features');

  const hasSizes = !!product && Array.isArray(product.sizes) && product.sizes.length > 0;

  useEffect(() => {
    if (!product) return;

    const defaultColor = product.colors && product.colors[0] ? product.colors[0] : null;
    setSelectedColor(defaultColor);

    if (hasSizes) {
      const variantsForColor = product.inventory.filter((item) => item.color === defaultColor);
      const inStockVariant = variantsForColor.find((item) => item.stock > 0);
      const anyVariant = variantsForColor[0];

      setSelectedSize(
        (inStockVariant && inStockVariant.size) || (anyVariant && anyVariant.size) || null
      );
    } else {
      setSelectedSize(null);
    }

    setQuantity(1);
    setActiveImageIndex(0);
    setOpenSectionTitle('Features');
  }, [product, hasSizes]);

  const selectedInventoryItem = useMemo(() => {
    if (!product || !selectedColor) return undefined;

    if (!hasSizes) {
      return product.inventory.find((item) => item.color === selectedColor);
    }

    if (!selectedSize) return undefined;

    return product.inventory.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );
  }, [product, selectedColor, selectedSize, hasSizes]);

  const outOfStockSizes = useMemo(() => {
    const set = new Set();
    if (!product || !selectedColor || !hasSizes) return set;

    product.sizes.forEach((size) => {
      const item = product.inventory.find(
        (inv) => inv.color === selectedColor && inv.size === size
      );
      if (!item || item.stock === 0) {
        set.add(size);
      }
    });

    return set;
  }, [product, selectedColor, hasSizes]);

  const isOutOfStock = !selectedInventoryItem || selectedInventoryItem.stock === 0;
  const maxStock = selectedInventoryItem ? selectedInventoryItem.stock : 0;

  const displayImages = useMemo(() => {
    if (!product || !selectedColor) return [];
    return product.images.filter((img) => img.color === selectedColor).map((img) => img.image_url);
  }, [product, selectedColor]);

  const listPrice =
    (selectedInventoryItem && selectedInventoryItem.list_price) ||
    (product && product.priceRange && product.priceRange.highest) ||
    0;

  const salePrice = (selectedInventoryItem && selectedInventoryItem.sale_price) || listPrice;

  const discountAmount =
    selectedInventoryItem && selectedInventoryItem.discount ? selectedInventoryItem.discount : null;

  const discountPercentage =
    selectedInventoryItem && selectedInventoryItem.discount_percentage
      ? selectedInventoryItem.discount_percentage
      : null;

  let discountLabel = null;
  if (discountPercentage) {
    discountLabel = `-${discountPercentage}%`;
  } else if (discountAmount) {
    discountLabel = `-$${discountAmount}`;
  }

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setActiveImageIndex(0);
    setQuantity(1);

    if (!product) return;

    if (hasSizes) {
      const variantsForColor = product.inventory.filter((item) => item.color === color);
      const inStockVariant = variantsForColor.find((item) => item.stock > 0);
      const anyVariant = variantsForColor[0];

      setSelectedSize(
        (inStockVariant && inStockVariant.size) || (anyVariant && anyVariant.size) || null
      );
    } else {
      setSelectedSize(null);
    }
  };

  const handleSelectSize = (size) => {
    if (!hasSizes) return;
    setSelectedSize(size);
    setQuantity(1);
    setActiveImageIndex(0);
  };

  const handleDecreaseQuantity = () => {
    if (isOutOfStock) return;
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    if (isOutOfStock || !selectedInventoryItem) return;
    setQuantity((prev) => Math.min(selectedInventoryItem.stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (!product || !selectedInventoryItem || isOutOfStock) return;
    const cartItem = {
      cartKey: [
        product.product_id,
        selectedInventoryItem.color || 'default',
        selectedInventoryItem.size || 'default',
        selectedInventoryItem.sku || 'default',
      ].join('-'),

      productId: product.product_id,
      sku: selectedInventoryItem.sku,
      name: product.name,
      slug: product.slug || product.product_id,

      color: selectedInventoryItem.color || '',
      size: selectedInventoryItem.size || '',

      quantity,

      price: Number(selectedInventoryItem.sale_price ?? selectedInventoryItem.list_price ?? 0),
      originalPrice:
        selectedInventoryItem.list_price &&
        selectedInventoryItem.sale_price &&
        Number(selectedInventoryItem.list_price) > Number(selectedInventoryItem.sale_price)
          ? Number(selectedInventoryItem.list_price)
          : null,

      image:
        selectedInventoryItem.image_url ||
        product.hero_image_url ||
        product.images?.[0]?.image_url ||
        '',

      description: product.description || '',
      maxQuantity: selectedInventoryItem.stock ?? null,
    };

    console.log('ADD TO CART', cartItem);

    addToCart(cartItem);
  };

  const handleGoToReviews = () => {
    if (!id) return;
    navigate(`/product/${id}/reviews`);
  };

  if (loading) {
    return (
      <main className={theme.productDetails.page}>
        <p className="text-neutral-500 text-sm md:text-base">Loading product…</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={theme.productDetails.page}>
        <p className="text-red-500 text-sm md:text-base">Failed to load product.</p>
      </main>
    );
  }

  const hasReviews = product.reviews > 0;

  return (
    <main className={theme.productDetails.page}>
      <section className={theme.productDetails.card}>
        {/* 左： gallery */}
        <section aria-label="Product images" className="flex flex-col">
          <div className={theme.productDetails.galleryMain}>
            {displayImages[activeImageIndex] ? (
              <img
                src={displayImages[activeImageIndex]}
                alt={`${product.name} ${activeImageIndex + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-neutral-400 text-sm">No image available</span>
            )}
          </div>

          <div className={theme.productDetails.galleryThumbs}>
            {displayImages.map((src, index) => (
              <button
                key={src + index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={
                  theme.productDetails.galleryThumbButton +
                  ' ' +
                  (index === activeImageIndex ? theme.productDetails.galleryThumbButtonActive : '')
                }
              >
                <img
                  src={src}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* right:content*/}
        <section className="flex flex-col gap-6">
          {/* Title + rating */}
          <header className={theme.productDetails.titleBlock}>
            <h1 className={theme.productDetails.productName}>{product.name}</h1>
            {/* Price */}
            <section aria-label="Price" className={theme.productDetails.priceSection}>
              <div className={theme.productDetails.priceRow}>
                <span className={theme.productDetails.priceCurrent}>${salePrice}</span>
                {salePrice !== listPrice && (
                  <span className={theme.productDetails.priceOld}>${listPrice}</span>
                )}
              </div>
              {discountLabel && (
                <span className={theme.productDetails.priceBadge}>{discountLabel} OFF</span>
              )}
            </section>

            <div className={theme.productDetails.ratingRow}>
              <div className="flex items-center gap-0.5">
                <span className={theme.productDetails.ratingNumber}>
                  {product.rating.toFixed(1)} <span className="text-neutral-400"> </span>
                </span>
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i + 1 <= Math.round(product.rating);
                  return (
                    <span key={i} className={filled ? 'text-yellow-400' : 'text-neutral-300'}>
                      ★
                    </span>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleGoToReviews}
                className={theme.productDetails.ratingLink}
              >
                {hasReviews ? `See all ${product.reviews} reviews` : 'No reviews yet. Be the first'}
              </button>
            </div>
            <p className={theme.productDetails.description}>{product.description}</p>
          </header>

          {/* Colors */}
          <section aria-label="Color options" className="flex flex-col gap-3">
            <div className={theme.productDetails.sectionLabelRow}>
              <h2 className={theme.productDetails.sectionLabel}>Available Colors</h2>
            </div>

            <div className={theme.productDetails.colorSwatchesRow}>
              {product.colors.map((color) => {
                const isSelected = color === selectedColor;
                const innerColorClass = COLOR_CLASS_MAP[color] || 'bg-neutral-400';
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleSelectColor(color)}
                    className={[
                      theme.productDetails.colorSwatchBase,
                      isSelected
                        ? theme.productDetails.colorSwatchSelected
                        : theme.productDetails.colorSwatchUnselected,
                    ].join(' ')}
                    aria-label={color}
                  >
                    <span
                      className={`${theme.productDetails.colorInnerCircle} ${innerColorClass} flex items-center justify-center`}
                    >
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sizes */}
          {hasSizes && (
            <section aria-label="Size options" className="flex flex-col gap-3">
              <div className={theme.productDetails.sectionLabelRow}>
                <h2 className={theme.productDetails.sectionLabel}>Available Sizes</h2>
              </div>

              <div className={theme.productDetails.sizeButtonsRow}>
                {product.sizes.map((size) => {
                  const isSelected = size === selectedSize;
                  const isOut = outOfStockSizes.has(size);

                  let stateClass = theme.productDetails.sizeButtonNormal;
                  if (isSelected) stateClass = theme.productDetails.sizeButtonSelected;
                  if (isOut) stateClass += ' ' + theme.productDetails.sizeButtonDisabled;

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => !isOut && handleSelectSize(size)}
                      className={`${theme.productDetails.sizeButtonBase} ${stateClass}`}
                      aria-disabled={isOut}
                    >
                      {getSizeLabel(size)}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {!hasSizes && <p className={theme.productDetails.sectionHint}>One size fits all.</p>}

          {/* Qty + Add to Cart */}
          <section className="flex flex-col gap-3">
            <div className={theme.productDetails.sectionLabelRow}>
              <h2 className={theme.productDetails.sectionLabel}>Quantity</h2>
            </div>

            <div className={theme.productDetails.qtyRow}>
              <div className={theme.productDetails.qtyBox}>
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={isOutOfStock || quantity <= 1}
                  className={theme.productDetails.qtyButton}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className={theme.productDetails.qtyValue}>{isOutOfStock ? 0 : quantity}</span>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={isOutOfStock || quantity >= maxStock}
                  className={theme.productDetails.qtyButton}
                  aria-label="Increase quantity"
                  title={isOutOfStock || quantity >= maxStock ? 'Insufficient stock' : ''}
                >
                  +
                </button>
              </div>

              <p className={theme.productDetails.stockText}>
                {isOutOfStock
                  ? 'Out of stock'
                  : maxStock <= 5
                    ? `Only ${maxStock} left in stock`
                    : ``}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={theme.productDetails.addToCartButton}
            >
              Add to Cart
            </button>

            {isOutOfStock && (
              <p className={theme.productDetails.outOfStockText}>
                Sorry, this item is out of stock.
              </p>
            )}
          </section>

          {/* Accordion */}
          <section className={theme.productDetails.accordionWrapper}>
            <div className="space-y-2">
              {product.info.map((section) => {
                const isOpen = openSectionTitle === section.title;
                return (
                  <div key={section.title} className={theme.productDetails.accordionItem}>
                    <button
                      type="button"
                      className={theme.productDetails.accordionButton}
                      onClick={() => setOpenSectionTitle(isOpen ? null : section.title)}
                    >
                      <span>{section.title}</span>
                      <span
                        className={
                          theme.productDetails.accordionIconWrapper +
                          (isOpen ? ' border-profile-primary' : '')
                        }
                      >
                        <span className={theme.productDetails.accordionIcon}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className={theme.productDetails.accordionBody}>
                        <ul className="list-disc pl-4 space-y-1">
                          {section.description.map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
