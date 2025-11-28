import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

function App() {
  return (
    <Router basename="/my-ecommerce">
      <div className="min-h-screen bg-gray-100 flex justify-start items-start p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product-listing" element={<ProductListing />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
