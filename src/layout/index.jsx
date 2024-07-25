//src>layout>Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
const Layout = () => {
  const location = useLocation();
  const noHeaderPaths = [];
  const showHeader = !noHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <div className="layout-header-container">{showHeader && <Header />}</div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
