import { useState } from 'react';
import './card.css';
import ImageModal from './ImageModal';
import ItemModal from './ItemModal';
import axiosInstance from "./AxiosInstance";

function Card({ id, title, description, image, location, date, contact, status, onUpdate, onDelete, userEmail, user_email }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;
  
    try {
      await axiosInstance.delete(`/items/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete item.");
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const res = await axiosInstance.put(`/items/${updatedData.id}`, updatedData);
      onUpdate(res.data);
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to update item");
      console.error(err);
    }
  };

  return (
    <>
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: "300px", objectFit: "cover", cursor: 'pointer' }}
          onClick={openImageModal}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <ul className="list-unstyled mb-2">
            <li><strong>Location:</strong> {location}</li>
            <li><strong>{status === "lost" ? "Date Lost" : "Date Found"}:</strong> {date}</li>
            <li><strong>Contact:</strong> <a href={`mailto:${contact}`}>{contact}</a></li>
          </ul>
          <span className={`badge bg-${status === "lost" ? "danger" : "success"} mb-2`}>
            {status?.toUpperCase() || 'UNKNOWN'}
          </span>

          {userEmail?.trim().toLowerCase() === user_email?.trim().toLowerCase() && (
          <div className="mt-auto d-flex justify-content-between">
            <button className="btn btn-outline-primary btn-sm" onClick={handleEdit}>✏️ Edit</button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>🗑️ Delete</button>
          </div>
          )}
        </div>
      </div>

      {showImageModal && (
        <ImageModal image={image} title={title} onClose={closeImageModal} />
      )}

      {showEditModal && (
        <ItemModal
          initialData={{
            id,
            title,
            description,
            image,
            location,
            date: date,
            contact,
            status
          }}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Card;
