import React from 'react';
import { NavLink } from 'react-router-dom';
import theme from '../../assets/styles/theme';

const Navbar = () => {
  return (
    <nav className={theme.navbar.container}>
      {/* Logo placeholder */}
      <div>
        <span className={theme.navbar.logo}>StyleNest</span>
      </div>
      <div className={theme.navbar.nav}>
        <NavLink
          to="/product-listing"
          className={({ isActive }) =>
            isActive ? `${theme.navbar.link} ${theme.navbar.activeLink}` : theme.navbar.link
          }
        >
          Shop all
        </NavLink>
        <NavLink
          to="/latest-arrivals"
          className={({ isActive }) =>
            isActive ? `${theme.navbar.link} ${theme.navbar.activeLink}` : theme.navbar.link
          }
        >
          Latest arrivals
        </NavLink>
      </div>
      <div className={theme.navbar.right}>
        {/* 右側可放購物車icon等 */}
      </div>
    </nav>
  );
};

export default Navbar;
