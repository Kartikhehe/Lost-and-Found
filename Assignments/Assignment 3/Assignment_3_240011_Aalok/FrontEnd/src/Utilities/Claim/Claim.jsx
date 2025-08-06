import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ClaimForm() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    proof: null,
  });

  const [proofInfo, setProofInfo] = useState(null);

  const handleClose = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, proof: file }));
      setProofInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit a claim.");
      return navigate(`/login?redirect=/claim/${itemId}`);
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("reason", formData.reason);
    form.append("reportId", itemId);
    if (formData.proof) {
      form.append("proof", formData.proof);
    }

    try {
      const res = await fetch("http://localhost:5050/api/claims", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Claim failed");

      alert("Claim submitted successfully!");
      navigate("/my-lost");
    } catch (err) {
      alert("Error submitting claim: " + err.message);
    }
  };

  return (
    <Backdrop
      open
      onClick={handleClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "480px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#3f51b5" }}>
          📝 Submit Claim
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="reason"
            label="Why is this yours?"
            value={formData.reason}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Proof
            <input
              type="file"
              hidden
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleProofChange}
            />
          </Button>

          {proofInfo && (
            <Box
              sx={{
                mt: 1,
                backgroundColor: "#f5f5f5",
                p: 1,
                borderRadius: 1,
                fontSize: 14,
                color: "#333",
              }}
            >
              📎 {proofInfo.name} ({proofInfo.size})
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", backgroundColor: "#3f51b5" }}
          >
            Submit Claim
          </Button>
        </form>
      </Box>
    </Backdrop>
  );
}