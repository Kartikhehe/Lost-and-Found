import React from "react";

function Footer() {
  return (
    <footer
      className="text-center text-white mt-5"
      style={{
        backgroundColor: "#0d6efd",
        padding: "20px 0",
        position: "relative",
        bottom: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p className="mb-1 fw-bold">ACA Lost & Found</p>
        <p className="mb-1" style={{ fontSize: "0.9rem" }}>
          Making campus safer, one report at a time.
        </p>
        <p className="mb-0" style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} Aalok Tejas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;