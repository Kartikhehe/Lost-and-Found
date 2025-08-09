import React from 'react';
import Navbar from "../Components/Navbar/Navbar.jsx";
import MyLost from "../Components/MyLost/MyLost.jsx";
import Footer from '../Components/Footer/Footer.jsx';
import { Outlet } from "react-router-dom";

function Home_Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Navbar />
      <MyLost />
      </div>
      <Footer />
      <Outlet />
    </div>
  );
}

export default Home_Layout;