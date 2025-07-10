import React from 'react';

function ImageModal({ image, title, onClose }) {
  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content bg-transparent border-0">
          <button
            type="button"
            className="btn-close ms-auto me-2 mt-2 mb-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              padding: '0.6rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              filter: 'invert(1)',
              width: '1.5rem',
              height: '1.5rem',
            }}
            onClick={onClose}
          />
          <img
            src={image}
            alt={title}
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;