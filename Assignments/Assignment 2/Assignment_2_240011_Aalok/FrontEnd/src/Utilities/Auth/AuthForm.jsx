import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const { login } = useContext(AuthContext); // ⬅️ use context

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleClose = () => navigate("/");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? "http://localhost:5050/api/auth/signup"
      : "http://localhost:5050/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      login(data.token);
      navigate(redirect);
    } catch (err) {
      alert("Auth failed: " + err.message);
    }
  };

  const toggleRoute = () => {
    const newPath = isSignup ? "/login" : "/signup";
    navigate(`${newPath}?redirect=${redirect}`);
  };

  return (
    <Backdrop
      open
      onClick={handleClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 400,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#3f51b5" }}>
          {isSignup ? "Create Account" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, backgroundColor: "#3f51b5" }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button variant="text" onClick={toggleRoute}>
            {isSignup ? "Login here" : "Sign up here"}
          </Button>
          <Button
            variant="text"
            onClick={() => navigate(`/forgot-password?redirect=${redirect}`)}
          >
            Forgot Password?
          </Button>
        </Typography>
      </Box>
    </Backdrop>
  );
}