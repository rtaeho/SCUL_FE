//src>layout>Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
const Layout = () => {
  const location = useLocation();
  // const isMainPage = location.pathname === "/"

  // 유저정보 모달을 안띄우고 싶은 라우팅을 설정
  const noFooterPaths = ['/main'];

  // 현재 location이랑 같은지 확인
  const showFooter = !noFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showFooter && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
