import React from "react";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const handleClose = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error sending reset link");

      setSubmitted(true);
    } catch (err) {
      alert("Failed to send reset link: " + err.message);
    }
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
          Forgot Password
        </Typography>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter your registered email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, backgroundColor: "#3f51b5" }}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, color: "#444" }}>
            If this email is registered, a reset link has been sent.
          </Typography>
        )}

        <Button
          onClick={() => navigate(`/login?redirect=${redirect}`)}
          sx={{ mt: 2 }}
        >
          Back to Login
        </Button>
      </Box>
    </Backdrop>
  );
}