import { lazy, Suspense } from 'react';
import Navbar from './components/common/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Footer from './components/common/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const LatestArrivals = lazy(() => import('./pages/LatestArrivals'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductReviewsPage = lazy(() => import('./pages/ProductReviewsPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

function App() {
  return (
    <Router basename="/my-ecommerce">
      <Navbar
        links={[
          { label: 'Shop all', href: '/product-listing' },
          { label: 'Latest arrivals', href: '/latest-arrivals' },
        ]}
      />
      <div className="min-h-screen bg-gray-100 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="/latest-arrivals" element={<LatestArrivals />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id/reviews" element={<ProductReviewsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
