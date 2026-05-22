import Link from 'next/link';
import { FiInstagram, FiFacebook, FiYoutube, FiTwitter } from 'react-icons/fi';
import theme from '../../assets/styles/theme';
import logo from '../../assets/images/navbar/stylenest.svg';

function Footer() {
  const logoSrc = logo.src || logo;
  const shopCategories = [
    { label: 'Unisex', path: '/product-listing?category=unisex' },
    { label: 'Women', path: '/product-listing?category=women' },
    { label: 'Men', path: '/product-listing?category=men' },
  ];

  const shopCollections = [
    { label: 'Latest arrivals', path: '/latest-arrivals' },
    { label: 'Cozy Comfort', path: '/product-listing?collection=cozy' },
    { label: 'Urban Oasis', path: '/product-listing?collection=urban' },
    { label: 'Fresh Fusion', path: '/product-listing?collection=fresh' },
  ];

  const socialLinks = [
    { icon: <FiYoutube />, to: '/about-me', label: 'YouTube' },
    { icon: <FiInstagram />, to: '/about-me', label: 'Instagram' },
    { icon: <FiFacebook />, to: '/about-me', label: 'Facebook' },
    { icon: <FiTwitter />, to: '/about-me', label: 'X' },
  ];

  return (
    <footer className={theme.footer.wrapper}>
      <div className={theme.footer.container}>
        <div className={theme.footer.topSection}>
          <div>
            <div className={theme.footer.newsletterBlock}>
              <h3 className={theme.footer.newsletterTitle}>Join our newsletter</h3>
              <p className={theme.footer.newsletterText}>
                We&apos;ll send you a nice letter once per week. No spam.
              </p>

              <form className={theme.footer.subscribeRow}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={theme.footer.emailInput}
                />
                <button type="submit" className={theme.footer.subscribeButton}>
                  Subscribe
                </button>
              </form>
            </div>

            <div className={theme.footer.brandBlock}>
              <div className={theme.footer.brandRow}>
                <img src={logoSrc} alt="StyleNest" className={theme.navbar.brandLogo} />
              </div>

              <p className={theme.footer.brandDescription}>
                Craft stunning style journeys that weave more joy into every thread.
              </p>
            </div>
          </div>

          <div className={theme.footer.column}>
            <h4 className={theme.footer.columnTitle}>Shop Categories</h4>
            <div className={theme.footer.linkList}>
              {shopCategories.map((item) => (
                <Link key={item.label} href={item.path} className={theme.footer.linkItem}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={theme.footer.column}>
            <h4 className={theme.footer.columnTitle}>Shop Collections</h4>
            <div className={theme.footer.linkList}>
              {shopCollections.map((item) => (
                <Link key={item.label} href={item.path} className={theme.footer.linkItem}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={theme.footer.bottomSection}>
          <p className={theme.footer.copyright}>© 2024 StyleNest, Inc. All rights reserved.</p>

          <div className={theme.footer.socialList}>
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                aria-label={item.label}
                className={theme.footer.socialLink}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
