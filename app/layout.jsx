import '../src/index.css';
import Navbar from '../src/components/common/Navbar';
import Footer from '../src/components/common/Footer';

const navLinks = [
  { label: 'Shop all', href: '/product-listing' },
  { label: 'Latest arrivals', href: '/latest-arrivals' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar links={navLinks} />
        <div className="min-h-screen bg-gray-100 p-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
