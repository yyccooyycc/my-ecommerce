import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        加入購物車
      </button>
    </div>
  );
};

export default ProductCard;
