import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-2 position-fixed w-100"
      style={{
        background: "rgba(13, 110, 253, 0.9)",
        backdropFilter: "blur(6px)",
        zIndex: 1050,
        top: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <span
        className="fw-bold text-white fs-4"
        style={{ cursor: "pointer", letterSpacing: "0.5px" }}
        onClick={() => navigate("/")}
      >
        Lost & Found
      </span>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        {token && (
          <>
            <Link to="/my-lost">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#0d6efd",
                  borderRadius: "30px",
                  px: 2.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f3f3f3",
                  },
                }}
              >
                My Claims
              </Button>
            </Link>
            <Link to="/my-found">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#0d6efd",
                  borderRadius: "30px",
                  px: 2.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f3f3f3",
                  },
                }}
              >
                My Reports
              </Button>
            </Link>
          </>
        )}

        {token ? (
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ffffff22",
                borderColor: "#ffffffcc",
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => navigate("/login?backdrop=true")}
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ffffff22",
                borderColor: "#ffffffcc",
              },
            }}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;