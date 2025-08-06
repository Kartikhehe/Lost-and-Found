import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "../../Utilities/Search/Search_box.jsx";
import Fab from "@mui/material/Fab";

function LostAndFound() {
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const parseJwt = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) throw new Error("Token does not have a payload.");

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Invalid JWT token:", err.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!token) throw new Error("Token not found");

        const userData = parseJwt(token);
        if (!userData || !userData.id) throw new Error("Invalid token payload");

        const res = await fetch("http://localhost:5050/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setUserId(userData.id);
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch reports:", err.message);
        setItems([]);
      }
    };

    fetchReports();
  }, [token]);

  const filteredItems = items.filter((item) =>
    [item.product, item.description, item.location]
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <>
      <Fab
        variant="extended"
        onClick={() => {
          if (!token) return navigate("/login?redirect=/report");
          navigate("/report");
        }}
        sx={{
          backgroundColor: "#0d6efd",
          position: "fixed",
          bottom: 24,
          right: 24,
          px: 3,
          py: 1.5,
          fontSize: "15px",
          fontWeight: 600,
          color: "#ffffff",
          textTransform: "none",
          borderRadius: "24px",
          boxShadow: "0 6px 18px rgba(13, 110, 253, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#0b5ed7",
            boxShadow: "0 8px 24px rgba(13, 110, 253, 0.4)",
          },
          zIndex: 1000,
        }}
      >
        Report
      </Fab>

      <div className="container" style={{ marginTop: "100px" }}>
        <SearchBar value={searchText} onChange={setSearchText} />

        {filteredItems.length === 0 ? (
          <p className="text-muted mt-4">No items found.</p>
        ) : (
          <div className="row g-4 mt-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ backgroundColor: "#e0efff80" }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                      }}
                    />
                  )}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="fw-bold text-success">{item.product}</h5>
                    <p className="mb-1">{item.description}</p>
                    <p className="text-muted mb-3">
                      <strong>Location:</strong> {item.location}
                    </p>

                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => {
                        if (!token) {
                          navigate(`/login?redirect=/claim/${item.id}`);
                        } else {
                          navigate(`/claim/${item.id}`);
                        }
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LostAndFound;