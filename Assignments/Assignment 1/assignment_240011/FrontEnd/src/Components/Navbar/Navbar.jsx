import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "@mui/material/Button";

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login?backdrop=true");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-3 d-flex justify-content-between align-items-center">
      <Link className="navbar-brand text-white fw-bold" to="/">
        Lost and Found
      </Link>
      <Button
        variant="contained"
        onClick={handleLoginClick}
        sx={{
          backgroundColor: "#ffffff",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Login
      </Button>
    </nav>
  );
}

export default Navbar;
