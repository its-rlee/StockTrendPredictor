import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import logo from '../../src/header_logo.png';

const Header = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const toggleMobileNav = () => setMobileNavVisible(prev => !prev);


 
  return (
    <header className=''>
      <div id="header" className="header fixed-top ">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div className="row w-100">
            <div className="col-lg-2 col-6">
              <div className="header-logo">
                <NavLink to="/">
                  <img src={logo} alt="Market Logo" className="logo-img" />
                </NavLink>
              </div>
            </div>
            <div className="col-lg-10 col-6 d-flex justify-content-end">
              {/* toggle navbar */}
              <div className="mobile-nav-toggle  d-lg-none" onClick={toggleMobileNav}>
                <i className={`bi ${isMobileNavVisible ? 'bi-x' : 'bi-list'}`}></i>
              </div>

              <nav id="navmenu" className={`navmenu ${isMobileNavVisible ? 'mobile-nav-active' : ''}`}>
                <ul className={`d-lg-flex gap-3 list-unstyled m-0`}>
                  <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/market_trend" className={({ isActive }) => isActive ? 'active' : ''}>Market Trend</NavLink>
                  </li>
                  <li>
                    <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>News</NavLink>
                  </li>
                </ul>
              </nav>
            
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;