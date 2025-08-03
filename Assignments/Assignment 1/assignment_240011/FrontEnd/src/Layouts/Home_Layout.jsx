import React from 'react';
import Report from "../Utilities/Report/Report.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import ProductGallery from "../Components/Body/ProductGallery.jsx";
import { Outlet } from "react-router-dom";

function Home_Layout() {
  return (
    <>
      <Navbar />
      <Report />
      <ProductGallery />
      <Outlet />
    </>
  );
}

export default Home_Layout;
