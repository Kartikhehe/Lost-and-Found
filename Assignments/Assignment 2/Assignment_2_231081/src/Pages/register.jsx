import logo from "./Images/logo_black.png";
import Input from "../Components/Input";
import { Box, Button } from "@mui/material";
import "./register.css";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="register-box-container">
      <Box
        className="register-container"
        sx={{
          width: 400,
          height: 500,
          borderRadius: 2,
        }}
      >
        <br />
        <img src={logo} alt="IITK logo" />
        <p
          style={{
            marginTop: 5,
            marginBottom: 10,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Register using IITK E-mail iD
        </p>
        <div className="register-textboxes">
          <Input cls="register-input" name="Email" type="email" />
          <Input cls="register-input" name="Password" type="password" />
          <Input cls="register-input" name="Confirm Password" type="password" />

          <Button
            sx={{
              boxShadow: 0,
              ":hover": { boxShadow: 0 },
              bgcolor: "rgb(60, 171, 222)",
            }}
            className="register-btn"
            variant="contained"
          >
            REGISTER
          </Button>
        </div>
        <p style={{ marginTop: 5, marginLeft: 20, fontSize: 15 }}>
          <Link to="/login" style={{ textDecoration: "none", color: "red" }}>
            Already registered? Log in here.
          </Link>
        </p>
      </Box>
    </div>
  );
}
