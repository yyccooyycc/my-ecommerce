import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LatestArrival from "./pages/LatestArrivals";
import ProductDetails from "./pages/ProductDetails";
import ProductListing from "./pages/ProductListing";
import "./index.css"; 

function App() {
  return (
    <Router basename="/my-ecommerce">
      <div className="min-h-screen bg-gray-100 flex justify-start items-start p-4">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
