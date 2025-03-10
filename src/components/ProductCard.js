import React from "react";
import theme from '../assets/styles/theme';
import { useState } from 'react';


function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
  };

  const getCurrentPrice = () => {
    const selectedVariant = product.variants.find(
      (variant) => variant.color === selectedColor
    );
    return selectedVariant?.price || product.price;
  };

  const isOutOfStock = (color) => {
    return !product.variants.find((variant) => variant.color === color && variant.inStock);
  };

  return (
    <div
      className={`${theme.productCard.card} ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className={`${theme.productCard.image}`}
        />
        {isOutOfStock(selectedColor) && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 flex justify-center items-center text-white font-bold">
            Out of Stock
          </div>
        )}
      </div>
      <div className={`${theme.productCard.details}`}>
        <div className={`${theme.productCard.color}`}>{selectedColor}</div>
        <div className={`${theme.productCard.name}`}>{product.name}</div>

        <div className="flex items-center">
          {product.discount ? (
            <>
              <span className={`${theme.productCard.price} line-through`}>
                ${product.listPrice}
              </span>
              <span className={`${theme.productCard.price} text-red-500 ml-2`}>
                ${getCurrentPrice()}
              </span>
            </>
          ) : (
            <span className={`${theme.productCard.price}`}>${product.listPrice}</span>
          )}
        </div>

        <div className={`${theme.productCard.colorOptions}`}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color)}
              className={`w-6 h-6 rounded-full ${color.bgColor} ${isOutOfStock(color.name) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
                color.name === selectedColor ? 'border-2 border-black' : ''
              }`}
              disabled={isOutOfStock(color.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
