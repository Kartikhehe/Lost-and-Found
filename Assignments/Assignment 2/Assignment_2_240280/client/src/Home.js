import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contact: "",
    phone: "",
    imageFile: null,
    image: "",
    tag: "Lost",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setItems(sorted);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setItems([]);
      });
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      contact: "",
      phone: "",
      imageFile: null,
      image: "",
      tag: "Lost",
    });
    setEditItemId(null);
    setEditMode(false);
  };

  const handleSubmit = async () => {
    const { title, description, contact, phone, imageFile, tag, image } = formData;

    if (!title || !description || !contact || !phone || !tag || (!imageFile && !image && !editMode)) {
      return alert("All fields are required!");
    }

    try {
      let imageUrl = image;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadRes = await fetch("http://localhost:5000/items/upload", {
          method: "POST",
          body: imageData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.url) return alert("Image upload failed.");
        imageUrl = uploadData.url;
      }

      const payload = {
        title,
        description,
        contact,
        phone,
        image: imageUrl,
        tag,
      };

      if (editMode) {
        const res = await fetch(`http://localhost:5000/items/${editItemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setItems((prev) =>
          prev.map((item) => (item.id === editItemId ? updated : item))
        );
      } else {
        const res = await fetch("http://localhost:5000/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const saved = await res.json();
        setItems((prev) =>
          [saved, ...prev].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      }

      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditItemId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      contact: item.contact,
      phone: item.phone,
      imageFile: null,
      tag: item.tag,
      image: item.image,
    });

    setShowModal(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setItems((prev) => prev.filter((item) => item.id !== id));
        } else {
          res.json().then((data) => alert(data.error || "Delete failed"));
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const filteredItems = items.filter((item) =>
    [item.title, item.description, item.tag]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const username = localStorage.getItem("username") || "User";

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary justify-content-between px-3">
        <span className="navbar-brand">Lost and Found - IIT Kanpur</span>
        <div className="d-flex align-items-center gap-2 text-white">
          <span className="me-2">Hi, <strong>{username}</strong></span>
          <button
            className="btn btn-outline-light"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("username");
              navigate("/login");
            }}
          >
            LOGOUT
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-success px-5 py-2 rounded-pill shadow"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Add Item
          </button>
        </div>

        <div className="row">
          {filteredItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{item.title}</h5>
                    <span
                      className={`badge rounded-pill px-3 py-2 text-white ${
                        item.tag === "Lost" ? "bg-danger" : "bg-success"
                      }`}
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="card-text mt-2">{item.description}</p>
                  <p className="mb-1"><strong>Contact:</strong> {item.contact}</p>
                  <p className="mb-1"><strong>Phone:</strong> {item.phone}</p>

                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      DELETE
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleEdit(item)}
                    >
                      UPDATE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? "Edit Item" : "Add Item"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-control my-2"
                  placeholder="Title"
                />
                <input
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-control my-2"
                  placeholder="Description"
                />
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="form-control my-2"
                  placeholder="Contact"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-control my-2"
                  placeholder="Phone"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                  className="form-control my-2"
                />
                <div className="input-group my-2">
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="form-select"
                  >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-light text-center text-muted py-3 mt-4 border-top">
        © {new Date().getFullYear()} Utham | Lost and Found - IIT Kanpur
      </footer>
    </div>
  );
};

export default Home;
