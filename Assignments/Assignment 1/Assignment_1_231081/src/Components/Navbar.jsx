import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="top-navbar container-fluid">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h2 style={{ margin: 0 }}>Lost and Found</h2>
        </Link>

        <div className="options" style={{ display: "flex", gap: 10 }}>
          <Link to="/login">
            {" "}
            <Button
              sx={{
                boxShadow: 0,
                width: { lg: 100 },
                ":hover": { boxShadow: 0, bgcolor: "rgb(0, 37, 65)" },
                bgcolor: "rgb(78, 148, 201)",
              }}
              variant="contained"
            >
              LOGIN
            </Button>
          </Link>
          <Link to="/register">
            {" "}
            <Button
              sx={{
                boxShadow: 0,
                width: { lg: 100 },
                ":hover": { boxShadow: 0, bgcolor: "rgb(0, 37, 65)" },
                bgcolor: "rgb(78, 148, 201)",
              }}
              variant="contained"
            >
              REGISTER
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
