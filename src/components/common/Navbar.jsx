import { useEffect, useMemo, useState } from 'react';
import theme from '../../assets/styles/theme';
import logo from '../../assets/images/navbar/stylenest.svg';
import { Link, NavLink } from 'react-router-dom';

const MenuIcon = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BagIconFallback = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M7 8h10l-1 12H8L7 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path
      d="M9 8V7a3 3 0 0 1 6 0v1"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export default function Navbar({ links = [], cartCount = 0, onCartClick }) {
  const [open, setOpen] = useState(false);
  const [hasRemix, setHasRemix] = useState(false);
  useEffect(() => {
    const el = document.createElement('i');
    el.className = 'ri-shopping-bag-line';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const font = window.getComputedStyle(el).fontFamily || '';
    document.body.removeChild(el);
    setHasRemix(font.toLowerCase().includes('remixicon'));
  }, []);

  const CartIcon = useMemo(() => {
    return hasRemix ? (
      <i className={`ri-shopping-bag-line ${theme.navbar.cartIcon}`} aria-hidden="true" />
    ) : (
      <BagIconFallback className={theme.navbar.cartIcon} />
    );
  }, [hasRemix]);

  return (
    <header className={theme.navbar.header}>
      <div className={theme.navbar.container}>
        <div className={theme.navbar.row}>
          <div className={theme.navbar.leftCluster}>
            <Link to="/" className={theme.navbar.brandWrap} aria-label="StyleNest home">
              <img
                src={logo}
                alt="StyleNest"
                className={theme.navbar.brandLogo}
                draggable="false"
              />
            </Link>

            <nav className={theme.navbar.desktopNav}>
              <ul className={theme.navbar.desktopNavList}>
                {links.map((l) => (
                  <li key={l.href}>
                    <NavLink
                      to={l.href}
                      className={({ isActive }) =>
                        `${theme.navbar.desktopLink} ${isActive ? 'text-neutral-900' : ''}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={theme.navbar.rightGroup}>
            <button
              type="button"
              onClick={onCartClick}
              className={theme.navbar.cartButton}
              aria-label="Open cart"
            >
              {CartIcon}
              {cartCount > 0 && (
                <span className={theme.navbar.cartBadge}>{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </button>
            <button
              type="button"
              className={theme.navbar.mobileMenuButton}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={theme.navbar.drawerOverlay}>
          <div className={theme.navbar.drawerPanelSimple}>
            <div className={theme.navbar.drawerTop}>
              <Link to="/" className={theme.navbar.brandWrap} onClick={() => setOpen(false)}>
                <img
                  src={logo}
                  alt="StyleNest"
                  className={theme.navbar.brandLogo}
                  draggable="false"
                />
              </Link>

              <button
                type="button"
                className={theme.navbar.iconButton}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={theme.navbar.drawerLinksWrap}>
              <ul className={theme.navbar.drawerLinks}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="block" onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* clickOutsideToClose */}
          <button
            className={theme.navbar.drawerBackdropBtn}
            onClick={() => setOpen(false)}
            aria-label="Close menu backdrop"
          />
        </div>
      )}
    </header>
  );
}
