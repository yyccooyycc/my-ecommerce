import React from "react";
import theme from '../assets/styles/theme';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 


function ProductCard({ product }) {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorSelect = (color) => {
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

  return (
    <div
      className={`${theme.productCard.card} ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {filteredImages.length > 0 ? (
          <img
          key={filteredImages[0]?.image_url}
          src={filteredImages[0]?.image_url}
          alt={product.name}
          className={`${theme.productCard.image} `}
        />):(
        <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image Available
        </div>
        )}
        {isOutOfStock(selectedColor) && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 flex justify-center items-center text-white font-bold">
            Out of Stock
          </div>
        )}
      </div>
      <div 
          className={`${theme.productCard.details} cursor-pointer`}
          onClick={() => navigate(`/product/${product.product_id}`)}
      >
        <div className={`${theme.productCard.color} px-4`}>{selectedColor}</div>
        <div className={`${theme.productCard.name} px-4`}>{product.name}</div>

        <div className="flex items-center">
          {selectedInventory.discount_percentage ? (
            <>
              <span className={`${theme.productCard.price} line-through px-2`}>
                ${selectedInventory.list_price}
              </span>
              <span className={`${theme.productCard.price} text-red-500 ml-2 px-2`}>
                ${getCurrentPrice()}
              </span>
            </>
          ) : (
            <span className={`${theme.productCard.price} px-2`}>${selectedInventory.list_price}</span>
          )}
        </div>

        <div className={`${theme.productCard.colorOptions}`}>
          {product.colors.map((color, index) => (
            <button
              key={color || index}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              className={`w-6 h-6 rounded-full bg-${color.toLowerCase()}-500 ${isOutOfStock(color) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
                color === selectedColor ? 'border-2 border-black' : ''
              }`}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
