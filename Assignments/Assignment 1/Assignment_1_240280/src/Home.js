import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
    const [items, setItems] = useState([
        {
            id: 1,
            title: "Water Bottle",
            description: "Blue Milton bottle left in LHC 103.",
            image: "/images/Water Bottle.jpeg",
            contact: "Satya",
            phone:"8522053844",
            tag: "Lost"
        },
        {
            id: 2,
            title: "Scientific Calculator",
            description: "Found a Casio calculator outside Hall 4.",
            image: "/images/Scientific Calculator.jpeg",
            contact: "Siva Sai",
            phone:"7239999499",
            tag: "Found"
        },
        {
            id: 3,
            title: "ID Card",
            description: "Lost IITK ID card near the library.",
            image: "/images/ID.jpeg",
            contact: "Leopard",
            phone:"*campus mein dhoond lena*",
            tag: "Lost"
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    contact: "",
    phone: "",
    image: "",
    tag: "Lost",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleAddItem = () => {
        const isEmpty = Object.values(formData).some((v) => v.trim() === "");
        if (isEmpty) return alert("All fields are required!");
        const newItem = { ...formData, id: Date.now() };
        setItems((prev) => [...prev, newItem]);
        setFormData({ title: "", description: "", contact: "", phone: "", image: "", tag: "Lost" });
        setShowModal(false);
    };


    const handleDelete = (id) => setItems(items.filter((item) => item.id !== id));
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const filteredItems = items.filter((item) =>
        [item.title, item.description, item.tag].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div> 

            <div className="container-fluid p-0">
                <nav className="navbar navbar-dark bg-primary justify-content-between px-3">
                    <span className="navbar-brand">Lost and Found - IIT Kanpur</span>
                    {isLoggedIn ? (
                    <button
                        className="btn btn-outline-light"
                        onClick={() => {
                        setIsLoggedIn(false);
                        navigate("/login");
                        }}
                    >
                        LOGOUT
                    </button>
                    ) : (
                    <button className="btn btn-outline-light" onClick={() => navigate("/login")}>LOGIN</button>
                    )}
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
                    <button className="btn btn-success ms-3" onClick={() => setShowModal(true)}>
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
                            <p className="mb-2"><strong>Phone:</strong> {item.phone}</p>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(item.id)}
                            >
                                DELETE
                            </button>
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
                            <h5 className="modal-title">Add Item</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control my-2"
                            placeholder="Title"
                            />
                            <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control my-2"
                            placeholder="Description"
                            />
                            <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="form-control my-2"
                            placeholder="Contact"
                            />
                            <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control my-2"
                            placeholder="Phone"
                            />
                            <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="form-control my-2"
                            placeholder="Image URL"
                            />
                            <div className="position-relative">
                
                            <select
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                className="form-control my-2 pe-5"
                                style={{ appearance: "none" }}
                            >
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                            </select>

                            <span
                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                style={{ pointerEvents: "none", fontSize: "1rem", color: "#555" }}
                            >
                            ▼
                            </span>
                            </div>
                        
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleAddItem}>
                            Add
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>
            
            <footer className="bg-light text-center text-muted py-3 mt-4 border-top">
                © {new Date().getFullYear()} Utham | Lost and Found - IIT Kanpur
            </footer>
        </div>
    );
};

export default Home;
