import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/claims/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch claims");
        setClaims(data);
      } catch (err) {
        console.error("❌ Failed to fetch claims:", err.message);
      }
    };

    if (!token) {
      navigate("/login?redirect=/my-claims");
    } else {
      fetchClaims();
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">📝 My Claimed Items</h3>

      {claims.length === 0 ? (
        <div className="alert alert-info">You haven't claimed any items yet.</div>
      ) : (
        <div className="row g-4">
          {claims.map((claim) => {
            const report = claim.Report || {};
            const imageUrl = report.image?.startsWith("http")
              ? report.image
              : null;7

            return (
              <div key={claim.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={report.product || "Lost Item"}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success fw-semibold">
                      {report.product || "Unnamed Item"}
                    </h5>
                    <p className="card-text small">{report.description || "No description provided."}</p>
                    <p className="text-muted mb-1">
                      <strong>📍 Location:</strong> {report.location || "Unknown"}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          claim.status === "approved"
                            ? "bg-success"
                            : claim.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {claim.status || "pending"}
                      </span>
                    </p>
                    <p className="text-muted">
                      <strong>🕓 Claimed on:</strong>{" "}
                      {new Date(claim.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyClaims;