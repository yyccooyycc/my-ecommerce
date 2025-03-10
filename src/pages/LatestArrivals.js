import React from 'react';
import ProductGrid from '../components/ProductGrid';

function LatestArrival() {
  const products = [
    {
      name: "Product 1",
      price: 20,
      listPrice: 30,
      discount: true,
      images: {
        red: "https://via.placeholder.com/280x300/FF0000",
        blue: "https://via.placeholder.com/280x300/0000FF",
      },
      colors: [
        { name: 'Red', bgColor: 'bg-red-500' },
        { name: 'Blue', bgColor: 'bg-blue-500' },
      ],
      variants: [
        { color: 'Red', price: 20, inStock: true },
        { color: 'Blue', price: 25, inStock: false },
      ],
    },
    {
        name: "Product 2",
        price: 20,
        listPrice: 30,
        discount: true,
        images: {
          red: "https://via.placeholder.com/280x300/FF0000",
          blue: "https://via.placeholder.com/280x300/0000FF",
        },
        colors: [
          { name: 'Red', bgColor: 'bg-red-500' },
          { name: 'Blue', bgColor: 'bg-blue-500' },
        ],
        variants: [
          { color: 'Red', price: 20, inStock: true },
          { color: 'Blue', price: 25, inStock: false },
        ],
      },
      {
        name: "Product 3",
        price: 20,
        listPrice: 30,
        discount: true,
        images: {
          red: "https://via.placeholder.com/280x300/FF0000",
          blue: "https://via.placeholder.com/280x300/0000FF",
        },
        colors: [
          { name: 'Red', bgColor: 'bg-red-500' },
          { name: 'Blue', bgColor: 'bg-blue-500' },
        ],
        variants: [
          { color: 'Red', price: 20, inStock: true },
          { color: 'Blue', price: 25, inStock: false },
        ],
      },
      {
        name: "Product 4",
        price: 20,
        listPrice: 30,
        discount: true,
        images: {
          red: "https://via.placeholder.com/280x300/FF0000",
          blue: "https://via.placeholder.com/280x300/0000FF",
        },
        colors: [
          { name: 'Red', bgColor: 'bg-red-500' },
          { name: 'Blue', bgColor: 'bg-blue-500' },
        ],
        variants: [
          { color: 'Red', price: 20, inStock: true },
          { color: 'Blue', price: 25, inStock: false },
        ],
      },
      {
        name: "Product 5",
        price: 20,
        listPrice: 30,
        discount: true,
        images: {
          red: "https://via.placeholder.com/280x300/FF0000",
          blue: "https://via.placeholder.com/280x300/0000FF",
        },
        colors: [
          { name: 'Red', bgColor: 'bg-red-500' },
          { name: 'Blue', bgColor: 'bg-blue-500' },
        ],
        variants: [
          { color: 'Red', price: 20, inStock: true },
          { color: 'Blue', price: 25, inStock: false },
        ],
      },
  ];

  return <ProductGrid products={products} />;
}

export default LatestArrival;
