import { lazy, Suspense } from 'react';
import Navbar from './components/common/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const LatestArrivals = lazy(() => import('./pages/LatestArrivals'));

function App() {
  return (
    <Router basename="/my-ecommerce">
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="/latest-arrivals" element={<LatestArrivals />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
