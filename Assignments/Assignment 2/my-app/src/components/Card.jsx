import { useState } from 'react';
import './card.css';
import ImageModal from './ImageModal';
import ItemModal from './ItemModal';

function Card({ id, title, description, image, location, date, contact, status, onUpdate, onDelete }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;
  
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        onDelete(id);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete item.");
      });
  };

  const handleSave = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:3001/items/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
  
      setShowEditModal(false);
  
      window.location.reload();
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

          <div className="mt-auto d-flex justify-content-between">
            <button className="btn btn-outline-primary btn-sm" onClick={handleEdit}>✏️ Edit</button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>🗑️ Delete</button>
          </div>
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