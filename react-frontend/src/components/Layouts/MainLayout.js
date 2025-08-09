import React from "react";
import { useLocation } from "react-router-dom";

const MainLayout = (props) => {
  const location = useLocation();
  const isHomePage = location.pathname.includes('/home');
  
  return (
    <div className={`layout-normal-container main-content ${isHomePage ? 'p-0' : ''}`}>
      {props.children}
    </div>
  );
};

export default MainLayout;
