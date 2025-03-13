import React, { useState } from 'react';
import logo from '../../src/header_logo.png';
import '../main.js';

const Header = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
    document.body.classList.toggle('mobile-nav-active');
  };

  return (
    <header className=''>
      <div id="header" className="header fixed-top ">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div className="row w-100">
            <div className="col-lg-2 col-6">
              <div className="header-logo">
                <a href="index.html">
                  <img src={logo} alt="Market Logo" className="logo-img" />
                </a>
              </div>
            </div>
            <div className="col-lg-10 col-6 d-flex justify-content-end">
              <nav id="navmenu" className={`navmenu ${isMobileNavVisible ? 'mobile-nav-active' : ''}`}>
                <ul className="">
                  <li><a href="/" className="active outline-none">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/market_trend">Market Trend</a></li>
                  <li><a href="/news">News</a></li>
                </ul>
              </nav>
              <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
                <i className={`bi ${isMobileNavVisible ? 'bi-x' : 'bi-list'}`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;