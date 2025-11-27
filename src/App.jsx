import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductListing = lazy(() => import('./pages/ProductListing'));

function App() {
  return (
    <Router basename="/my-ecommerce">
      <div className="min-h-screen bg-gray-100 flex justify-start items-start p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product-listing" element={<ProductListing />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
