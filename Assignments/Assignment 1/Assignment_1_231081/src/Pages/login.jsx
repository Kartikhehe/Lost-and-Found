import logo from "./Images/logo_black.png";
import Input from "../Components/Input.jsx";
import { Box, Button } from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-box-container">
      <Box
        className="login-container"
        sx={{
          width: 400,
          height: 500,
          borderRadius: 2,
        }}
      >
        <br />
        <img src={logo} alt="IITK logo" />
        <br />
        <p
          style={{
            marginTop: 30,
            marginBottom: 15,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Login using your credentials
        </p>
        <div className="login-textboxes">
          <Input cls="login-input" name="Username" type="text" />
          <Input cls="login-input" name="Password" type="password" />

          <Button
            sx={{
              boxShadow: 0,
              ":hover": { boxShadow: 0 },
              bgcolor: "rgb(60, 171, 222)",
            }}
            className="login-btn"
            variant="contained"
          >
            LOGIN
          </Button>
        </div>
        <p style={{ marginTop: 5, marginLeft: 20, fontSize: 15 }}>
          <Link to="/register" style={{ textDecoration: "none", color: "red" }}>
            New user? Register here.
          </Link>
        </p>
      </Box>
    </div>
  );
}
