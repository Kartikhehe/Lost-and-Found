import { useState } from 'react';
import './card.css';
import ImageModal from './ImageModal';
import ItemModal from './ItemModal';

function Card({ id, title, description, image, location, dateLost, dateFound, contact, status }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmDelete) {
      alert(`Deleted: ${title}`);
      // Add delete logic here
    }
  };

  const handleSave = (updatedData) => {
    // Update state, send to backend, etc.
    setShowEditModal(false);
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
            <li><strong>{status === "lost" ? "Date Lost" : "Date Found"}:</strong> {dateLost || dateFound}</li>
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
            date: dateLost || dateFound,
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