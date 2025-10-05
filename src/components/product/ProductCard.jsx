import React from "react";
import theme from "../../assets/styles/theme";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 


function ProductCard({ product }) {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleColorSelect = (event, color) => {
    event.stopPropagation(); //otherwise, it will trigger the parent onClick event and navigate to the product details page
    setSelectedColor(color);
  };

  const filteredImages = product.images.filter(img => img.color === selectedColor);
  const selectedInventory = product.inventory.find(
    (inv) => inv.color === selectedColor || {}
  );
  const getCurrentPrice = () => {
    return selectedInventory.discount_percentage
      ? selectedInventory.sale_price
      : selectedInventory.list_price;
  };

  const isOutOfStock = (color) => {
    return !product.inventory?.find((inv) => inv.color === color && (inv.stock-inv.sold) > 0);
  };

  useEffect(() => {
    product.images.forEach(img => {
      const preloadedImg = new Image();
      preloadedImg.src = img.image_url;
      preloadedImg.loading = "eager";
      preloadedImg.onload = () => setIsLoading(false);
    });
  }, [product.images]); 

  return (
    <div
      className={`${theme.productCard.card} ${
        isHovered ? theme.productCard.hoverShadow : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
      {isLoading && <div className={`${theme.productCard.skeleton}`} />}
        {filteredImages.length > 0 ? (
          <img
            key={filteredImages[0]?.image_url}
            src={filteredImages[0]?.image_url}
            alt={`${product.name} - ${selectedColor}`}             
            className={`${theme.productCard.image} ${isLoading ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className={`${theme.productCard.noImage}`}>
            No Image Available
          </div>
        )}
        {isOutOfStock(selectedColor) && (
          <div className={`${theme.productCard.outOfStockOverlay}`}
          aria-label="Out of stock"
          >
            Out of Stock
          </div>
        )}
      </div>
      <div
        className={`${theme.productCard.details}`}
        onClick={() => navigate(`/product/${product.product_id}`)}
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        <div className={`${theme.productCard.color}`}>{selectedColor}</div>
        <h3 className={`${theme.productCard.name}`}>{product.name}</h3>

        <div className="flex items-center">
          {selectedInventory.discount_percentage ? (
            <>
              <span className={`${theme.productCard.price} line-through px-2`}                
              aria-label={`Original price ${selectedInventory.list_price} dollars`}
              >
                ${selectedInventory.list_price}
              </span>
              <span
                className={`${theme.productCard.price} ${theme.productCard.priceDiscount}`}
                aria-label={`Discounted price ${getCurrentPrice()} dollars`}
              >
                ${getCurrentPrice()}
              </span>
            </>
          ) : (
            <span className={`${theme.productCard.price} px-2`}
            aria-label={`Price ${selectedInventory.list_price} dollars`}
            >
              ${selectedInventory.list_price}
            </span>
          )}
        </div>

        <div className={`${theme.productCard.colorOptions}`}>
          {product.colors.map((color, index) => (
            <button
              key={color || index}
              style={{ backgroundColor: color }}
              onClick={(event) => handleColorSelect(event, color)}
              role="checkbox"
              aria-checked={color === selectedColor}
              className={`${theme.productCard.colorButton} ${
                isOutOfStock(color)
                  ? theme.productCard.colorButtonOutOfStock
                  : ""
              } ${
                color === selectedColor
                  ? theme.productCard.colorButtonSelected
                  : ""
              }
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
