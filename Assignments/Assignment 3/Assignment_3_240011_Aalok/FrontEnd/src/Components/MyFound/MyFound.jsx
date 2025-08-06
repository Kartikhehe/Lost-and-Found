import React, { useEffect, useState } from "react";

function MyFound() {
  const [reports, setReports] = useState([]);
  const [visibleClaims, setVisibleClaims] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5050/api/reports/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.warn("Expected array, got:", data);
        }
      })
      .catch(err => console.error("❌ Failed to fetch reports:", err));
  }, [token]);

  const toggleClaims = (reportId) => {
    setVisibleClaims((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  const handleAccept = async (claimId) => {
    try {
      const res = await fetch(`http://localhost:5050/api/reports/claim/${claimId}/accept`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Accept failed");
      alert("✅ Claim accepted.");
      refreshReports();
    } catch (err) {
      console.error("❌ Error accepting claim:", err);
    }
  };

  const handleRemove = async (claimId) => {
    try {
      const res = await fetch(`http://localhost:5050/api/reports/claim/${claimId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Remove failed");
      alert("🗑️ Claim removed.");
      refreshReports();
    } catch (err) {
      console.error("❌ Error removing claim:", err);
    }
  };

  const refreshReports = () => {
    fetch("http://localhost:5050/api/reports/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setReports(Array.isArray(data) ? data : []))
      .catch(err => console.error("❌ Refresh failed:", err));
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2 className="mb-4 fw-bold">Items Reported by Me</h2>

      {reports.length === 0 ? (
        <div className="alert alert-secondary">You haven’t reported anything yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {reports.map((report) => (
            <div className="col" key={report.id}>
              <div className="card h-100 shadow-sm">
                {report.image && (
                  <img
                    src={report.image}
                    alt={report.product}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold">{report.product}</h5>
                    <p className="card-text text-muted small mb-1">{report.description}</p>
                    <p className="card-text">
                      <strong>📍 Location:</strong> {report.location}
                    </p>
                  </div>
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => toggleClaims(report.id)}
                    >
                      {visibleClaims[report.id] ? "Hide Claims" : "View Claims"}
                    </button>
                  </div>
                </div>

                {visibleClaims[report.id] && (
                  <div className="card-footer bg-white border-top">
                    <h6 className="mt-2">Claims:</h6>
                    {report.Claims?.length === 0 ? (
                      <p className="text-muted">No claims yet.</p>
                    ) : (
                      report.Claims.map((claim) => (
                        <div
                          key={claim.id}
                          className="p-3 my-2 border rounded shadow-sm bg-light"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="mb-1"><strong>Name:</strong> {claim.name}</p>
                              <p className="mb-1"><strong>Email:</strong> {claim.email}</p>
                              <p className="mb-1"><strong>Reason:</strong> {claim.reason}</p>
                              <p className="mb-1">
                                <strong>Status:</strong>{" "}
                                <span className={`badge ${claim.status === "approved" ? "bg-success" : "bg-warning text-dark"}`}>
                                  {claim.status}
                                </span>
                              </p>
                            </div>
                            {claim.proof && (
                              <img
                                src={claim.proof}
                                alt="Proof"
                                width="100"
                                className="rounded border"
                              />
                            )}
                          </div>
                          {claim.status !== "approved" && (
                            <div className="mt-3">
                              <button
                                className="btn btn-sm btn-outline-success me-2"
                                onClick={() => handleAccept(claim.id)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemove(claim.id)}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyFound;