import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReportForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product: "",
    description: "",
    location: "",
    image: null,
  });

  const [imageInfo, setImageInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImageInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Please login to submit a report.");
      navigate("/login?redirect=/report");
      return;
    }

    const form = new FormData();
    form.append("product", formData.product);
    form.append("description", formData.description);
    form.append("location", formData.location);
    if (formData.image) form.append("image", formData.image);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5050/api/reports", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit report.");

      alert("Report submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error during report submission:", err);
      alert(`${err.message}`);
    } finally {
      setLoading(false);
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
          padding: 4,
          borderRadius: 2,
          minWidth: 320,
          width: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
          maxWidth: "90vw",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#3f51b5" }}>
          Report Lost Item
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="product"
            value={formData.product}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 1, width: "100%" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imageInfo && (
            <Box
              sx={{
                mb: 2,
                backgroundColor: "#f4f4f4",
                p: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                fontSize: "14px",
                color: "#333",
              }}
            >
              <span role="img" aria-label="camera">📷</span>
              {imageInfo.name} — {imageInfo.size}
            </Box>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#3f51b5",
              mt: 2,
              padding: "15px 0",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </form>
      </Box>
    </Backdrop>
  );
}